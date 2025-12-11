"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  network?: { name: string; symbol: string } | null;
};

const Page = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [addForm, setAddForm] = useState({
    name: "",
    symbol: "",
    price: 0,
    changePercent: 0,
  });

  const [editForm, setEditForm] = useState({
    name: "",
    symbol: "",
    price: 0,
    changePercent: 0,
  });

  // ======================
  // FETCH ALL CRYPTOS
  // ======================
  const fetchCryptos = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/crypto/all`
      );
      setCryptos(res.data);
    } catch (err) {
      console.log("Fetch Crypto Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);

  // ======================
  // ADD CRYPTO
  // ======================
  const handleAddCrypto = async () => {
    if (!addForm.name || !addForm.symbol || addForm.price === 0) {
      alert("Name, Symbol and Price are required!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/crypto`,
        addForm
      );
      setCryptos((prev) => [...prev, res.data]);
      setIsAddOpen(false);
      setAddForm({ name: "", symbol: "", price: 0, changePercent: 0 });
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding crypto");
      console.log("Add Crypto Error:", err);
    }
  };

  // ======================
  // EDIT CRYPTO
  // ======================
  const handleEditCrypto = async () => {
    if (!selectedCrypto) return;

    if (!editForm.name || !editForm.symbol || editForm.price === 0) {
      alert("Name, Symbol and Price are required!");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/crypto/${selectedCrypto.id}`,
        editForm
      );

      setCryptos((prev) =>
        prev.map((c) => (c.id === selectedCrypto.id ? res.data : c))
      );
      setIsEditOpen(false);
      setSelectedCrypto(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error updating crypto");
      console.log("Edit Crypto Error:", err);
    }
  };

  // ======================
  // DELETE CRYPTO
  // ======================
  const handleDeleteCrypto = async () => {
    if (!selectedCrypto) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/crypto/${selectedCrypto.id}`
      );
      setCryptos((prev) => prev.filter((c) => c.id !== selectedCrypto.id));
      setIsDeleteOpen(false);
      setSelectedCrypto(null);
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Cryptocurrencies</h2>

        {/* ADD CRYPTO DIALOG */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-400 text-black font-medium">
              + Add Crypto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Crypto</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-2">
              <input
                placeholder="Name"
                className="border p-2 rounded"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              />
              <input
                placeholder="Symbol"
                className="border p-2 rounded"
                value={addForm.symbol}
                onChange={(e) =>
                  setAddForm({ ...addForm, symbol: e.target.value.toUpperCase() })
                }
              />
              <input
                placeholder="Price"
                type="number"
                className="border p-2 rounded"
                value={addForm.price}
                onChange={(e) =>
                  setAddForm({ ...addForm, price: parseFloat(e.target.value) })
                }
              />
              <input
                placeholder="Change Percent"
                type="number"
                className="border p-2 rounded"
                value={addForm.changePercent}
                onChange={(e) =>
                  setAddForm({ ...addForm, changePercent: parseFloat(e.target.value) })
                }
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button className="bg-green-400" onClick={handleAddCrypto}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 border border-black rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-zinc-800">
              <tr>
                <th className="p-4 text-left text-gray-400">Name</th>
                <th className="p-4 text-right text-gray-400">Price</th>
                <th className="p-4 text-right text-gray-400">24h Change</th>
                <th className="p-4 text-left text-gray-400">Network</th>
                <th className="p-4 text-center text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto) => (
                <tr key={crypto.id} className="border-b border-zinc-800">
                  <td className="p-4 flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                        crypto.symbol === "BTC"
                          ? "bg-orange-500"
                          : crypto.symbol === "ETH"
                          ? "bg-blue-600"
                          : "bg-zinc-700"
                      }`}
                    >
                      {crypto.symbol?.slice(0, 2)}
                    </div>
                    <div>
                      <p className="m-0 font-medium">{crypto.name}</p>
                      <p className="text-gray-400 text-xs m-0">{crypto.symbol}</p>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium">
                    ${crypto.price.toLocaleString()}
                  </td>
                  <td
                    className={`p-4 text-right ${
                      crypto.changePercent >= 0 ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {crypto.changePercent >= 0 ? "+" : ""}
                    {crypto.changePercent}%
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-600/20 text-blue-600 px-2 py-1 rounded text-xs">
                      {crypto.network?.symbol || "-"}
                    </span>
                  </td>
                  <td className="p-4 text-center flex justify-center gap-2">
                    {/* EDIT DIALOG */}
                    <Dialog
                      open={isEditOpen && selectedCrypto?.id === crypto.id}
                      onOpenChange={setIsEditOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="bg-zinc-800 text-white"
                          onClick={() => {
                            setSelectedCrypto(crypto);
                            setEditForm({
                              name: crypto.name,
                              symbol: crypto.symbol,
                              price: crypto.price,
                              changePercent: crypto.changePercent,
                            });
                            setIsEditOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Crypto</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-3 mt-2">
                          <input
                            placeholder="Name"
                            className="border p-2 rounded"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                          />
                          <input
                            placeholder="Symbol"
                            className="border p-2 rounded"
                            value={editForm.symbol}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                symbol: e.target.value.toUpperCase(),
                              })
                            }
                          />
                          <input
                            placeholder="Price"
                            type="number"
                            className="border p-2 rounded"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({ ...editForm, price: parseFloat(e.target.value) })
                            }
                          />
                          <input
                            placeholder="Change Percent"
                            type="number"
                            className="border p-2 rounded"
                            value={editForm.changePercent}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                changePercent: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                          <Button className="bg-green-400" onClick={handleEditCrypto}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* DELETE DIALOG */}
                    <Dialog
                      open={isDeleteOpen && selectedCrypto?.id === crypto.id}
                      onOpenChange={setIsDeleteOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => {
                            setSelectedCrypto(crypto);
                            setIsDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Delete</DialogTitle>
                        </DialogHeader>
                        <p className="mt-2">
                          Are you sure you want to delete {crypto.name}?
                        </p>
                        <DialogFooter>
                          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                          <Button className="bg-red-500" onClick={handleDeleteCrypto}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Page;
