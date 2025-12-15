"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, RefreshCw } from "lucide-react";

interface Package {
  id: string;
  amount: number;
  plan: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [refund, setRefund] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages`,
        { withCredentials: true }
      );
      setPackages(res.data);
    } catch (err) {
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPackage) return;
    setActionLoading(true);
    try {
      const url = refund
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages/delete/refund/${selectedPackage.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages/delete/${selectedPackage.id}`;

      await axios.delete(url, { withCredentials: true });
      toast.success(
        refund
          ? "Package deleted & balance refunded"
          : "Package deleted successfully"
      );
      setDialogOpen(false);
      fetchPackages();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete package");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-10 text-xl">Loading packages...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Admin - Manage Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
          >
            <div>
              <h3 className="text-white font-bold">{pkg.plan} Plan</h3>
              <p className="text-slate-400">User: {pkg.user.fullName}</p>
              <p className="text-slate-400">Email: {pkg.user.email}</p>
              <p className="text-white font-semibold text-lg">${pkg.amount}</p>
              <p className="text-slate-400 text-sm">
                {new Date(pkg.createdAt).toLocaleString()}
              </p>
            </div>

            <Button
              className="bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 mt-2"
              onClick={() => {
                setSelectedPackage(pkg);
                setRefund(false);
                setDialogOpen(true);
              }}
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>

            <Button
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 mt-2"
              onClick={() => {
                setSelectedPackage(pkg);
                setRefund(true);
                setDialogOpen(true);
              }}
            >
              <RefreshCw className="w-4 h-4" /> Delete & Refund
            </Button>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold">
              {refund ? "Delete & Refund Package" : "Delete Package"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-slate-400">
            Are you sure you want to{" "}
            {refund ? "delete this package and refund balance" : "delete this package"}?
          </div>
          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              className={refund ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}
              onClick={handleDelete}
              disabled={actionLoading}
            >
              {actionLoading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
