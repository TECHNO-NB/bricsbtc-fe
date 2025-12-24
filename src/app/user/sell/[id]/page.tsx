// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShieldCheck,
  MapPin,
  User,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Offer {
  id: string;
  crypto: { name: string; symbol: string };
  user: { fullName: string; country: string };
  minLimit: number;
  maxLimit: number;
  price: number; // USD per 1 crypto
}

export default function SellUSDTInterface() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [amountCrypto, setAmountCrypto] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const offerId = params.id;
  const userData = useSelector((state: any) => state.user);

  // 🔥 Fetch offer
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offer/${offerId}`
        );
        setOffer(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOffer();
  }, [offerId]);

  // 🔄 Handle crypto input
  const handleCryptoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountCrypto(value);
    setError("");

    if (!offer) return;

    const cryptoAmount = Number(value);
    if (!value || isNaN(cryptoAmount) || cryptoAmount <= 0) {
      setAmountUSD("");
      return;
    }

    // ✅ USD = crypto × price
    const usd = cryptoAmount * offer.price;
    setAmountUSD(usd.toFixed(2));

    // ✅ Validate limits (USD)
    if (usd < offer.minLimit) {
      setError(`Minimum trade amount is $${offer.minLimit.toLocaleString()} USD`);
    } else if (usd > offer.maxLimit) {
      setError(`Maximum trade amount is $${offer.maxLimit.toLocaleString()} USD`);
    }
  };

  // 🚀 Create trade
  const handleSell = async () => {
    if (!offer || error) {
      toast.error(error || "Invalid trade");
      return;
    }

    if (!amountCrypto || Number(amountCrypto) <= 0) {
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
          amount: amountCrypto,
        }
      );

      toast.success("Trade created successfully");
      router.push(`/user/payment/${res.data.id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!offer) {
    return <p className="text-white text-center mt-20">Loading Offer...</p>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-5xl space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Sell {offer.crypto.symbol}
            </h1>
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <MapPin className="w-4 h-4" />
              <span>{offer.user.country}</span>
              <span>•</span>
              <User className="w-4 h-4" />
              <span>
                Seller: <b className="text-white">{offer.user.fullName}</b>
              </span>
            </div>
          </div>

          <Badge className="border-emerald-500/30 text-emerald-400">
            Online
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle>How much do you want to sell?</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label className="text-xs uppercase text-slate-400">
                    You Sell ({offer.crypto.symbol})
                  </label>
                  <Input
                    type="number"
                    value={amountCrypto}
                    onChange={handleCryptoChange}
                    className="h-16 text-2xl font-bold"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-slate-400">
                    You Receive (USD)
                  </label>
                  <Input
                    readOnly
                    value={amountUSD}
                    className="h-16 text-2xl font-bold text-emerald-400"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <div className="flex justify-between bg-slate-800/30 p-4 rounded">
                  <div>
                    <span className="text-xs text-slate-400">Trade Limits</span>
                    <p className="font-semibold">
                      ${offer.minLimit.toLocaleString()} – $
                      {offer.maxLimit.toLocaleString()} USD
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Rate</span>
                    <p className="font-semibold text-emerald-400">
                      1 {offer.crypto.symbol} = ${offer.price} USD
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSell}
                  disabled={isLoading || Boolean(error)}
                  className="w-full h-14 text-lg bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? "Processing..." : `Sell ${offer.crypto.symbol}`}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-sm text-slate-400">Current Price</h3>
                <p className="text-xl font-bold mt-2">
                  1 {offer.crypto.symbol} ={" "}
                  <span className="text-emerald-400">
                    ${offer.price} USD
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
