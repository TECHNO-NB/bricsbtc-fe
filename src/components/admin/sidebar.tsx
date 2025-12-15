"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Network,
  Coins,
  CreditCard,
  List,
  Repeat,
  MessageSquare,
  Bell,
  FileCheck,
  Menu,
  X,
  LogOut,
  DollarSign,
  BanknoteArrowUp,
} from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "/admin/users", label: "Users", icon: Users },
  { id: "/admin/networks", label: "Networks", icon: Network },
  { id: "/admin/crypto", label: "Cryptocurrencies", icon: Coins },
  { id: "/admin/paymentmethod", label: "Payment Methods", icon: CreditCard },
  { id: "/admin/offer", label: "Offers", icon: List },
  { id: "/admin/trades", label: "Trades", icon: Repeat },
  { id: "/admin/message", label: "Messages", icon: MessageSquare },
  { id: "/admin/notification", label: "Notifications", icon: Bell },
  { id: "/admin/kyc", label: "KYC Requests", icon: FileCheck },
  { id: "/admin/balance", label: "Manage Balance", icon: DollarSign },
  { id: "/admin/verify-deposit", label: "Verify Deposit", icon: BanknoteArrowUp },
   { id: "/admin/investment", label: "Investment", icon: DollarSign },
];

export default function Sidebar() {
  const [activePage, setActivePage] = useState("/admin/dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`
    );

    if (res.data) {
      router.push("/");
      toast.success("logout success");
    } else {
      toast.error("logout fail");
    }
  };
  return (
    <>
      {/* HEADER */}
      <header className="fixed hide-scrollbar top-0 left-0 w-full z-50 border-b border-zinc-800 bg-zinc-950 px-4 py-3 flex items-center justify-between">
        <button
          className="md:hidden p-3 bg-black text-white rounded-lg shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Input
          placeholder="Search..."
          className="w-72 bg-zinc-900 border-zinc-700 text-white"
        />

        <div className="flex items-center gap-4">
          <div onClick={handleLogout} className="w-8 h-8 bg-zinc-700 flex items-center justify-center rounded-full cursor-pointer">
            <LogOut size={20} />
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
     <aside
  className={`fixed top-16 left-0 
    h-[calc(100vh-4rem)]  
    
    w-64
    bg-[#0f0f0f] border-r border-gray-800 p-4 
    flex flex-col transition-transform duration-300 z-40 
    overflow-y-auto overflow-x-hidden hide-scrollbar // vertical scroll
    ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} 
    md:translate-x-0`}
>
  <h2 className="text-xl font-bold mb-6 text-white px-2">
    ⚡ Admin Panel
  </h2>

  <nav className="space-y-2">
    {menuItems.map(({ id, label, icon: Icon }) => (
      <Link
        key={id}
        href={id}
        onClick={() => {
          setActivePage(id);
          setSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
          ${
            activePage === id
              ? "bg-gray-800 text-white border border-gray-700"
              : "text-gray-400 hover:bg-gray-800"
          }
        `}
      >
        <Icon size={18} />
        {label}
      </Link>
    ))}
  </nav>

  {/* Bottom User Info */}
  <div className="mt-auto">
    <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
        A
      </div>
      <div>
        <p className="text-sm font-medium text-white">Admin</p>
        <p className="text-xs text-gray-400">admin</p>
      </div>
    </div>
  </div>
</aside>

    </>
  );
}
