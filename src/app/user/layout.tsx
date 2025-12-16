import Footer from "@/components/Footer";
import Sidebar from "@/components/user/Sidebar";
import UserFooter from "@/components/user/UserFooter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Assuming these paths are correct in your project
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRICSBTC | User Dashboard", // Updated title
  description: "User dashboard for BRICSBTC trading platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 1. The entire dashboard is wrapped in the min-h-screen container.
          2. The Sidebar component now acts as the Dashboard shell, containing:
             - The full-height Desktop Sidebar (fixed w-64).
             - The fixed Top Navbar (h-10vh).
             - The main content container where {children} is placed.
        */}
        <div className="min-h-screen bg-zinc-950 text-white">
          <Sidebar>
            {/* The `Sidebar` component now accepts `children` and renders 
              it inside its `<main>` content area. 
              We need to modify the Sidebar component to accept and render props.children.
            */}
            {children}
          </Sidebar>
          <div className=" md:ml-64">
            <UserFooter/>
          </div>
        </div>
      </body>
    </html>
  );
}