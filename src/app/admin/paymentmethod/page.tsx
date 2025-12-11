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

const Page = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [currentPayment, setCurrentPayment] = useState<any>(null);

  // ===================== Fetch Payment Methods =====================
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods`
      );
      setPayments(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ===================== Create Payment Method =====================
  const addPayment = async () => {
    if (!name) return alert("Name is required");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods`,
        { name, accountNo }
      );
      setOpenAdd(false);
      setName("");
      setAccountNo("");
      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  // ===================== Edit Payment Method =====================
  const editPayment = async () => {
    if (!currentPayment) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods/${currentPayment.id}`,
        { name, accountNo }
      );
      setOpenEdit(false);
      setCurrentPayment(null);
      setName("");
      setAccountNo("");
      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  // ===================== Delete Payment Method =====================
  const deletePayment = async () => {
    if (!currentPayment) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods/${currentPayment.id}`
      );
      setOpenDelete(false);
      setCurrentPayment(null);
      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <Button onClick={() => setOpenAdd(true)}>+ Add Payment Method</Button>
      </div>

      {/* PAYMENT CARDS */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-zinc-900 border border-black rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    💳
                  </div>
                  <div>
                    <h3 className="text-lg">{payment.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {payment.accountNo || "No account number"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setCurrentPayment(payment);
                      setName(payment.name);
                      setAccountNo(payment.accountNo || "");
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setCurrentPayment(payment);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-green-400 text-sm">
                {payment._count?.offers || 0} active offers
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ADD PAYMENT MODAL */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new payment method for users.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Payment name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Account number (optional)"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            className="mb-4"
          />
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
            <Button onClick={addPayment}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT PAYMENT MODAL */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>
              Update payment method details.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Payment name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Account number (optional)"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            className="mb-4"
          />
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button onClick={editPayment}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE PAYMENT MODAL */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{currentPayment?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deletePayment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
