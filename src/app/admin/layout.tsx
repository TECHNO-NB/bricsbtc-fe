"use client";

import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex scrollbar-none w-full bg-black text-white">
      {/* Sidebar is fixed, so layout must include left padding */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full md:ml-64">
        {/* Push content down because header is fixed */}
        <main className="pt-24 px-6 pb-6 overflow-y-auto min-h-screen bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
