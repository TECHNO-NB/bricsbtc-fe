"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  DollarSign,
  Settings,
  Bell,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Sidebar = ({ children }: any) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const userData: any = useSelector((state: any) => state.user);

  const kycStatus = userData?.kycStatus;

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/user/dashboard" },
    { name: "Message", icon: MessageCircle, href: "/user/message" },
    { name: "Trade", icon: TrendingUp, href: "/user/trade" },
    { name: "Transactions", icon: ListOrdered, href: "/user/transaction" },
    { name: "Investment", icon: DollarSign, href: "/user/investment" },
  ];

  // PENDING + REJECTED → only Dashboard + Message
  const restrictedNav =
    kycStatus === "PENDING" || kycStatus === "REJECTED"
      ? navigation.filter(
          (item) =>
            item.name === "Dashboard" || item.name === "Message"
        )
      : navigation;

  // Always allowed items (notification & settings)
  const alwaysAllowed = ["/user/notification", "/user/setting"];

  // Auto Toast Messages
  useEffect(() => {
    toast.dismiss();

    if (kycStatus === "PENDING") {
      toast.loading("Your KYC is under review", { duration: Infinity });
    }

    if (kycStatus === "REJECTED") {
      toast.error("Your KYC is rejected", { duration: Infinity });
    }
  }, [kycStatus]);

  // BLOCK Restricted Pages EXCEPT Notification & Settings
  useEffect(() => {
    if (kycStatus === "PENDING" || kycStatus === "REJECTED") {
      const allowed = [
        "/user/dashboard",
        "/user/message",
        "/user/notification",
        "/user/setting",
      ];

      if (!allowed.includes(pathname)) {
        router.push("/user/dashboard");
      }
    }
  }, [pathname, kycStatus]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-6">
      <div>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-yellow-500" />
            <h1 className="text-xl font-bold tracking-wider text-white">
              BRICS<span className="text-yellow-500">BTC</span>
            </h1>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          {restrictedNav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </motion.a>
            );
          })}
        </div>
      </div>

      <motion.div
        className="pt-4 border-t border-yellow-500/60"
        whileHover={{ scale: 1.02, backgroundColor: "#27272a" }}
      >
        <button className="flex items-center justify-between w-full p-2 text-zinc-400 hover:text-white rounded-lg group">
          <div className="flex items-center min-w-0">
            <span className="text-sm mr-2 font-medium truncate">
              <LogOut />
            </span>
            Logout
          </div>
          <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-zinc-950 border-r border-yellow-500/60 md:hidden"
            >
              <SidebarContent />
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <nav className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-zinc-950/90 border-r border-yellow-500/60 z-30">
        <SidebarContent />
      </nav>

      {/* HEADER */}
      <header className="fixed top-0 right-0 h-[10vh] w-full md:w-[calc(100%-16rem)] bg-zinc-950/90 backdrop-blur-xl border-b border-yellow-500/60 z-20">
        <div className="flex items-center md:justify-between h-full px-1 md:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white mr-4"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h2 className="text-xl opacity-0 md:opacity-100 md:text-2xl font-bold tracking-tight text-white truncate">
              Welcome Back
            </h2>
          </div>

          <div className="flex items-center space-x-1 md:space-x-4">
            <div
              onClick={() => router.push("/user/notification")}
              className="relative cursor-pointer"
            >
              <Badge
                variant={"destructive"}
                className="absolute left-3 h-4 w-4 text-center -top-1"
              >
                3
              </Badge>
              <Bell
                size={30}
                className={
                  pathname === "/user/notification"
                    ? "text-yellow-500"
                    : "text-zinc-400"
                }
              />
            </div>

            <Button
              onClick={() => router.push("/user/setting")}
              variant="ghost"
              size="icon"
              className={
                pathname === "/user/setting"
                  ? "text-yellow-500"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }
            >
              <Settings className="w-5 h-5" />
            </Button>

            {kycStatus === "APPROVED" && (
              <Button
                onClick={() => router.push("/user/trade")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                <DollarSign className="w-4 h-4 mr-2" /> Buy
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="md:ml-64 pt-[10vh] min-h-screen">{children}</main>
    </div>
  );
};

export default Sidebar;
