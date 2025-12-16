import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { WrapperLayout } from "@/components/WrapperLayout";
import Script from "next/script"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRICSBTC",
  description: "Bricbtc safe CryptoCurrency Trading site",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
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
        <WrapperLayout>{children}</WrapperLayout>
        
        
        <Script src="//code.tidio.co/yuci5joj6i4r2kfcb9gpencngirkdx8d.js" async></Script>

        <Toaster />
      </body>
    </html>
  );
}
