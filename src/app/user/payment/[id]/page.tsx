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
  ListOrdered,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function PaymentVerification() {
  const params = useParams();
  const [trade, setTrade] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // Hardcoded 60 minutes
  const userData = useSelector((state: any) => state.user);

  // Fetch trade data
  useEffect(() => {
    const fetchTrade = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/${params.id}`
        );
        const data = res.data.data;
        setTrade(data);
        // Start timer from hardcoded 60 minutes
        setTimeLeft(
          data.paymentWindowMinutes ? data.paymentWindowMinutes * 60 : 3600
        );
      } catch (err) {
        console.error("Error fetching trade:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrade();
  }, [params.id]);

  // Countdown timer (frontend only)
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Tidio chat visitor data
  useEffect(() => {
    if (trade && window.tidioChatApi) {
      window.tidioChatApi.setVisitorData({
        tradeId: trade.id,
        tradeType: trade.offer.type,
        counterparty: trade.offer.user.fullName,
        email: userData.email,
      });
    }
  }, [trade, userData]);

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

  const isBuy = trade.offer.type === "BUY";

  let cryptoAmount: number;
  let usdAmount: number;

  if (isBuy) {
    usdAmount = trade.amountUSD;
    cryptoAmount = trade.amountUSD / trade.offer.price;
  } else {
    cryptoAmount = trade.amountUSD;
    usdAmount = trade.amountUSD * trade.offer.price;
  }

  const isTimeCritical = timeLeft <= 300 && timeLeft > 0;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <Card className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
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
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Trade Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {isBuy ? "Amount Received" : "Amount Paid"}{" "}
                  {trade.crypto.name} ({trade.crypto.symbol})
                </span>
                <span className="font-bold text-white">{cryptoAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  {isBuy ? "Amount Paid" : "Amount Received"} (USD)
                </span>
                <span className="font-bold text-white">${usdAmount}</span>
              </div>

              <Separator className="bg-slate-800 my-2" />

              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${
                      isTimeCritical ? "text-red-500" : "text-blue-400"
                    }`}
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
              <div className="w-8 h-8 shrink-0 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                1
              </div>

              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  {isBuy
                    ? "Prepare Cash By Mail"
                    : "Wait for Buyer to Send Cash"}
                  <Mail className="w-4 h-4" />
                </h4>

                <p className="text-sm text-slate-400 mt-1">
                  {isBuy
                    ? "Secure the payment. DO NOT mention crypto."
                    : "The buyer is preparing the cash package."}
                </p>

                {isBuy && (
                  <div className="mt-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700 space-y-1">
                    <p className="text-xs text-slate-500 uppercase">
                      Recipient Address
                    </p>
                    <p className="font-mono text-sm text-white">
                      {trade.recipientAddress}
                    </p>
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Address valid for{" "}
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* STEP 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 shrink-0 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                2
              </div>

              <div>
                <h4 className="font-semibold text-white">
                  {isBuy
                    ? "Ship and Prepare Verification"
                    : "Wait for Shipment Confirmation"}
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  {isBuy
                    ? "Mail the package using a tracked service."
                    : "You will receive a tracking update from the buyer."}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* TIDIO CHAT */}
            <div className="bg-blue-950/40 border border-blue-800/50 p-5 rounded-xl space-y-4 shadow-lg shadow-blue-900/10">
              <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 fill-blue-500/20 text-blue-400" />
                Contact Support via Tidio Chat
              </h3>

              <p className="text-sm text-blue-200/80">
                You can contact support for payment verification or shipping
                assistance.
              </p>

              <Button
                onClick={() => {
                  if (window.tidioChatApi) window.tidioChatApi.open();
                }}
                className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/40 transition-all rounded-xl"
              >
                Open Tidio Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
