'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Footer() {
  // Data for the footer links to keep the JSX clean
  const router=useRouter();
  const footerLinks = [
    {
      title: "Pages:",
      items: [
        { label: "Home", href: "/" },
        { label: "learn", href: "/learn" },
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/register" },
        { label: "Getting started", href: "/" },
        { label: "Term", href: "/term" },
     
      ],
    },
    {
      title: "Resources:",
      items: [
        { label: "Dashboard", href: "/user/dashboard" },
        { label: "Deposit", href: "/user/deposit" },
        { label: "Investment", href: "/user/investment" },
        { label: "Message", href: "/user/message" },
        { label: "Trade", href: "/user/trade" },
        { label: "Setting", href: "/user/setting" },
      ],
    },
    // {
    //   title: "Participate:",
    //   items: [
    //     { label: "Support Bitcoin", href: "#" },
    //     { label: "Buy Bitcoin", href: "#" },
    //     { label: "Sell Bitcoin", href: "#" },
    //   ],
    // },
    {
      title: "Other:",
      items: [
        { label: "Avoid Scams", href: "/avoidscam" },
        { label: "Legal", href: "/legal" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Term", href: "/term" },
        { label: "Learn", href: "/learn" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#11131f] text-slate-300 mt-10 py-12 border-t border-slate-800 font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* --- Left Section: Donate & Wallet --- */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center gap-4 ">
              <span className="text-white font-bold text-3xl">BRIC<span className="text-yellow-500">BTC</span>:</span>
              <Button 
              onClick={()=>router.push("/auth/login")}
                className="bg text-white font-bold rounded-sm px-6"
              >
                Login
              </Button>
            </div>
            
            {/* Wallet Address */}
            <div className="break-all">
                <Button 
              onClick={()=>router.push("/auth/register")}
                className="bg text-white font-bold rounded-sm px-6"
              >
                Register
              </Button>
            </div>
            
            <div className="text-sm text-slate-500 mt-2">
              <p>&copy; bricbtc.com</p>
            </div>
          </div>

          {/* --- Right Section: Links Columns --- */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <h3 className="text-white font-bold text-lg">{column.title}</h3>
                <ul className="space-y-2">
                  {column.items.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      <p className="">&copy; Bitcoin Project 2009-2025 Released under the MIT license</p>
      </div>
    </footer>
  );
}