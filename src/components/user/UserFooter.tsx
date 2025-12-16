'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserFooter() {
  const footerLinks = [
    {
      title: "Pages",
      items: [
        { label: "Home", href: "/user/dashboard" },
        { label: "Learn", href: "/user/learn" },
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/register" },
        { label: "Getting Started", href: "/user/dashboard" },
        { label: "Terms", href: "/user/term" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Dashboard", href: "/user/dashboard" },
        { label: "Deposit", href: "/user/deposit" },
        { label: "Investment", href: "/user/investment" },
        { label: "Message", href: "/user/message" },
        { label: "Trade", href: "/user/trade" },
        { label: "Setting", href: "/user/setting" },
      ],
    },
    {
      title: "Other",
      items: [
        { label: "Avoid Scams", href: "/user/avoidscam" },
        { label: "Legal", href: "/user/legal" },
        { label: "Privacy Policy", href: "/user/privacy" },
        { label: "Terms of Use", href: "/user/term" },
        { label: "Documentation", href: "/user/learn" },
      ],
    },
  ];

  return (
    <footer className="relative w-full bg-[#0b0d17] text-slate-400 mt-20 border-t border-slate-800/50 font-sans">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* --- Left Section: Brand & CTAs --- */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-white font-bold text-3xl tracking-tight">
                BRIC<span className="text-yellow-500">BTC</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-xs">
                Empowering the future of decentralized finance through secure and transparent Bitcoin solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 rounded-full transition-all">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="border-slate-700 bg   px-8 rounded-full transition-all">
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* --- Right Section: Links --- */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((column, index) => (
              <div key={index} className="flex flex-col space-y-5">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.items.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-slate-400 hover:text-yellow-500 transition-colors duration-200 text-[15px] flex items-center group"
                      >
                        <span className="h-[1px] w-0 bg-yellow-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col items-center space-y-4 text-center">
          <p className="text-xs sm:text-sm text-slate-500 tracking-wide uppercase">
           &copy; bricbtc.com @ 2009-2025
          </p>
          <p className="text-[13px] text-slate-600 max-w-2xl leading-loose">
            Bitcoin Project 2009-{new Date().getFullYear()} • Released under the 
            <span className="text-slate-400 hover:text-white cursor-pointer ml-1 underline underline-offset-4">MIT License</span>
          </p>
        </div>
      </div>
    </footer>
  );
}