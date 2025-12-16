// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowRightLeft, Banknote, ShieldCheck, MapPin, Truck, Info, User, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Offer {
  id: string;
  crypto: {
    name: string;
    symbol: string;
    price: number;
  };
  user: {
    fullName: string;
    country: string;
  };
  paymentMethod: {
    name: string;
    accountNo: string;
  };
  price: number;
  minLimit: number;
  maxLimit: number;
}

export default function BuyUSDTInterface() {
  const params = useParams(); 
  const offerId = params.id;

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  const [amountUSD, setAmountUSD] = useState<string>("");
  const [amountUSDT, setAmountUSDT] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW: VALIDATION ERROR STATE
  const [limitError, setLimitError] = useState("");

  const router = useRouter();
  const userData = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offer/${offerId}`
        );
        setOffer(res.data.data);
      } catch (err) {
        console.error("Error fetching offer:", err);
        toast.error("Failed to load offer");
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [offerId]);

  // ⭐ LIVE LIMIT VALIDATION + AUTO USDT CALCULATION
  const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountUSD(value);

    if (!value || isNaN(Number(value))) {
      setAmountUSDT("");
      setLimitError("");
      return;
    }

    const num = Number(value);

    if (num < offer!.minLimit) {
      setLimitError(`Minimum trade amount is $${offer!.minLimit}`);
    } else if (num > offer!.maxLimit) {
      setLimitError(`Maximum trade amount is $${offer!.maxLimit}`);
    } else {
      setLimitError("");
    }

    const calculated = num / offer!.price;
    setAmountUSDT(calculated);
  };

  // ⭐ Final validation before trade creation
  const handleBuy = async () => {
    if (!offer) return;

    if (limitError) {
      toast.error(limitError);
      return;
    }

    if (!amountUSD || Number(amountUSD) <= 0) {
      toast.error("Enter a valid USD amount");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades`, {
        offerId: offer.id,
        buyerId: userData.id,
        amount: Number(amountUSD),
      });

      toast.success("Trade created successfully!");
      router.push(`/user/payment/${res.data.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading offer...</p>;
  if (!offer) return <p className="text-red-500 text-center mt-10">Offer not found</p>;

  const MIN_LIMIT = offer.minLimit;
  const MAX_LIMIT = offer.maxLimit;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px]" />

      <main className="w-full max-w-5xl z-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Buy {offer.crypto.symbol} via Cash By Mail
              </h1>
              <div className="flex items-center gap-2 mt-2 text-slate-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{offer.user.country}</span>
                <span className="text-slate-600">•</span>
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Seller: <span className="text-white font-semibold">{offer.user.fullName}</span></span>
              </div>
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 text-sm">
              Online & Ready
            </Badge>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-800/60 pb-6">
                <CardTitle className="text-xl font-medium text-slate-200">
                  How much do you want to buy?
                </CardTitle>
                <p className="text-sm text-slate-400">Enter the amount of USD.</p>
              </CardHeader>

              <CardContent className="pt-8 space-y-8">

                {/* USD Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">You Pay</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={amountUSD}
                      onChange={handleUSDChange}
                      className={`
                        h-16 pl-4 pr-20 text-2xl md:text-3xl font-bold text-white bg-slate-950/50 
                        ${limitError ? "border-red-500" : "border-slate-700"}
                        hover:border-orange-500/50 focus-visible:ring-orange-500/50 
                        focus-visible:border-orange-500 transition-all rounded-xl
                      `}
                      placeholder="0.00"
                    />
                    {limitError && (
                      <p className="text-red-400 text-sm mt-2">{limitError}</p>
                    )}
                  </div>
                </div>

                {/* USDT Output */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">You Receive ({offer.crypto.name}({offer.crypto.symbol}))</label>
                  <div className="relative">
                    <Input
                      type="number"
                      readOnly
                      value={amountUSDT}
                      className="h-16 pl-4 pr-20 text-2xl md:text-3xl font-bold bg-slate-900/30 border-slate-700/50 text-emerald-400 rounded-xl"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Limits Box */}
                <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-400 uppercase">Trade Limits</span>
                      <span className="text-sm font-semibold text-slate-200">
                        ${MIN_LIMIT} - ${MAX_LIMIT}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BUY BUTTON */}
                <Button
                  size="lg"
                  onClick={handleBuy}
                  disabled={isSubmitting || limitError !== ""}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg rounded-xl"
                >
                  {isSubmitting ? "Processing..." : `Buy ${offer.crypto.name} Now`}
                </Button>

              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE (Terms) */}
          <div className="lg:col-span-5 space-y-6">

            <Card className="bg-gradient-to-br from-emerald-950/40 to-slate-900/40 backdrop-blur-md border-emerald-900/30 border">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <span className="text-3xl font-bold text-emerald-500">$</span>
                </div>
                <div>
                  <h3 className="text-slate-400 text-sm">Current Price</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">1 {offer.crypto.symbol}</span>
                    <span className="text-slate-500">=</span>
                    <span className="text-2xl font-bold text-emerald-400">${offer.price} USD</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Banknote className="w-5 h-5 text-blue-400" />
                  Trade Terms & Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Terms text (unchanged) */}
                <div className="flex gap-3 items-start p-3 rounded-lg hover:bg-slate-800/50">
                  <div className="mt-1 bg-blue-500/10 p-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Secure Transactions</h4>
                    <p className="text-xs text-slate-400">Escrow protection until cash is verified.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-lg hover:bg-slate-800/50">
                  <div className="mt-1 bg-orange-500/10 p-1.5 rounded-full">
                    <Truck className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Shipping</h4>
                    <p className="text-xs text-slate-400">Buyer must use tracked Priority Mail.</p>
                  </div>
                </div>

                <Separator className="bg-slate-800 my-4" />

                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-3 flex gap-3">
                  <Info className="w-5 h-5 text-amber-500" />
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    Please have the tracking number ready before opening trade.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </main>
    </div>
  );
}
