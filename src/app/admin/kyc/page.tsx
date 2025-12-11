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

// Enum for KYC status
enum KycStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

const Page = () => {
  const [kycRequests, setKycRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch KYC requests
  const fetchKyc = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users`
      );
      setKycRequests(res.data.data);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  // Get color based on KYC status
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case KycStatus.APPROVED:
        return "#00d395";
      case KycStatus.PENDING:
        return "#f7931a";
      case KycStatus.REJECTED:
        return "#ff4d4d";
      default:
        return "#888";
    }
  };

  const handleOpenDialog = (user: any) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleKycChange = async (status: KycStatus) => {
    if (!selectedUser) return;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users/${selectedUser.id}/kyc`,
        { kycStatus: status }
      );

      // Update table data immediately
      setKycRequests((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? { ...user, kyc: status === KycStatus.APPROVED, kycStatus: status }
            : user
        )
      );

      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">KYC Requests</h2>
        <select className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading KYC requests...</p>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-4 text-left text-gray-400">User</th>
                <th className="p-4 text-left text-gray-400">Document Type</th>
                <th className="p-4 text-center text-gray-400">Attachments</th>
                <th className="p-4 text-center text-gray-400">Status</th>
                <th className="p-4 text-left text-gray-400">Date</th>
                <th className="p-4 text-center text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kycRequests.map((user) => {
                const attachments = user.kycData?.attachment?.length || 0;
                const status = user.kycStatus || (user.kyc ? KycStatus.APPROVED : KycStatus.PENDING);

                return (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                        {user.fullName.charAt(0)}
                      </div>
                      {user.fullName}
                    </td>
                    <td className="p-4">{user.kycData?.documentType || "-"}</td>
                    <td className="p-4 text-center">{attachments} files</td>
                    <td className="p-4 text-center">
                      <span
                        className="px-3 py-1 rounded-md text-sm font-medium"
                        style={{
                          backgroundColor: `${getStatusColor(status)}22`,
                          color: getStatusColor(status),
                        }}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <Button variant="secondary" onClick={() => handleOpenDialog(user)}>
                        View / Change
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modern Shadcn Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl p-6 bg-gray-900 text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">KYC Details</DialogTitle>
            <DialogDescription className="text-gray-300">
              Detailed view of user KYC information.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.avatarUrl || "https://via.placeholder.com/80"}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p><strong>Name:</strong> {selectedUser.fullName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Address:</strong> {selectedUser.address || "-"}</p>
                  <p><strong>Status:</strong> {selectedUser.kycStatus || (selectedUser.kyc ? "APPROVED" : "PENDING")}</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Attachments:</p>
                <div className="flex gap-4 flex-wrap">
                  {selectedUser.kycData?.attachment?.map((att: string, idx: number) => (
                    <a
                      key={idx}
                      href={att}
                      target="_blank"
                      className="w-32 h-32 rounded-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform"
                    >
                      <img
                        src={att}
                        alt={`Attachment ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                  {(!selectedUser.kycData?.attachment || selectedUser.kycData?.attachment.length === 0) && (
                    <p className="text-gray-400">No attachments uploaded.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 flex justify-between">
            <div className="flex gap-2">
              <Button
                className="bg-green-500"
                onClick={() => handleKycChange(KycStatus.APPROVED)}
                disabled={selectedUser?.kycStatus === KycStatus.APPROVED}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleKycChange(KycStatus.REJECTED)}
                disabled={selectedUser?.kycStatus === KycStatus.REJECTED || selectedUser?.kycStatus === KycStatus.APPROVED} // Only PENDING can be rejected
              >
                Reject
              </Button>
            </div>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
