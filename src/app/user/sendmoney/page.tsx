"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TransferBalance() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const userData=useSelector((state:any)=>state.user)

  const handleTransfer = async () => {
    if (!recipientId || !amount || Number(amount) <= 0) {
      toast.error("Please enter valid user ID and amount");
      return;
    }
    if(!userData.id){
      toast.error("User must login");
      return;
    }


    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/balance/transfer`,
        {
          fromUserId: userData.id, 
          toUserId: recipientId,
          amount: Number(amount),
        },
        { withCredentials: true }
      );

      toast.success("Balance transferred successfully!");
      setRecipientId("");
      setAmount("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Transfer Balance
      </h2>

      <div className="space-y-4">
        {/* Recipient User ID */}
        <div>
          <label className="text-sm text-slate-400">Recipient User ID</label>
          <Input
            type="text"
            placeholder="Enter recipient user ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="mt-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 w-full"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm text-slate-400">Amount ($)</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleTransfer}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-semibold text-white"
        >
          {loading ? "Processing..." : "Transfer Balance"}
        </Button>
      </div>
    </div>
  );
}
