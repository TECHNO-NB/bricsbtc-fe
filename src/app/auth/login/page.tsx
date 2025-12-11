"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
// import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // optional if redirect needed

export default function LoginPage() {
  // const { toast } = useToast();
  const router = useRouter(); // optional if redirect needed

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Login Successful");

      if (res.data.data.role === "user") {
        router.push("/user/dashboard");
      } else if (res.data.data.role === "admin") {
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-yellow-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 w-full max-w-md px-4"
      >
        <div className="bg-slate-950 border border-zinc-800/50 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden relative p-6">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

          {/* Logo */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 w-16 h-16 flex items-center justify-center shadow-inner"
            >
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">
              BRICS<span className="text-yellow-500">BTC</span>
            </h1>
            <p className="text-zinc-400 text-sm">
              Institutional Grade Crypto Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="investor@bricsbtc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-500/50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>
                <a className="text-xs text-yellow-500 hover:text-yellow-400 cursor-pointer">
                  Forgot password?
                </a>
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-500/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold h-11 shadow-lg shadow-yellow-500/20 transition-all"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <span className="flex items-center gap-2">
                  Access Portal <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-zinc-400">Don’t have an account?</span>
            <Link
              href="/auth/register"
              className="text-orange-500 ml-1 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
