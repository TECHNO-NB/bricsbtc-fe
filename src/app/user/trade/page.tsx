"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types ---
interface OfferType {
  id: string;
  type: "BUY" | "SELL";
  price: number;
  minLimit: number;
  maxLimit: number;
  time?: string;
  location: string;
  user: {
    fullName: string;
  };
  crypto: {
    name: string;
    symbol: string;
  };
  paymentMethod: {
    name: string;
  };
  trades: any[];
}

export default function CryptoMarket() {
  const [activeTab, setActiveTab] = useState<"BUY" | "SELL">("BUY");
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cryptoFilter, setCryptoFilter] = useState<string>("");

  const router = useRouter();

  // 🔥 Fetch Offers from API
  const fetchOffers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offer`
      );
      setOffers(res.data || []);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // 🔹 Extract unique crypto list for dropdown
  const cryptoList = Array.from(
    new Set(offers.map((offer) => offer.crypto.name))
  );

  // 🔹 Filter offers by tab, search, and crypto
  const filteredOffers = offers
    .filter((offer) => offer.type === activeTab)
    .filter((offer) => {
      const matchSearch =
        offer.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        offer.location.toLowerCase().includes(search.toLowerCase());
      const matchCrypto = cryptoFilter
        ? offer.crypto.name === cryptoFilter
        : true;
      return matchSearch && matchCrypto;
    });

  const handleClick = (offerId: string) => {
    if (activeTab === "BUY") {
      router.push(`/user/buy/${offerId}`);
    } else {
      router.push(`/user/sell/${offerId}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-blue-900/20 via-slate-950/50 to-slate-950 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col items-center space-y-6 mb-12">
          <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-800 flex relative">
            <button
              onClick={() => setActiveTab("BUY")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "BUY"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Buy Crypto
            </button>
            <button
              onClick={() => setActiveTab("SELL")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "SELL"
                  ? "bg-red-500 text-white shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sell Crypto
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 text-center">
            {activeTab === "BUY" ? "Buy Crypto Instantly" : "Sell Your Crypto"}
          </h1>

          <p className="text-slate-400 text-center max-w-lg">
            Secure P2P marketplace with zero fees. Choose trusted users below.
          </p>
        </div>

        {/* Search / Filter */}
        <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold pl-1">
                Search
              </label>
              <Input
                placeholder="User or Location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl bg-slate-950/50 border-slate-700 focus:border-indigo-500 text-slate-100 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold pl-1">
                Filter by Crypto
              </label>
              <Select
                onValueChange={(value) => setCryptoFilter(value || "")}
                value={cryptoFilter || ""}
              >
                <SelectTrigger className="h-12 rounded-xl bg-slate-950/50 border-slate-700 text-slate-100">
                  <SelectValue placeholder="All Cryptos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cryptocurrencies</SelectLabel>
                    {cryptoList.map((crypto) => (
                      <SelectItem key={crypto} value={crypto}>
                        {crypto}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button className="h-12 w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg">
                <Search className="w-4 h-4 mr-2" /> Find Offers
              </Button>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="text-emerald-400 w-5 h-5" /> Best Offers
            </h3>
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white h-auto p-0 hover:bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" /> Advanced Filter
            </Button>
          </div>

          {loading && (
            <p className="text-center text-slate-400 py-6">Loading offers...</p>
          )}

          {!loading && filteredOffers.length === 0 && (
            <p className="text-center text-slate-400 py-6">
              No offers available right now.
            </p>
          )}

          {!loading &&
            filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                className="group bg-slate-900/40 border-slate-800/60 hover:border-indigo-500/30 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row lg:items-center p-6 gap-6">
                    {/* Left */}
                    <div className="flex items-start gap-4 lg:w-1/4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                          {offer.user.fullName.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">
                          {offer.user.fullName}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3" /> 99%
                          </span>
                          <span>{offer.trades.length} trades</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle */}
                    <div className="lg:w-2/4 grid grid-cols-2 gap-4 lg:border-l lg:border-r border-slate-800 lg:px-8">
                      <div>
                        <p className="text-xs text-slate-500 uppercase mb-1">
                          Limits
                        </p>
                        <p className="text-sm font-medium text-slate-200">
                          ${offer.minLimit} - ${offer.maxLimit}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {offer.time || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase mb-1">
                          Payment
                        </p>
                        <span className="text-[11px] bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">
                          {offer.paymentMethod.name}
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="lg:w-1/4 text-right flex flex-col items-end gap-2">
                      <p className="text-2xl font-bold text-emerald-400">
                        ${offer.price}
                      </p>

                      <p className="text-xs text-slate-500">
                        Price per {offer.crypto.symbol}
                      </p>

                      <Button
                        onClick={() => handleClick(offer.id)}
                        className={`px-6 rounded-xl font-semibold transition-all ${
                          activeTab === "BUY"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {activeTab === "BUY" ? "Buy" : "Sell"}{" "}
                        {offer.crypto.symbol}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
