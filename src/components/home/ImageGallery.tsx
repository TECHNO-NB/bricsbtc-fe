'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  MessageCircle, 
  ArrowRightLeft, 
  Bitcoin, 
  DollarSign, 
  Wallet, 
  Home, 
  TrendingUp, 
  Phone,
  ShieldCheck,
  Globe,
  Clock
} from 'lucide-react'

// Import your assets
import banner1 from "@/../public/banner1.jpeg"
import banner2 from "@/../public/banner2.jpeg"
import banner3 from "@/../public/banner3.jpeg"

const BricsBTCApp = () => {
  // State for Navigation and Background
  const [activeView, setActiveView] = useState<'home' | 'trade' | 'contact'>('home')
  const [activeSlide, setActiveSlide] = useState(0)
  
  // Carousel Logic
  const banners = [banner1, banner2, banner3]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  // --- SUB-COMPONENTS ---

  // 1. HOME VIEW
  const HomeView = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          Live Market: BTC/USD $65,420.00
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
          TRADE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">BRICS</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-xl mx-auto">
          The premium decentralized gateway for BricsBTC. Instant settlements, zero hidden fees, and 24/7 broker support.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => setActiveView('trade')}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" /> Start Trading
        </button>
        <button 
          onClick={() => setActiveView('contact')}
          className="px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur border border-zinc-700 text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" /> Contact Broker
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
        {[
          { icon: ShieldCheck, title: "Escrow Secure", desc: "100% Funds Protection" },
          { icon: Clock, title: "Instant Settlment", desc: "Under 5 Minutes" },
          { icon: Globe, title: "Global Access", desc: "Trade from Anywhere" },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-black/40 backdrop-blur-md border border-zinc-800 rounded-2xl flex flex-col items-center gap-3">
            <item.icon className="w-8 h-8 text-yellow-500" />
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="text-sm text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // 2. TRADE VIEW (The Calculator)
  const TradeView = () => {
    const [mode, setMode] = useState<'buy' | 'sell'>('buy')
    const [amt, setAmt] = useState('')
    const rate = 65000
    const result = amt ? (mode === 'buy' ? (parseFloat(amt)/rate).toFixed(6) : (parseFloat(amt)*rate).toFixed(2)) : '0.00'

    return (
      <div className="w-full max-w-md animate-in slide-in-from-bottom-10 duration-500">
        <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Exchange</h2>
            <div className="flex bg-zinc-900 p-1 rounded-lg">
              {['buy', 'sell'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md capitalize transition-all ${
                    mode === m ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 hover:border-yellow-500/30 transition-colors">
              <label className="text-xs text-zinc-500 block mb-1">{mode === 'buy' ? 'You Pay' : 'You Sell'}</label>
              <div className="flex items-center justify-between">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                  className="bg-transparent text-2xl font-bold w-full outline-none placeholder:text-zinc-700" 
                />
                <span className="text-sm font-bold bg-black/50 px-2 py-1 rounded text-zinc-300">
                  {mode === 'buy' ? 'USD' : 'BTC'}
                </span>
              </div>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-zinc-800 p-2 rounded-full border border-zinc-950">
                <ArrowRightLeft className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
              <label className="text-xs text-zinc-500 block mb-1">You Receive</label>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-zinc-300">{result}</div>
                <span className="text-sm font-bold bg-black/50 px-2 py-1 rounded text-zinc-300">
                  {mode === 'buy' ? 'BTC' : 'USD'}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5" />
            {mode === 'buy' ? 'Buy Now' : 'Cash Out'}
          </button>
          
          <p className="text-center text-xs text-zinc-600 mt-4">
            Exchange Rate: 1 BTC ≈ ${rate.toLocaleString()}
          </p>
        </div>
      </div>
    )
  }

  // 3. CONTACT VIEW
  const ContactView = () => (
    <div className="w-full max-w-4xl animate-in slide-in-from-right-10 duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Info Card */}
        <div className="space-y-6 bg-zinc-950/80 backdrop-blur-md p-8 rounded-3xl border border-zinc-800">
          <div>
            <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-zinc-400">Our brokers are available 24/7 via WhatsApp for instant trade execution.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Official WhatsApp</p>
                <p className="text-lg font-bold text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Security Center</p>
                <p className="text-lg font-bold text-white">Verified Broker</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500 to-yellow-700 p-8 rounded-3xl text-black text-center shadow-xl">
          <MessageCircle className="w-16 h-16 mb-4 text-black/80" />
          <h3 className="text-2xl font-black mb-2">Start Chat Now</h3>
          <p className="text-black/70 mb-8 font-medium">Click below to open a direct secure line with our trading desk.</p>
          <a 
            href="https://wa.me/1234567890" 
            target="_blank"
            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Open WhatsApp
          </a>
        </div>
      </div>
    </div>
  )

  // --- MAIN RENDER ---
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner}
              alt="bg"
              fill
              className="object-cover opacity-30" // Lower opacity for better readability
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
          </div>
        ))}
      </div>

      {/* HEADER NAV */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="h-9 w-9 bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-black">B</div>
          <span className="text-xl font-bold"><span className="text-yellow-500"></span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-full p-1 gap-1">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'trade', label: 'Trade', icon: TrendingUp },
            { id: 'contact', label: 'Support', icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeView === tab.id 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <button className="md:hidden p-2 text-zinc-300">
          {/* Simple Mobile Menu Icon (Visual only for this snippet) */}
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </div>
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full h-[calc(100vh-100px)] px-6">
        {activeView === 'home' && <HomeView />}
        {activeView === 'trade' && <TradeView />}
        {activeView === 'contact' && <ContactView />}
      </main>

      {/* MOBILE BOTTOM NAV (Visible only on small screens) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-2xl p-2 flex justify-between shadow-2xl">
           {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'trade', label: 'Trade', icon: TrendingUp },
            { id: 'contact', label: 'Contact', icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all ${
                activeView === tab.id 
                  ? 'bg-yellow-500 text-black' 
                  : 'text-zinc-500'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold uppercase">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default BricsBTCApp