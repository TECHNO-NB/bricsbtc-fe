"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  TrendingUp,
  Wallet,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  ListOrdered,
} from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --------------------------- TYPES ---------------------------
interface UserState {
  id: string;
  fullName: string;
  email: string;
}

interface Offer {
  type: "BUY" | "SELL";
  crypto: { symbol: string };
}

interface RecentActivity {
  id: string;
  amount: number;
  createdAt: string;
  offer: Offer;
}

interface DashboardResponse {
  totalTrades: number;
  totalBuyUSD: number;
  totalSellUSD: number;
  totalBalance: any;
  recentActivity: RecentActivity[];
}

// --------------------------- MAIN PAGE ---------------------------
const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state: { user: UserState }) => state.user);
  const router = useRouter();

  // Fetch Dashboard API
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/${userData.id}`
        );
        setData(res.data.dashboard);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.id) loadDashboard();
  }, [userData.id]);

  return (
    <div className="min-h-[90svh] relative bg-black text-white">
      {/* Background Light Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <main className="p-3 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center text-zinc-400 text-lg">
              Loading dashboard...
            </div>
          )}

          {/* Loaded Content */}
          {!loading && data && (
            <>
              {/* ------------------------------ METRICS GRID ------------------------------ */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                <DashboardMetric
                  title="Total Balance"
                  value={`$${data?.totalBalance?.balance || 0}`}
                  change="You can investment"
                  icon={Wallet}
                  iconColor="text-yellow-500"
                />
                <DashboardMetric
                  title="Total Trades"
                  value={data.totalTrades.toString()}
                  change="Completed only"
                  icon={Wallet}
                  iconColor="text-yellow-500"
                />

                <DashboardMetric
                  title="Total Buy (USD)"
                  value={`$${data.totalBuyUSD.toFixed(2)}`}
                  change="Completed trades"
                  icon={DollarSign}
                  iconColor="text-green-500"
                />
              <QuickActionsCard router={router} />

                <DashboardMetric
                  title="Total Sell (USD)"
                  value={`$${data.totalSellUSD.toFixed(2)}`}
                  change="Completed trades"
                  icon={TrendingUp}
                  iconColor="text-orange-500"
                />

              </div>

              {/* ------------------------------ CHART + TABLE ------------------------------ */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Card */}
                <Card className="lg:col-span-2 bg-zinc-900 border-yellow-500/60">
                  <CardHeader>
                    <CardTitle className="text-white">
                      BTC/USDC Performance
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      7-day simulated chart.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="h-64 rounded-lg overflow-hidden border border-zinc-800">
                      <Image
                        src="https://pari.com.mk/wp-content/uploads/2022/03/crypto-currency.jpg"
                        width={500}
                        height={400}
                        alt="chart"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Table */}
                <Card className="bg-zinc-900 border-yellow-500/60">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-lg text-white">
                      Recent Activity
                    </CardTitle>
                    <ListOrdered className="w-4 h-4 text-zinc-500" />
                  </CardHeader>

                  <CardContent>
                    {data.recentActivity.length === 0 ? (
                      <div className="text-zinc-500 text-center py-10">
                        No recent activity.
                      </div>
                    ) : (
                      <TransactionTable data={data.recentActivity} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;

// --------------------------- METRIC CARD ---------------------------
interface DashboardMetricProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  iconColor: string;
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
}) => (
  <motion.div whileHover={{ y: -4, scale: 1.02 }}>
    <Card className="bg-zinc-900 border-yellow-500/60 hover:border-yellow-400 transition">
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle className="text-sm text-zinc-400">{title}</CardTitle>
        <div className={`p-2 rounded-full bg-zinc-800/60 ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-zinc-500">{change}</p>
      </CardContent>
    </Card>
  </motion.div>
);

// --------------------------- QUICK ACTIONS CARD ---------------------------
interface QuickActionsCardProps {
  router: ReturnType<typeof useRouter>;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ router }) => (
  <Card className="bg-zinc-900 border-yellow-500/60">
    <CardHeader>
      <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
      <CardDescription className="text-zinc-500">
        Manage portfolio instantly.
      </CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col space-y-3">
      <Button
        onClick={() => router.push("/user/trade")}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white justify-start"
      >
        <ArrowUpRight className="w-4 h-4 mr-2 text-green-400" />
        Withdraw Funds
      </Button>

      <Button
        onClick={() => router.push("/user/trade")}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white justify-start"
      >
        <ArrowDownLeft className="w-4 h-4 mr-2 text-red-400" />
        Execute New Trade
      </Button>

      <Button
        onClick={() => router.push("/user/myinvestment")}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold justify-start"
      >
        <DollarSign className="w-4 h-4 mr-2" />
        My Investment
      </Button>
    </CardContent>
  </Card>
);

// --------------------------- TRANSACTION TABLE ---------------------------
interface TransactionTableProps {
  data: RecentActivity[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => (
  <div className="overflow-auto max-h-80">
    <Table className="text-zinc-300">
      <TableHeader className="sticky top-0 bg-zinc-800">
        <TableRow>
          <TableHead className="text-zinc-400">ID</TableHead>
          <TableHead className="text-zinc-400">Type</TableHead>
          <TableHead className="text-right text-zinc-400">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((tx) => (
          <TableRow
            key={tx.id}
            className="border-zinc-800 hover:bg-zinc-900/50"
          >
            <TableCell>{tx.id.slice(-6)}</TableCell>

            <TableCell>
              <Badge
                className={`text-xs ${
                  tx.offer.type === "BUY"
                    ? "bg-green-500/20 text-green-400 border-green-700"
                    : "bg-red-500/20 text-red-400 border-red-700"
                }`}
              >
                {tx.offer.type} {tx.offer.crypto.symbol}
              </Badge>
            </TableCell>

            <TableCell
              className={`text-right font-semibold ${
                tx.offer.type === "BUY" ? "text-green-400" : "text-red-400"
              }`}
            >
              ${tx.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
