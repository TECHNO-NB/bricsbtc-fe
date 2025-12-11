// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  DollarSign,
  Mail,
  MessageSquareText,
  ListOrdered,
  CheckCircle,
  Lock,
} from "lucide-react";

export default function PaymentVerification() {
  const params = useParams();
  const [trade, setTrade] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchTrade = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/${params.id}`
        );

        const data = res.data.data;
        setTrade(data);

        // TIME CALCULATION
        const now = new Date();
        const createdAt = new Date(data.createdAt);
        const windowMinutes = data.paymentWindowMinutes || 60;

        const secondsPassed = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
        setTimeLeft(windowMinutes * 60 - secondsPassed);
      } catch (err) {
        console.error("Error fetching trade:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrade();
  }, [params.id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading trade...</p>;
  if (!trade)
    return <p className="text-red-500 text-center mt-10">Trade not found</p>;

  const isBuy = trade.offer.type === "BUY"; // Trade type

  // Counterparty info
  const counterparty = trade.offer.user;
  const counterpartyName = counterparty.fullName;
  const counterpartyPhone = counterparty.phone;

  // WhatsApp Link
  const whatsappNumber = counterpartyPhone?.replace(/[^0-9]/g, "") || "";
  const whatsappMessage = encodeURIComponent(
    `Hello ${counterpartyName}, I am contacting regarding Trade ID ${trade.id}.`
  );
  const whatsappURL = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "#";

  const isTimeCritical = timeLeft < 300 && timeLeft > 0;

  // CRYPTO & USD CALCULATION
  const amountCrypto = isBuy
    ? trade.amountUSD / trade.offer.price
    : trade.amountUSDT;

  const displayUSD = isBuy
    ? trade.amountUSD
    : amountCrypto * trade.offer.price;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <Card className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">

        {/* HEADER */}
        <CardHeader className="p-6 md:p-8 border-b border-slate-800/60">
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
            <ListOrdered className="w-6 h-6 text-indigo-400" />
            Payment Instructions
          </CardTitle>
          <p className="text-sm text-slate-400 mt-1">
            Follow the steps below to complete your trade <b>{trade.id}</b>.
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN – TRADE SUMMARY */}
          <div className="lg:col-span-1 space-y-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Trade Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount ({trade.crypto.symbol})</span>
                <span className="font-bold text-white">{amountCrypto.toFixed(6)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid / Received (USD)</span>
                <span className="font-bold text-white">${displayUSD.toFixed(2)}</span>
              </div>

              <Separator className="bg-slate-800 my-2" />

              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${isTimeCritical ? "text-red-500" : "text-blue-400"}`}
                  />
                  <span className="text-slate-400">Time Remaining</span>
                </div>

                <span
                  className={`text-xl font-extrabold ${
                    isTimeCritical ? "text-red-500 animate-pulse" : "text-white"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            <h3 className="text-xl font-bold text-white mb-4">
              Steps to Complete Your Trade
            </h3>

            {/* STEP 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 flex-shrink-0 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                1
              </div>

              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  {isBuy ? "Prepare Cash By Mail" : "Wait for Buyer to Send Cash"}
                  <Mail className="w-4 h-4" />
                </h4>

                {isBuy ? (
                  <p className="text-sm text-slate-400 mt-1">
                    Secure the payment. **DO NOT** mention crypto.
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 mt-1">
                    The buyer is preparing the cash package.
                  </p>
                )}

                {/* Address Only for BUY */}
                {isBuy && (
                  <div className="mt-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700 space-y-1">
                    <p className="text-xs text-slate-500 uppercase">Recipient Address</p>
                    <p className="font-mono text-sm text-white">
                      {trade.recipientAddress}
                    </p>

                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Address valid for {formatTime(timeLeft)}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* STEP 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 flex-shrink-0 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                2
              </div>

              <div>
                <h4 className="font-semibold text-white">
                  {isBuy ? "Ship and Prepare Verification" : "Wait for Shipment Confirmation"}
                </h4>

                {isBuy ? (
                  <p className="text-sm text-slate-400 mt-1">
                    Mail the package using a **tracked service**.
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 mt-1">
                    You will receive a tracking update from the buyer.
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* WHATSAPP BOX */}
            <div className="bg-green-950/40 border border-green-800/50 p-5 rounded-xl space-y-4 shadow-lg shadow-green-900/10">
              <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 fill-green-500/20 text-green-400" />
                Contact Counterparty on WhatsApp
              </h3>

              <p className="text-sm text-green-200/80">
                Communicate with <b>{counterpartyName}</b> to verify shipment and payment.
              </p>

              <Button
                asChild
                className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/40 transition-all rounded-xl"
              >
                <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
                  <MessageSquareText className="w-5 h-5 mr-3" />
                  Chat with {counterpartyName}
                </a>
              </Button>

              <p className="text-xs text-green-400/70 text-center pt-2">
                WhatsApp: {counterpartyPhone || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
