"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Wallet,
  TrendingUp,
  Calendar,
  Layers,
} from "lucide-react";
import { useSelector } from "react-redux";

// ================= TYPES =================

interface Investment {
  id: string;
  plan: "SILVER" | "GOLD" | "DIAMOND" | "PLATINUM";
  amount: number;
  createdAt: string;
}

// ================= HELPERS =================

const planColors: Record<string, string> = {
  SILVER: "text-slate-300 border-slate-600",
  GOLD: "text-yellow-400 border-yellow-500",
  DIAMOND: "text-cyan-400 border-cyan-500",
  PLATINUM: "text-fuchsia-400 border-fuchsia-500",
};

// ================= PAGE =================

export default function MyInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const userData=useSelector((state:any)=>state.user)

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages/${userData.id}`,
          { withCredentials: true }
        );
        setInvestments(res.data);
      } catch (err: any) {
        toast.error("Failed to load investments");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <Wallet className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              My Investments
            </h1>
            <p className="text-slate-400">
              Track your active investment packages
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-slate-400">
            Loading investments...
          </div>
        )}

        {/* EMPTY */}
        {!loading && investments.length === 0 && (
          <div className="text-center py-20">
            <Layers className="w-10 h-10 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">
              You have no active investments yet.
            </p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className={`bg-slate-900 border rounded-2xl p-6 ${planColors[inv.plan]}`}
            >
              {/* PLAN */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  {inv.plan} Plan
                </h3>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>

              {/* AMOUNT */}
              <div className="mb-4">
                <p className="text-slate-400 text-sm">Invested Amount</p>
                <p className="text-2xl font-bold text-white">
                  ${inv.amount.toLocaleString()}
                </p>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                Joined on{" "}
                {new Date(inv.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
}
