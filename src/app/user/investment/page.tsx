"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  Wallet,
  ChevronRight,
  Zap,
  Gem,
  Award,
  Layers,
  Crown,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// ================= TYPES =================

interface Plan {
  name: "Silver" | "Gold" | "Diamond" | "Platinum";
  allocation: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
  bonus: string;
  rates: {
    monthly: string;
    quarterly: string;
    halfYearly: string;
    yearly: string;
  };
}

// ================= DATA =================

const plans: Plan[] = [
  {
    name: "Silver",
    allocation: "20% Investment",
    color: "text-slate-300",
    borderColor: "border-slate-600",
    icon: <Layers className="w-8 h-8" />,
    bonus: "3%",
    rates: {
      monthly: "6%",
      quarterly: "21%",
      halfYearly: "39%",
      yearly: "75%",
    },
  },
  {
    name: "Gold",
    allocation: "30% Investment",
    color: "text-yellow-400",
    borderColor: "border-yellow-500",
    icon: <Award className="w-8 h-8" />,
    bonus: "5%",
    rates: {
      monthly: "8%",
      quarterly: "29%",
      halfYearly: "53%",
      yearly: "101%",
    },
  },
  {
    name: "Diamond",
    allocation: "40% Investment",
    color: "text-cyan-400",
    borderColor: "border-cyan-500",
    icon: <Gem className="w-8 h-8" />,
    bonus: "7%",
    rates: {
      monthly: "10%",
      quarterly: "37%",
      halfYearly: "67%",
      yearly: "127%",
    },
  },
  {
    name: "Platinum",
    allocation: "50% Investment",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500",
    icon: <Crown className="w-8 h-8" />,
    bonus: "10%",
    rates: {
      monthly: "12%",
      quarterly: "46%",
      halfYearly: "82%",
      yearly: "154%",
    },
  },
];

// ================= COMPONENTS =================

const RateRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between">
    <span className={highlight ? "text-white" : "text-slate-400"}>
      {label}
    </span>
    <span className={highlight ? "text-emerald-400 font-bold text-lg" : ""}>
      {value}
    </span>
  </div>
);

// ================= PLAN CARD =================

const PlanCard = ({ plan }: { plan: Plan }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ SAFE Redux access
  const userData = useSelector((state: any) => state.user);

  const createPackage = async () => {
    if (!userData.id) {
      toast.error("Please login first");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages/${userData.id}`,
        {
          plan: plan.name.toUpperCase(), // SILVER | GOLD | DIAMOND | PLATINUM
          amount: Number(amount),
        },
        {
          withCredentials: true, 
        }
      );

      toast.success(`Investment Successful 🎉 (${plan.name})`);

      setOpen(false);
      setAmount("");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Insufficient balance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        className={`flex flex-col bg-slate-900 border ${plan.borderColor} rounded-2xl`}
      >
        <div className="p-6 border-b border-slate-800">
          <div className={`${plan.color}`}>{plan.icon}</div>
          <h3 className={`text-2xl font-bold mt-4 ${plan.color}`}>
            {plan.name} Plan
          </h3>
          <p className="text-slate-400">{plan.allocation}</p>
        </div>

        <div className="p-6 space-y-3">
          <RateRow label="Monthly" value={plan.rates.monthly} />
          <RateRow label="Quarterly" value={plan.rates.quarterly} />
          <RateRow label="Half-Yearly" value={plan.rates.halfYearly} />
          <RateRow label="Yearly ROI" value={plan.rates.yearly} highlight />
        </div>

        <div className="p-6 pt-0 mt-auto">
          <Button className="w-full bg" onClick={() => setOpen(true)}>
            Choose {plan.name} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-950 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              Activate {plan.name} Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-sm">Selected Plan</p>
              <p className={`text-xl font-bold ${plan.color}`}>
                {plan.name}
              </p>
            </div>

            <div>
              <Label className="text-slate-300">Amount ($)</Label>
              <Input
                type="number"
                placeholder="Enter investment amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={createPackage}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ================= PAGE =================

export default function InvestmentPlansPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white">
            BRICSBTC Investment Plans
          </h1>
          <p className="text-slate-400 mt-4">
            Choose a secure high-yield investment plan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          © 2019 BRICSBTC. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
