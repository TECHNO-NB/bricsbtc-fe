'use client'

import React, { useState } from 'react'
import { 
  BookOpen, 
  PlayCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Shield, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react'
import Navbar from '@/components/Navbar'

const LearnPage = () => {
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is BricsBTC?",
      answer: "BricsBTC is a decentralized platform allowing you to buy and sell Bitcoin securely using escrow services, ensuring your funds are protected until the transaction is complete."
    },
    {
      question: "How do I buy Bitcoin here?",
      answer: "Simply navigate to the 'Trade' tab, enter the amount of USD you want to spend, and click 'Buy'. You will be connected with a broker via WhatsApp to finalize the payment."
    },
    {
      question: "Is my money safe?",
      answer: "Yes. We use a strict escrow system. The cryptocurrency is held in a secure vault and is only released to your wallet once the seller confirms receipt of payment."
    }
  ]

  const modules = [
    {
      title: "Crypto Basics",
      duration: "5 min read",
      level: "Beginner",
      icon: Lightbulb,
      desc: "Understand the fundamentals of Blockchain, Bitcoin, and decentralized finance."
    },
    {
      title: "Secure Trading",
      duration: "10 min read",
      level: "Intermediate",
      icon: Shield,
      desc: "Learn how to protect your wallet, spot scams, and use our escrow service effectively."
    },
    {
      title: "Market Analysis",
      duration: "Advanced",
      level: "Expert",
      icon: TrendingUp,
      desc: "Read charts and understand market trends to buy at the perfect time."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black pb-20">
       <Navbar/>
      {/* --- HERO SECTION --- */}
      <div className="relative py-20 px-6 text-center border-b border-zinc-900 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
            <BookOpen className="w-4 h-4 text-yellow-500" />
            <span>Brics Academy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Master the <span className="text-yellow-500">Market</span>
          </h1>
          <p className="text-lg text-zinc-400">
            From your first wallet to advanced trading strategies. Everything you need to know about crypto is right here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-20 pt-16">
        
        {/* --- LEARNING MODULES --- */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Start Learning</h2>
            <button className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <div key={i} className="group relative bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900/80 transition-all cursor-pointer overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-yellow-500/50 transition-colors">
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-950 px-2 py-1 rounded uppercase tracking-wider">
                    {mod.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">{mod.title}</h3>
                <p className="text-zinc-400 text-sm mb-6">{mod.desc}</p>
                
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <PlayCircle className="w-4 h-4" />
                  {mod.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

      

        {/* --- FAQ SECTION --- */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  openFaq === index 
                    ? 'bg-zinc-900/50 border-yellow-500/30' 
                    : 'bg-transparent border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-semibold ${openFaq === index ? 'text-yellow-500' : 'text-zinc-200'}`}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500" />
                  )}
                </button>
                
                <div 
                  className={`px-5 text-zinc-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default LearnPage