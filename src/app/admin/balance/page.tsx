"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {  Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  balance: number;
  avatarUrl?: string;
}

export default function AdminBalanceManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users`, { withCredentials: true });
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceChange = async (userId: string, type: "add" | "remove") => {
    if (!amounts[userId] || amounts[userId] <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setActionLoading((prev) => ({ ...prev, [userId]: true }));
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/balance/admin/modify-balance`,
        {
          userId,
          amount: amounts[userId],
          action: type, 
        },
        { withCredentials: true }
      );
      toast.success(`Balance ${type === "add" ? "added" : "removed"} successfully!`);
      fetchUsers(); // Refresh users after update
      setAmounts((prev) => ({ ...prev, [userId]: 0 }));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Action failed");
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin - Manage User Balances</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-white font-bold">{user.fullName}</h3>
                <p className="text-slate-400 text-sm">{user.email}</p>
                <p className="text-slate-400 text-sm">Role: {user.role}</p>
              </div>
            </div>

            {/* Balance Display */}
            <div className="text-white font-semibold text-lg">
              Balance: ${user.balance.toLocaleString()}
            </div>

            {/* Amount Input */}
            <Input
              type="number"
              placeholder="Enter amount"
              value={amounts[user.id] || ""}
              onChange={(e) =>
                setAmounts((prev) => ({ ...prev, [user.id]: Number(e.target.value) }))
              }
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 w-full"
            />

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => handleBalanceChange(user.id, "add")}
                disabled={actionLoading[user.id]}
                className="bg-emerald-600 hover:bg-emerald-700 w-1/2"
              >
                {actionLoading[user.id] ? "Processing..." : "Add Balance"}
              </Button>
              <Button
                onClick={() => handleBalanceChange(user.id, "remove")}
                disabled={actionLoading[user.id]}
                className="bg-red-600 hover:bg-red-700 w-1/2"
              >
                {actionLoading[user.id] ? "Processing..." : "Remove Balance"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
