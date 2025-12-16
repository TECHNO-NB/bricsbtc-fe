// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

const Page = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentOffer, setCurrentOffer] = useState<any>(null);

  // Form state
  const [cryptoId, setCryptoId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [type, setType] = useState<"BUY" | "SELL">("BUY");
  const [price, setPrice] = useState<number>(0);
  const [marginPercent, setMarginPercent] = useState<number>(0);
  const [minLimit, setMinLimit] = useState<number>(0);
  const [maxLimit, setMaxLimit] = useState<number>(0);
  const [location, setLocation] = useState<string>("");

  const userData = useSelector((state: any) => state.user);
  const userId = userData.id; // replace with logged-in user ID

  // ===================== Fetch Offers =====================
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers`
      );
      setOffers(res.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===================== Fetch Payments =====================
  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods`
      );
      setPayments(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ===================== Fetch Cryptos =====================
  const fetchCryptos = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/crypto/all`
      );
      setCryptos(res.data);
    } catch (err) {
      console.log("Fetch Crypto Error:", err);
    }
  };

  // ===================== Create Offer =====================
  const createOffer = async () => {
    
    if (
      !cryptoId ||
      !paymentId ||
      !price ||
      !marginPercent ||
      !minLimit ||
      !maxLimit
    ) {
      return alert("Please fill all required fields");
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers`, {
        userId,
        cryptoId,
        paymentId,
        type,
        price,
        marginPercent,
        minLimit,
        maxLimit,
        location,
      });

      setOpenCreate(false);
      fetchOffers();
      resetForm();
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  // ===================== Edit Offer =====================
  const editOffer = async () => {
    if (!currentOffer) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${currentOffer.id}`,
        {
          cryptoId,
          paymentId,
          type,
          price,
          marginPercent,
          minLimit,
          maxLimit,
          location,
        }
      );

      setOpenEdit(false);
      fetchOffers();
      setCurrentOffer(null);
      resetForm();
    } catch (error) {
      console.error("Error editing offer:", error);
    }
  };

  // ===================== Delete Offer =====================
  const deleteOffer = async () => {
    if (!currentOffer) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${currentOffer.id}`
      );
      setOpenDelete(false);
      fetchOffers();
      setCurrentOffer(null);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  // ===================== Toggle Offer Status =====================
  const toggleOfferStatus = async (offer: any) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offer/toggle/${offer.id}`,
        {
          isActive: !offer.isActive,
        }
      );
      setOffers((prev) =>
        prev.map((o) =>
          o.id === offer.id ? { ...o, isActive: !offer.isActive } : o
        )
      );
    } catch (error) {
      console.error("Error toggling offer:", error);
    }
  };

  const resetForm = () => {
    setCryptoId("");
    setPaymentId("");
    setType("BUY");
    setPrice(0);
    setMarginPercent(0);
    setMinLimit(0);
    setMaxLimit(0);
    setLocation("");
  };

  const openEditModal = (offer: any) => {
    setCurrentOffer(offer);
    setCryptoId(offer.cryptoId);
    setPaymentId(offer.paymentId);
    setType(offer.type);
    setPrice(offer.price);
    setMarginPercent(offer.marginPercent);
    setMinLimit(offer.minLimit);
    setMaxLimit(offer.maxLimit);
    setLocation(offer.location);
    setOpenEdit(true);
  };

  const openDeleteModal = (offer: any) => {
    setCurrentOffer(offer);
    setOpenDelete(true);
  };

  useEffect(() => {
    fetchOffers();
    fetchPayments();
    fetchCryptos();
  }, []);

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Offers</h2>
        <Button onClick={() => setOpenCreate(true)}>+ Add Offer</Button>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto bg-zinc-900 border border-black rounded-xl">
          <table className="min-w-[900px] w-full border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="p-4 text-left text-gray-400">User</th>
                <th className="p-4 text-left text-gray-400">Crypto</th>
                <th className="p-4 text-center text-gray-400">Type</th>
                <th className="p-4 text-right text-gray-400">Price</th>
                <th className="p-4 text-right text-gray-400">Margin</th>
                <th className="p-4 text-right text-gray-400">Limits</th>
                <th className="p-4 text-center text-gray-400">Status</th>
                <th className="p-4 text-center text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-zinc-800">
                  <td className="p-4">{offer.user?.fullName}</td>
                  <td className="p-4">{offer.crypto?.symbol}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        offer.type === "BUY"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {offer.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">${offer.price}</td>
                  <td className="p-4 text-right">{offer.marginPercent}%</td>
                  <td className="p-4 text-right">
                    ${offer.minLimit} - ${offer.maxLimit}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={
                        offer.isActive ? "text-green-400" : "text-gray-400"
                      }
                    >
                      {offer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-center flex justify-center gap-2 text-black">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(offer)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteModal(offer)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      variant={offer.isActive ? "destructive" : "default"}
                      onClick={() => toggleOfferStatus(offer)}
                    >
                      {offer.isActive ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================== Create Offer Dialog ================== */}
  <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogContent className="max-h-[85vh] overflow-hidden">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Create Offer</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new offer
          </DialogDescription>
        </DialogHeader>

        {/* SCROLLABLE FORM AREA */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crypto */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Crypto
              </label>
              <Select value={cryptoId} onValueChange={setCryptoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Crypto" />
                </SelectTrigger>
                <SelectContent>
                  {cryptos.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Payment Method
              </label>
              <Select value={paymentId} onValueChange={setPaymentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {payments.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.accountNo || "No account"})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Offer Type */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Offer Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Offer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Price $
              </label>
              <Input
                type="number"
                placeholder="Price"
                value={price ?? ""}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            {/* Margin */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Margin %
              </label>
              <Input
                type="number"
                placeholder="Margin %"
                value={marginPercent ?? ""}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
              />
            </div>

            {/* Min Limit */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Min Limit $
              </label>
              <Input
                type="number"
                placeholder="Min Limit"
                value={minLimit ?? ""}
                onChange={(e) => setMinLimit(Number(e.target.value))}
              />
            </div>

            {/* Max Limit */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Max Limit $
              </label>
              <Input
                type="number"
                placeholder="Max Limit"
                value={maxLimit ?? ""}
                onChange={(e) => setMaxLimit(Number(e.target.value))}
              />
            </div>

            {/* Location (full width) */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Location
              </label>
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setOpenCreate(false)}>
            Cancel
          </Button>
          <Button onClick={createOffer}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* ================== Edit Offer Dialog ================== */}
   <Dialog open={openEdit} onOpenChange={setOpenEdit}>
  <DialogContent className="max-h-[85vh] overflow-hidden">
    {/* HEADER */}
    <DialogHeader>
      <DialogTitle>Edit Offer</DialogTitle>
      <DialogDescription>
        Edit the details of this offer
      </DialogDescription>
    </DialogHeader>

    {/* SCROLLABLE FORM */}
    <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crypto */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Crypto
          </label>
          <Select value={cryptoId} onValueChange={setCryptoId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Crypto" />
            </SelectTrigger>
            <SelectContent>
              {cryptos.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Payment Method
          </label>
          <Select value={paymentId} onValueChange={setPaymentId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {payments.map((p: any) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} ({p.accountNo || "No account"})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Offer Type */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Offer Type
          </label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Offer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUY">BUY</SelectItem>
              <SelectItem value="SELL">SELL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Price $
          </label>
          <Input
            type="number"
            placeholder="Price"
            value={price ?? ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Margin */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Margin %
          </label>
          <Input
            type="number"
            placeholder="Margin %"
            value={marginPercent ?? ""}
            onChange={(e) => setMarginPercent(Number(e.target.value))}
          />
        </div>

        {/* Min Limit */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Min Limit $
          </label>
          <Input
            type="number"
            placeholder="Min Limit"
            value={minLimit ?? ""}
            onChange={(e) => setMinLimit(Number(e.target.value))}
          />
        </div>

        {/* Max Limit */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Max Limit $
          </label>
          <Input
            type="number"
            placeholder="Max Limit"
            value={maxLimit ?? ""}
            onChange={(e) => setMaxLimit(Number(e.target.value))}
          />
        </div>

        {/* Location – full width */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">
            Location
          </label>
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <DialogFooter className="flex justify-between mt-4">
      <Button variant="outline" onClick={() => setOpenEdit(false)}>
        Cancel
      </Button>
      <Button onClick={editOffer}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      {/* ================== Delete Offer Dialog ================== */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Offer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this offer?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteOffer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
