"use client";

import React from "react";
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
  Crown
} from "lucide-react";

// --- Types & Data ---

interface Plan {
  name: string;
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

const plans: Plan[] = [
  {
    name: "Silver",
    allocation: "20% Investment",
    color: "text-slate-300",
    borderColor: "border-slate-600",
    icon: <Layers className="w-8 h-8 text-slate-300" />,
    bonus: "3%",
    rates: { monthly: "6%", quarterly: "21%", halfYearly: "39%", yearly: "75%" },
  },
  {
    name: "Gold",
    allocation: "30% Investment",
    color: "text-yellow-400",
    borderColor: "border-yellow-500",
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    bonus: "5%",
    rates: { monthly: "8%", quarterly: "29%", halfYearly: "53%", yearly: "101%" },
  },
  {
    name: "Diamond",
    allocation: "40% Investment",
    color: "text-cyan-400",
    borderColor: "border-cyan-500",
    icon: <Gem className="w-8 h-8 text-cyan-400" />,
    bonus: "7%",
    rates: { monthly: "10%", quarterly: "37%", halfYearly: "67%", yearly: "127%" },
  },
  {
    name: "Platinum",
    allocation: "50% Investment",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500",
    icon: <Crown className="w-8 h-8 text-fuchsia-400" />,
    bonus: "10%",
    rates: { monthly: "12%", quarterly: "46%", halfYearly: "82%", yearly: "154%" },
  },
];

// --- Components ---

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const PlanCard = ({ plan }: { plan: Plan }) => {
  return (
    <div className={`relative group flex flex-col h-full bg-slate-900/50 backdrop-blur-md border ${plan.borderColor} rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-${plan.color.split('-')[1]}-500/20 transition-all duration-300 transform hover:-translate-y-1`}>
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full opacity-20 blur-3xl ${plan.color.replace('text', 'bg')}`}></div>
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 ${plan.color}`}>
            {plan.icon}
          </div>
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/20">
             + {plan.bonus} Bonus
          </Badge>
        </div>
        <h3 className={`text-2xl font-bold ${plan.color} tracking-tight`}>{plan.name} Plan</h3>
        <p className="text-slate-400 text-sm mt-1 font-medium">{plan.allocation}</p>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow space-y-4">
        <div className="space-y-3">
          <RateRow label="Monthly" value={plan.rates.monthly} />
          <RateRow label="Quarterly" value={plan.rates.quarterly} />
          <RateRow label="Half-Yearly" value={plan.rates.halfYearly} />
          <div className="pt-2 mt-2 border-t border-slate-800">
            <RateRow label="Yearly ROI" value={plan.rates.yearly} highlight />
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-6 pt-0 mt-auto">
        <button className={`w-full py-3 rounded-xl font-semibold bg  text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-700`}>
          Choose {plan.name} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const RateRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${highlight ? 'text-white font-semibold' : 'text-slate-400'}`}>{label}</span>
    <span className={`font-mono ${highlight ? 'text-xl text-emerald-400 font-bold' : 'text-slate-200 font-medium'}`}>
      {value}
    </span>
  </div>
);

const ContractFeature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
    <div className="p-2 bg-slate-950 rounded-lg text-indigo-400 border border-slate-800">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-semibold text-sm">{title}</h4>
      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- Main Page Layout ---

export default function InvestmentPlansPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3 h-3" /> Official 2025 Plans
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            BRICS<span className="text-transparent bg-clip-text bg-yellow-500">BTC</span>
          </h1>
          <p className="text-lg text-slate-400">
            Secure your future with our tiered high-yield investment strategies. 
            Choose the plan that fits your portfolio.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Contract Summary Section */}
        <div className="mt-20 border-t border-slate-800 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Investment Contract Summary</h2>
            <p className="text-slate-500">Transparent terms for a secure partnership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ContractFeature 
              icon={<Wallet className="w-5 h-5" />}
              title="Payout Currency"
              desc="All Returns on Investment (ROI) are credited directly in USDT or BTC."
            />
            <ContractFeature 
              icon={<Clock className="w-5 h-5" />}
              title="Fast Withdrawals"
              desc="Withdrawal requests are processed rapidly within 12 to 48 hours."
            />
            <ContractFeature 
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Contract Duration"
              desc="Investments are locked for a fixed secure period of 12 months."
            />
             <ContractFeature 
              icon={<TrendingUp className="w-5 h-5" />}
              title="Flexible Exit"
              desc="Termination is available with a standard 7-day notice period."
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© 2025 BRICSBTC Investment Group. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}