// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowRightLeft,
  Banknote,
  ShieldCheck,
  MapPin,
  Truck,
  Info,
  User,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Offer {
  id: string;
  crypto: { name: string; symbol: string; price: number };
  user: { fullName: string; country: string };
  minLimit: number;
  maxLimit: number;
  price: number; // USD per 1 crypto
}

export default function SellUSDTInterface() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [amountUSDT, setAmountUSDT] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const offerId = params.id;
  const userData = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offer/${offerId}`
        );
        setOffer(res.data.data);
      } catch (err) {
        console.error("Error fetching offer:", err);
      }
    };
    fetchOffer();
  }, [offerId]);

  // ✅ FIXED: crypto → USD (USD = crypto × price)
  const handleUSDTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountUSDT(value);
    setError("");

    if (!offer) return;

    const cryptoAmount = Number(value);
    if (!value || isNaN(cryptoAmount) || cryptoAmount <= 0) {
      setAmountUSD("");
      return;
    }

    const calculatedUSD = cryptoAmount * offer.price;
    setAmountUSD(calculatedUSD.toFixed(2));

    if (calculatedUSD < offer.minLimit) {
      setError(`Minimum trade amount is $${offer.minLimit.toLocaleString()} USD`);
    } else if (calculatedUSD > offer.maxLimit) {
      setError(`Maximum trade amount is $${offer.maxLimit.toLocaleString()} USD`);
    }
  };

  const handleSell = async () => {
    if (!offer || error) {
      toast.error(error || "Invalid trade");
      return;
    }

    if (!amountUSDT || Number(amountUSDT) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades`,
        {
          offerId: offer.id,
          buyerId: userData.id,
          amount: amountUSDT,
        }
      );

      toast.success("Trade created successfully!");
      router.push(`/user/payment/${res.data.id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!offer)
    return <p className="text-white text-center mt-20">Loading Offer...</p>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="w-full max-w-5xl z-10 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Sell {offer.crypto.symbol} via Cash By Mail
              </h1>
              <div className="flex items-center gap-2 mt-2 text-slate-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{offer.user.country}</span>
                <span className="text-slate-600">•</span>
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  Seller:{" "}
                  <span className="text-white font-semibold">
                    {offer.user.fullName}
                  </span>
                </span>
              </div>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 text-sm uppercase tracking-wide"
            >
              Online & Ready
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-800/60 pb-6">
                <CardTitle className="text-xl font-medium text-slate-200">
                  How much do you want to sell?
                </CardTitle>
                <p className="text-sm text-slate-400">
                  Enter the amount of {offer.crypto.name} you want to sell.
                </p>
              </CardHeader>

              <CardContent className="pt-8 space-y-8">
                <div className="space-y-6 relative">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      You Sell ({offer.crypto.name}({offer.crypto.symbol}))
                    </label>

                    <Input
                      type="number"
                      value={amountUSDT}
                      onChange={handleUSDTChange}
                      className={`h-16 pl-4 pr-20 text-2xl md:text-3xl font-bold text-white bg-slate-950/50 border-slate-700
                      ${error ? "border-red-500" : "hover:border-orange-500/50"}
                      focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all rounded-xl`}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                      You Receive ($USD)
                    </label>

                    <Input
                      type="number"
                      value={amountUSD}
                      readOnly
                      className="h-16 pl-4 pr-20 text-2xl md:text-3xl font-bold bg-slate-900/30 border-slate-700/50 text-emerald-400 focus-visible:ring-0 rounded-xl"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-semibold text-center">
                    {error}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 uppercase">
                        Trade Limits
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        ${offer.minLimit.toLocaleString()} - $
                        {offer.maxLimit.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-400 uppercase">
                      Rate
                    </span>
                    <p className="text-sm font-semibold text-emerald-400">
                      1 {offer.crypto.symbol} = ${offer.price} USD
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-900/20 rounded-xl transition-all active:scale-[0.99]"
                  onClick={handleSell}
                  disabled={isLoading || Boolean(error)}
                >
                  {isLoading ? "Processing..." : `Sell ${offer.crypto.name} Now`}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-gradient-to-br from-red-950/40 to-slate-900/40 backdrop-blur-md border-red-900/30">
              <CardContent className="p-6">
                <h3 className="text-slate-400 text-sm font-medium">
                  Current Price
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-white">
                    1 {offer.crypto.symbol}
                  </span>
                  <span className="text-slate-500">=</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ${offer.price} USD
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Trade Terms & Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-400 text-sm">
                <p>Secure escrow protection until cash is received.</p>
                <p>Tracked shipping is required and paid by the buyer.</p>
                <p>Crypto released upon cash verification.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
