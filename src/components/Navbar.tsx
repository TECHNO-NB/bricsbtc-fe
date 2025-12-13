// @ts-nocheck
"use client";

import React, { useState } from "react";
import logo from "@/../public/logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: -0, opacity: 100 }}
        transition={{
          ease: "linear",
          duration: 0.6,
          delay: 0.1,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div onClick={() => router.push("/")} className="flex  cursor-pointer items-center gap-2 text-xl font-bold">
            <div
              
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600"
            >
              <Image src={logo} alt="logo" height={55} width={55} />
            </div>
            <span>
              BRICS<span className="text-yellow-500">BTC</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            <Link
              href="/auth/login"
              className="hover:text-white transition-colors"
            >
              Earn
            </Link>
            <Link href="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/term" className="hover:text-white transition-colors">
              Term
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-slate-300 hover:text-white md:block"
            >
              Log In
            </Link>

            <Link href="/auth/register">
              <Button className="bg-white text-slate-950 hover:bg-slate-200 font-semibold">
                Sign Up
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-400"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-slate-900 text-white z-[999] p-6 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-slate-300"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Sidebar Menu */}
        <div className="mt-10 flex flex-col gap-6 text-lg font-medium">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
            Earn
          </Link>
          <Link href="/learn" onClick={() => setMobileOpen(false)}>
            Learn
          </Link>
          <Link href="/term" className="hover:text-white transition-colors">
            Term
          </Link>
          <div className="flex flex-col gap-4">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-semibold">
                Log In
              </Button>
            </Link>
            <Link
              href="/auth/register"
              className=""
              onClick={() => setMobileOpen(false)}
            >
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700  font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* BACKDROP (click to close) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[998] md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
``;
