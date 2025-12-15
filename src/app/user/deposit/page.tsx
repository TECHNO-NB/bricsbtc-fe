"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { Wallet, CreditCard, Clock, CheckCircle, XCircle, FileWarning } from "lucide-react";

// ================= TYPES =================
interface Deposit {
  id: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

// ================= PAGE =================
export default function DepositPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [fetching, setFetching] = useState(true);

  const userData = useSelector((state: any) => state.user);

  // Fetch deposits
  const fetchDeposits = async () => {
    if (!userData.id) return;
    try {
      setFetching(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit/${userData.id}`, {
        withCredentials: true,
      });
      setDeposits(res.data);
    } catch (err: any) {
      toast.error("Failed to load deposits");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [userData]);

  // Create deposit
  const handleCreateDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit/${userData.id}`,
        { amount: Number(amount) },
        { withCredentials: true }
      );

      toast.success("Deposit request created successfully!");
      setAmount("");
      setOpen(false);
      fetchDeposits();

      // Trigger Tidio chat verification if available
      if (window.tidioChatApi) {
        window.tidioChatApi.open();
        window.tidioChatApi.setVisitorData({ message: `I just made a deposit of $${amount}. Please verify payment.` });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create deposit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Wallet className="w-8 h-8 text-emerald-400" />
        <h1 className="text-3xl font-extrabold">My Deposits</h1>
      </div>

      {/* Create Deposit Button */}
      <div className="mb-8 flex justify-center">
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
        >
          <CreditCard className="w-5 h-5" /> Create Deposit
        </Button>
      </div>

      {/* Loading */}
      {fetching && <div className="text-center py-20 text-slate-400">Loading deposits...</div>}

      {/* Empty State */}
      {!fetching && deposits.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <CreditCard className="w-12 h-12 mx-auto mb-4" />
          <p>No deposits yet. Create your first deposit!</p>
        </div>
      )}

      {/* Deposit List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {deposits.map((dep) => (
          <div key={dep.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">${dep.amount.toLocaleString()}</h3>
              {dep.status === "APPROVED" && <CheckCircle className="w-5 h-5 text-green-500" />}
              {dep.status === "PENDING" && <Clock className="w-5 h-5 text-yellow-400" />}
              {dep.status === "REJECTED" && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
            <p className="text-slate-400 text-sm mb-2">Status: {dep.status}</p>
            <p className="text-slate-500 text-xs">
              Created on: {new Date(dep.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Deposit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl">

          <DialogHeader>
            <h1 className="text-center text-red-600 font-bold"> Payment Verification Through Live Chat</h1>
            <DialogTitle className="text-white text-2xl font-bold flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-emerald-400" /> Create Deposit
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-1">
              <Label className="text-slate-300">Deposit Amount ($)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleCreateDeposit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
