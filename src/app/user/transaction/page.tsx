'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Download, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useSelector } from "react-redux";

interface TransactionHistoryProps {
  userId: string;
}

interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  date: string;
  time: string;
  method: string;
  description: string;
  hash?: string;
  createdAt: string;
  timeLeft?: number; // in seconds
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("7days");
  const [searchQuery, setSearchQuery] = useState("");

  const userData = useSelector((state: any) => state.user);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${userData.id}`);
        const data = res.data.data || [];

        const mapped: Transaction[] = data.map((tx: any) => {
          // Frontend hardcoded countdown: 1 hour from createdAt
          const now = new Date().getTime();
          const createdAt = new Date(tx.createdAt).getTime();
          const windowSeconds = 60 * 60; // 1 hour
          const secondsPassed = Math.floor((now - createdAt) / 1000);
          const timeLeft = windowSeconds - secondsPassed > 0 ? windowSeconds - secondsPassed : 0;

          return {
            id: tx.id,
            type: tx.offer.type === "BUY" ? "Buy" : "Sell",
            status: tx.status.toLowerCase(),
            amount: tx.amount,
            currency: tx.offer.crypto.symbol,
            date: new Date(tx.createdAt).toLocaleDateString(),
            time: new Date(tx.createdAt).toLocaleTimeString(),
            method: tx.offer.paymentMethod?.name || "-",
            description: `${tx.offer.type} ${tx.amount} ${tx.offer.crypto.symbol}`,
            hash: tx.id,
            createdAt: tx.createdAt,
            timeLeft,
          };
        });

        setTransactions(mapped);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId, userData.id]);

  // Countdown timer for pending trades
  useEffect(() => {
    const timer = setInterval(() => {
      setTransactions(prev =>
        prev.map(tx => {
          if (tx.status === "pending" && tx.timeLeft && tx.timeLeft > 0) {
            return { ...tx, timeLeft: tx.timeLeft - 1 };
          }
          return tx;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== "all" && tx.type.toLowerCase() !== filterType) return false;

    if (dateRange !== "all") {
      const txDate = new Date(tx.date);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dateRange === "7days" && diffDays > 7) return false;
      if (dateRange === "30days" && diffDays > 30) return false;
      if (dateRange === "90days" && diffDays > 90) return false;
    }

    if (
      searchQuery &&
      !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.id.toString().includes(searchQuery)
    ) return false;

    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowDownRight className="w-4 h-4" />;
      case "Withdrawal":
        return <ArrowUpRight className="w-4 h-4" />;
      case "Buy":
      case "Sell":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Withdrawal":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Buy":
      case "Sell":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400";
      case "pending":
        return "bg-amber-500/10 text-amber-400";
      case "cancelled":
      case "failed":
        return "bg-rose-500/10 text-rose-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
            <p className="text-gray-400">Track all your crypto transactions in one place</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none cursor-pointer"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {loading ? (
            <p className="text-gray-400 p-6 text-center">Loading transactions...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Timer</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-900/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono text-sm">#{tx.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getTypeColor(tx.type)}`}>
                          {getTypeIcon(tx.type)}
                          <span className="text-sm font-medium">{tx.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white text-sm">{tx.description}</span>
                          {tx.hash && (
                            <span className="text-gray-500 text-xs font-mono mt-1">
                              {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-white text-sm">{tx.date}</span>
                          <span className="text-gray-500 text-xs">{tx.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">{tx.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex flex-col items-end">
                          <span className={`text-sm font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount} {tx.currency}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {tx.status === "pending" ? (
                          <span className="text-yellow-400 font-mono text-sm">{tx.timeLeft ? formatTime(tx.timeLeft) : "00:00"}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
