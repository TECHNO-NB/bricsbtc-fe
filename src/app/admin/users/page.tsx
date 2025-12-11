"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users`, {
        withCredentials: true,
      });
      if (res.data.success) setUsers(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setUpdating(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
        setModalType(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete user");
    } finally {
      setUpdating(false);
    }
  };

  const handleRoleChange = async (id: string, role: "user" | "admin") => {
    setUpdating(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users/${id}`,
        { role },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Role updated successfully");
        fetchUsers();
        setModalType(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update role");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>Loading users...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Users Management</h2>

      <div style={{ backgroundColor: "#1a1a1a", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ backgroundColor: "#222" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Country</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Status</th>
                <th style={{ ...thStyle, textAlign: "center" }}>KYC</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={avatarStyle}>
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                      ) : (
                        user.fullName.charAt(0)
                      )}
                    </div>
                    {user.fullName}
                  </td>
                  <td style={{ padding: "1rem", color: "#888" }}>{user.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        backgroundColor: user.role === "admin" ? "#9945ff33" : "#00d39533",
                        color: user.role === "admin" ? "#9945ff" : "#00d395",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>{user.country}</td>
                  <td style={{ padding: "1rem", textAlign: "center", color: user.isActive ? "#00d395" : "#ff4d4d" }}>
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center", color: user.kyc ? "#00d395" : "#f7931a" }}>
                    {user.kyc ? "Verified" : "Pending"}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                    <Button
                      onClick={() => {
                        setSelectedUser(user);
                        setModalType("view");
                      }}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedUser(user);
                        setModalType("edit");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setSelectedUser(user);
                        setModalType("delete");
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={!!modalType} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "view" && "View User"}
              {modalType === "edit" && "Edit User"}
              {modalType === "delete" && "Delete User"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedUser && modalType === "view" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p><strong>Name:</strong> {selectedUser.fullName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Country:</strong> {selectedUser.country}</p>
                <p><strong>Address:</strong> {selectedUser.address}</p>
                <p><strong>KYC Status:</strong> {selectedUser.kyc ? "Verified" : "Pending"}</p>
                {selectedUser.avatarUrl && <img src={selectedUser.avatarUrl} alt="avatar" style={{ width: "80px", borderRadius: "8px" }} />}
              </div>
            )}

            {selectedUser && modalType === "edit" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p><strong>Name:</strong> {selectedUser.fullName}</p>
                <p><strong>Current Role:</strong> {selectedUser.role}</p>
                <Button
                  onClick={() =>
                    handleRoleChange(selectedUser.id, selectedUser.role === "admin" ? "user" : "admin")
                  }
                  disabled={updating}
                >
                  Change Role to {selectedUser.role === "admin" ? "USER" : "ADMIN"}
                </Button>
              </div>
            )}

            {selectedUser && modalType === "delete" && (
              <p>Are you sure you want to delete <strong>{selectedUser.fullName}</strong>?</p>
            )}
          </DialogDescription>
          <DialogFooter>
            {modalType === "delete" && (
              <Button variant="destructive" onClick={() => handleDelete(selectedUser.id)} disabled={updating}>
                Delete
              </Button>
            )}
            <Button onClick={() => setModalType(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* Styles */
const thStyle = { padding: "1rem", textAlign: "left", color: "#888" };
const avatarStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
