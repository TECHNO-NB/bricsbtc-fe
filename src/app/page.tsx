"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import coin from "@/../public/coin.png";
import coin2 from "@/../public/coin2.png";
import coin3 from "@/../public/coin3.png";
import coin4 from "@/../public/coin4.png";

import coverpic from "@/../public/landingcover.jpeg";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Bitcoin,
  Menu,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import About from "@/components/home/About";
import { motion } from "motion/react";
import ChooseCrypto from "@/components/home/ChooseCrypto";
import Trade from "@/components/home/Trade";

import BricsBTCApp from "@/components/home/ImageGallery";
import LearnPage from "./learn/page";
import { useRouter } from "next/navigation";
const router=useRouter();

// Mock Data for the Ticker
const MARKET_TICKER = [
  { pair: "BTC/USDT", price: "64,230.50", change: "+2.4%", isUp: true },
  { pair: "ETH/USDT", price: "3,450.10", change: "-0.8%", isUp: false },
  { pair: "SOL/USDT", price: "145.20", change: "+5.1%", isUp: true },
  { pair: "BNB/USDT", price: "590.00", change: "+1.2%", isUp: true },
];

export default function LandingPage() {
  return (
    <motion.div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30">
      {/* Navbar */}
      <Navbar />

      {/* --- Hero Section --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* background Images */}
        <motion.div
          initial={{ y: -10, x: -10 }}
          animate={{ y: 0, x: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className=" absolute flex items-center justify-center md:top-50 left-1/10 md:left-1/6 bg-[#FEE715]/20 w-16 h-16 rounded-full "
        >
          <Image src={coin} alt="coin" height={50} width={50} />
        </motion.div>
        <motion.div
          initial={{ y: -8 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className=" absolute flex items-center justify-center top-58 md:top-50 right-1/6 bg-[#CC313D]/20 w-16 h-16 rounded-full "
        >
          <Image src={coin2} alt="coin" height={50} width={50} />
        </motion.div>
        <motion.div
          initial={{ y: -10, x: -10 }}
          animate={{ y: 0, x: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className=" absolute flex items-center justify-center bottom-2/5 md:bottom-2/4 left-1/5 bg-[#5A28B0]/20 w-16 h-16 rounded-full "
        >
          <Image src={coin3} alt="coin" height={50} width={50} />
        </motion.div>
        <motion.div
          initial={{ y: -8 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className=" absolute flex items-center justify-center bottom-2/4 right-1/4 bg-[#33875A]/20 w-16 h-16 rounded-full "
        >
          <Image src={coin4} alt="coin" height={50} width={50} />
        </motion.div>

        <div className="container  mx-auto px-4 md:px-6 relative z-10 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-orange-500/50 text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full text-sm"
          >
            🚀 Zero fees on your first deposit
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Buy & Sell Crypto <br className="hidden md:block" />
            with Confidence.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience lightning-fast execution, bank-grade security, and deep
            liquidity on the world's most modern crypto exchange.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0 shadow-lg shadow-orange-500/20"
              >
                Start Trading Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              onClick={()=> router.push("/auth/login")}
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-slate-950/50 backdrop-blur-sm"
            >
              View Markets
            </Button>
          </div>

          {/* Hero Visual / Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            {/* Abstract representation of UI */}
            <div className="p-4 grid grid-cols-12 gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {/* Sidebar */}
              <div className="col-span-2 h-64 bg-slate-800/50 rounded-lg animate-pulse" />
              {/* Chart */}
              <div className="col-span-7 h-64 bg-slate-800/50 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/20 to-transparent" />
                <Image
                  src={coverpic}
                  width={600}
                  height={600}
                  alt="lading page cover pic"
                  className=" object-cover w-full h-full"
                />
              </div>
              {/* Orderbook */}
              <div className="col-span-3 h-64 bg-slate-800/50 rounded-lg flex flex-col gap-2 p-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-2 w-full bg-slate-700/50 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- Live Ticker --- */}
      <div className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm whitespace-nowrap overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 12,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12"
        >
          {[
            ...MARKET_TICKER,
            ...MARKET_TICKER,
            ...MARKET_TICKER,
            ...MARKET_TICKER,
            ...MARKET_TICKER,
          ].map((coin, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-bold text-slate-200">{coin.pair}</span>
              <span className="text-slate-400">{coin.price}</span>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  coin.isUp
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {coin.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- Features Grid --- */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why BRICSBTC?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for both beginners and institutional traders, we provide the
              tools you need to succeed.
            </p>
          </div>

          <motion.div layout="position" className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-blue-500" />}
              title="Bank-Grade Security"
              desc="Your funds are protected by cold storage, multi-sig wallets, and real-time threat detection systems."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-orange-500" />}
              title="Lightning Execution"
              desc="Our matching engine handles up to 100,000 orders per second with virtually zero latency."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-purple-500" />}
              title="Global Access"
              desc="Support for 20+ fiat currencies and 15 languages. Trade from anywhere in the world."
            />
          </motion.div>
        </div>
      </section>

      {/* trade */}
      <section className="   ">
        <Trade />
      </section>
      {/* --- Crypto Listing section Section --- */}
      <section className="py-6 border-y border-white/5 bg-slate-900/20 px-4 flex  md:pl-26 lg:pl-26 ">
        <ChooseCrypto />
      </section>
      {/* learn */}
      <LearnPage />

      {/* Image */}
      <section className="py-6 mt-10 border-y border-white/5 bg-slate-900/20 px-4 flex  md:pl-26 lg:pl-26 ">
        <BricsBTCApp />
      </section>

      {/* about */}
      <section id="about">
        <About />
      </section>
      {/* --- CTA / Footer --- */}
      <footer className="py-12 border-t border-white/10 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-6">
            Start your crypto journey today
          </h2>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-200"
            >
              Create Free Account
            </Button>
          </Link>

          <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© 2024 NextCEX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="bg-slate-900/50 border-white/5 hover:border-orange-500/30 transition-colors group">
      <CardContent className="p-6">
        <div className="mb-4 bg-slate-950 w-fit p-3 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center text-orange-500 text-sm font-medium cursor-pointer group-hover:underline">
          Learn more <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}
