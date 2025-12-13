"use client";

import React, { useEffect, useState } from "react";
import { User, Mail, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSelector } from "react-redux";

// ShadCN-like Card
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 shadow-lg hover:border-neutral-500 transition">
    {children}
  </div>
);

const Page = () => {
  const router = useRouter();

  const [admins, setAdmins] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const userData = useSelector((state: any) => state.user);

  // ====================== FETCH ADMINS USING AXIOS ======================
  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/admins/${userData.id}`
      );
      if (data.success) {
        console.log(data);
        setAdmins(data.data);
        setFiltered(data.data);
      }
    } catch (error) {
      console.error("Axios Admin Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch admins on mount
  useEffect(() => {
    fetchAdmins();
  }, [userData.id]);

  // ====================== SEARCH FILTER ======================
  useEffect(() => {
    const result = admins.filter((u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, admins]);

  return (
    <div className="w-full min-h-screen bg-black px-2 py-6 text-white">
      {/* ================= Search Bar ================= */}
      <div className="w-full mb-4">
        <div className="relative mx-auto w-full sm:w-[60%] md:w-[40%] lg:w-[30%]">
          <Search className="absolute z-10 left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-400" />

          <Input
            type="search"
            placeholder="Search admin name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-6 bg-[#111] text-white 
              placeholder:text-gray-500 border border-yellow-500/60 
              focus:border-yellow-500 rounded-2xl backdrop-blur-md 
              transition-all duration-300 w-full"
          />
        </div>
      </div>

      {/* ================= Loading ================= */}
      {loading && (
        <p className="text-center text-yellow-400 text-lg">Loading admins...</p>
      )}

      {/* ================= Grid Display ================= */}
      <div
        className="
          grid gap-4
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        "
      >
        {!loading && filtered?.length === 0 && (
          <p className="text-neutral-400 text-center col-span-full">
            No admin found.
          </p>
        )}

        {filtered?.length > 0 &&
          filtered?.map((admin) => (
            <Card key={admin.id}>
              <div className="w-full h-full relative">
                {/* ================= Unread Messages Badge ================= */}
                {admin.unreadMessages > 0 && (
                  <p className="absolute right-0 top-1/2 -translate-y-1/2 min-w-8 min-h-8 flex items-center justify-center text-xl bg-yellow-400 rounded-full text-red-500 font-bold">
                    {admin.unreadMessages}
                  </p>
                )}

                <div
                  onClick={() => router.push(`/user/chat/${admin.id}`)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center shadow-md">
                    <User className="h-6 w-6" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {admin.fullName}
                    </span>

                    <span className="text-sm flex items-center text-neutral-400">
                      <Mail className="h-4 w-4 mr-1" />
                      {admin.email}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Page;
