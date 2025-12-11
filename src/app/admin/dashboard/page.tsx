"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [stats, setStats] = useState<any>(null);
  const [latestTrades, setLatestTrades] = useState<any[]>([]);
  const [pendingKyc, setPendingKyc] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
      case "APPROVED":
      case "ACTIVE":
        return "#00d395";
      case "PENDING":
        return "#f7931a";
      case "CANCELLED":
      case "REJECTED":
        return "#ff4d4d";
      default:
        return "#888";
    }
  };

  // ========================= FETCH DASHBOARD =========================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/admin/dashboard/fcbd0bde-e90c-4444-887e-dc07afa13449"); 
        const data = res.data.data;

        setStats(data.stats);
        setLatestTrades(data.latestTrades);
        setPendingKyc(data.pendingKycUsers ?? []); // if your API later adds KYC
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div>
      <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.5rem" }}>
        Dashboard Overview
      </h2>

      {/* ========================= STATS CARD ========================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "Total Users", value: stats.totalUsers, color: "#00d395" },
          { label: "Active Offers", value: stats.totalActiveOffers, color: "#f7931a" },
          { label: "Pending Trades", value: stats.totalPendingTrades, color: "#627eea" },
          { label: "Cryptocurrencies", value: stats.totalCryptoCurrencies, color: "#9945ff" },
          { label: "Networks", value: stats.totalNetworks, color: "#00d395" },
          { label: "Unread Messages", value: stats.unreadMessages, color: "#ff4d4d" },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1a1a1a",
              border: "2px solid #000",
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <p
              style={{
                color: "#888",
                margin: "0 0 0.5rem 0",
                fontSize: "0.875rem",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "2rem",
                fontWeight: "bold",
                color: stat.color,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ========================= TRADES + KYC ========================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* ================= RECENT TRADES ================= */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "2px solid #000",
            borderRadius: "12px",
            padding: "1.25rem",
          }}
        >
          <h3 style={{ margin: "0 0 1rem 0" }}>Recent Trades</h3>

          {latestTrades.slice(0, 3).map((trade) => (
            <div
              key={trade.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem",
                backgroundColor: "#222",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: "500" }}>
                  {trade.offer.crypto.symbol} • {trade.offer.type}
                </p>
                <p style={{ margin: 0, color: "#888", fontSize: "0.75rem" }}>
                  Buyer: {trade.offer.user.fullName}
                </p>
              </div>

              <span
                style={{
                  color: getStatusColor(trade.status),
                  fontSize: "0.875rem",
                }}
              >
                {trade.status}
              </span>
            </div>
          ))}
        </div>

        {/* ================= PENDING KYC ================= */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "2px solid #000",
            borderRadius: "12px",
            padding: "1.25rem",
          }}
        >
          <h3 style={{ margin: "0 0 1rem 0" }}>Pending KYC</h3>

          {pendingKyc.length === 0 && (
            <p style={{ color: "#777" }}>No pending KYC requests</p>
          )}

          {pendingKyc.map((kyc) => (
            <div
              key={kyc.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem",
                backgroundColor: "#222",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: "500" }}>{kyc.fullName}</p>
                <p style={{ margin: 0, color: "#888", fontSize: "0.75rem" }}>
                  {kyc.documentType}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                onClick={()=> router.push("/admin/kyc")}
                  style={{
                    backgroundColor: "#00d395",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.25rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                 onClick={()=> router.push("/admin/kyc")}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.25rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
