"use client";

import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950 px-4 py-3 flex items-center justify-between">
      <Input
        placeholder="Search..."
        className="w-72 bg-zinc-900 border-zinc-700 text-white"
      />
      <div className="flex items-center gap-4">
        <Bell className="text-zinc-400" />
        <div className="w-8 h-8 bg-zinc-700 rounded-full" />
      </div>
    </header>
  );
}
