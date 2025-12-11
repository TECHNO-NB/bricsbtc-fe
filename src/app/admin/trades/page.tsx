"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const page = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [openView, setOpenView] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [statusUpdate, setStatusUpdate] = useState<string>("");

  // Fetch trades from API
  const fetchTrades = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/trade`);
      setTrades(res.data.data); // API returns trades in data[]
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
      case "APPROVED":
      case "ACTIVE":
        return "#00d395";
      case "PENDING":
        return "#f7931a";
      case "CANCELLED":
      case "REJECTED":
        return "#ff4d4d";
      default:
        return "#888";
    }
  };

  const handleView = (trade: any) => {
    setSelectedTrade(trade);
    setStatusUpdate(trade.status);
    setOpenView(true);
  };

  const handleDelete = async (tradeId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/trade/${tradeId}`);
      setTrades(trades.filter((t) => t.id !== tradeId));
      setOpenView(false);
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedTrade) return;
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/trade/${selectedTrade.id}`, {
        status: statusUpdate,
      });
      setTrades(
        trades.map((t) => (t.id === selectedTrade.id ? { ...t, status: statusUpdate } : t))
      );
      setOpenView(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">Trades</h2>
        <Select>
          <SelectTrigger className="bg-gray-900 text-white border border-gray-700 rounded-lg p-3">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading trades...</p>
      ) : (
        <div className="bg-gray-900 border-2 border-black rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-left text-gray-400">Trade ID</th>
                <th className="p-4 text-left text-gray-400">Offer</th>
                <th className="p-4 text-left text-gray-400">Buyer</th>
                <th className="p-4 text-right text-gray-400">Amount</th>
                <th className="p-4 text-center text-gray-400">Status</th>
                <th className="p-4 text-left text-gray-400">Date</th>
                <th className="p-4 text-center text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">#{trade.id}</td>
                  <td className="p-4">
                    {trade.offer?.crypto?.symbol} {trade.offer?.type} #{trade.offer?.id.slice(-4)}
                  </td>
                  <td className="p-4">{trade.offer?.user?.fullName}</td>
                  <td className="p-4 text-right font-medium">{trade.amount}</td>
                  <td className="p-4 text-center">
                    <span
                      className="px-3 py-1 rounded-md text-sm"
                      style={{
                        backgroundColor: `${getStatusColor(trade.status)}22`,
                        color: getStatusColor(trade.status),
                      }}
                    >
                      {trade.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(trade.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <Button onClick={() => handleView(trade)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View/Edit/Delete Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Trade Details</DialogTitle>
            <DialogDescription>View or modify this trade.</DialogDescription>
          </DialogHeader>

          {selectedTrade && (
            <div className="space-y-3">
              <p>
                <strong>Trade ID:</strong> {selectedTrade.id}
              </p>
              <p>
                <strong>Buyer:</strong> {selectedTrade.offer.user.fullName} ({selectedTrade.offer.user.email})
              </p>
              <p>
                <strong>Amount:</strong> {selectedTrade.amount}
              </p>
              <p>
                <strong>Status:</strong>
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </p>
              <p>
                <strong>Offer Type:</strong> {selectedTrade.offer.type}
              </p>
              <p>
                <strong>Crypto:</strong> {selectedTrade.offer.crypto.name} ({selectedTrade.offer.crypto.symbol})
              </p>
              <p>
                <strong>Location:</strong> {selectedTrade.offer.location}
              </p>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={() => handleDelete(selectedTrade.id)}>
              Delete
            </Button>
            <Button onClick={handleStatusChange}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
