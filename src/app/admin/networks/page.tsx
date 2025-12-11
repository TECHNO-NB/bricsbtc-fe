"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  networkId: string;
}

interface Network {
  id: string;
  name: string;
  symbol: string;
  info: string;
  cryptos: Crypto[];
}

const Page = () => {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<Network | null>(null);
  const [editData, setEditData] = useState({ name: "", symbol: "", info: "" });
  const [mode, setMode] = useState<"edit" | "delete">("edit");

  const fetchNetworks = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/network`, {
        withCredentials: true,
      });
      if (res.data.success) setNetworks(res.data.data);
    } catch (error) {
      console.error("Error fetching networks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworks();
  }, []);

  const handleOpen = (network: Network, type: "edit" | "delete") => {
    setCurrentNetwork(network);
    setMode(type);
    if (type === "edit") {
      setEditData({ name: network.name, symbol: network.symbol, info: network.info });
    }
    setOpen(true);
  };

  const handleEdit = async () => {
    if (!currentNetwork) return;
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/network/${currentNetwork.id}`,
        editData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Network updated!");
        fetchNetworks();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update network");
    }
  };

  const handleDelete = async () => {
    if (!currentNetwork) return;
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/network/${currentNetwork.id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Network deleted!");
        fetchNetworks();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete network");
    }
  };

  if (loading)
    return (
      <p className="text-white text-center mt-8">Loading networks...</p>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Networks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {networks.map((network) => (
          <div key={network.id} className="bg-[#1a1a1a] border border-black rounded-xl p-5">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">{network.name}</h3>
                <span className="bg-[#627eea33] text-[#627eea] px-2 py-1 rounded text-xs">
                  {network.symbol}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleOpen(network, "edit")}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleOpen(network, "delete")}>
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-gray-400 mb-1 text-sm">{network.info}</p>
            <p className="text-green-400 text-sm">{network.cryptos?.length || 0} cryptocurrencies</p>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {mode === "edit" && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Network</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 my-3">
                <Input
                  placeholder="Name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <Input
                  placeholder="Symbol"
                  value={editData.symbol}
                  onChange={(e) => setEditData({ ...editData, symbol: e.target.value })}
                />
                <Input
                  placeholder="Info"
                  value={editData.info}
                  onChange={(e) => setEditData({ ...editData, info: e.target.value })}
                />
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleEdit}>Save</Button>
              </DialogFooter>
            </>
          )}
          {mode === "delete" && (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p className="text-gray-400 my-3">
                Are you sure you want to delete <b>{currentNetwork?.name}</b>?
              </p>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
