"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Wallet, Trash2, Check, XCircle } from "lucide-react";

interface Deposit {
  id: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
        axios.defaults.withCredentials=true;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit`, { withCredentials: true });
      setDeposits(res.data);
    } catch (err) {
      toast.error("Failed to fetch deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject" | "delete") => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const url =
        action === "approve"
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit/approve/${id}`
          : action === "reject"
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit/reject/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deposit/${id}`;

      await axios.post(url, {}, { withCredentials: true });
      toast.success(`Deposit ${action}d successfully!`);
      fetchDeposits();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || `Failed to ${action} deposit`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <p className="text-white text-center mt-10 text-xl">Loading deposits...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin - Manage Deposits</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deposits.map((dep) => (
          <div key={dep.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-white font-bold">{dep.user.fullName}</h3>
                <p className="text-slate-400 text-sm">{dep.user.email}</p>
              </div>
            </div>

            {/* Deposit Amount */}
            <div className="text-white font-bold text-xl">
              ${dep.amount.toLocaleString()}
            </div>

            {/* Status */}
            <div className={`text-sm font-semibold ${
              dep.status === "PENDING" ? "text-yellow-400" :
              dep.status === "APPROVED" ? "text-green-400" :
              "text-red-400"
            }`}>
              {dep.status}
            </div>

            {/* Created Date */}
            <div className="text-slate-400 text-sm">
              {new Date(dep.createdAt).toLocaleString()}
            </div>

            {/* Action Buttons */}
            {dep.status === "PENDING" && (
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 flex-1 flex items-center justify-center gap-1"
                  onClick={() => handleAction(dep.id, "approve")}
                  disabled={actionLoading[dep.id]}
                >
                  <Check className="w-4 h-4" /> {actionLoading[dep.id] ? "Processing..." : "Approve"}
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700 flex-1 flex items-center justify-center gap-1"
                  onClick={() => handleAction(dep.id, "reject")}
                  disabled={actionLoading[dep.id]}
                >
                  <XCircle className="w-4 h-4" /> {actionLoading[dep.id] ? "Processing..." : "Reject"}
                </Button>

                <Button
                  className="bg-slate-700 hover:bg-slate-600 flex-1 flex items-center justify-center gap-1"
                  onClick={() => handleAction(dep.id, "delete")}
                  disabled={actionLoading[dep.id]}
                >
                  <Trash2 className="w-4 h-4" /> {actionLoading[dep.id] ? "Processing..." : "Delete"}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
