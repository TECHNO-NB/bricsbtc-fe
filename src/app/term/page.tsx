import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ShieldAlert, FileText } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-indigo-500/30">
        <Navbar/>
      {/* Page Background Gradients for 'Modern' feel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl mb-4 border border-zinc-800">
            <FileText className="w-6 h-6 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Please read these terms carefully before trading on BRICSBTC. 
            Last updated: <span className="text-indigo-400">December 13, 2025</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar / Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-10 h-fit space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-6 space-y-1">
                <h3 className="font-semibold text-white mb-4 px-2">On this page</h3>
                <nav className="space-y-1">
                  {['1. Agreement to Terms', '2. Eligibility', '3. Account Security', '4. Trading Risks', '5. Fees & Payments', '6. Termination'].map((item, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/50 h-9 font-normal"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 text-indigo-500" />
                      {item}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          
          </aside>

          {/* Main Legal Content */}
          <section className="lg:col-span-8 space-y-12">
            
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-zinc-800 text-sm text-zinc-300">1</span>
                Agreement to Terms
              </h2>
              <div className="prose prose-invert text-zinc-400 leading-relaxed max-w-none">
                <p>
                  By accessing or using the BRICSBTC platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, access to the platform is strictly prohibited.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Significant changes will be communicated via email or platform notification.
                </p>
              </div>
            </div>
            
            <Separator className="bg-zinc-800" />

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-zinc-800 text-sm text-zinc-300">2</span>
                Eligibility
              </h2>
              <div className="prose prose-invert text-zinc-400 leading-relaxed max-w-none">
                <p>
                  To use BRICSBTC, you must be at least 18 years old and reside in a supported country. You represent and warrant that you are not on any trade or economic sanctions lists, such as the UN Security Council Sanctions list.
                </p>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Section 4 (Risk Warning) */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-zinc-800 text-sm text-zinc-300">4</span>
                Trading Risks
              </h2>
              
              {/* Alert Component */}
              <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-5 flex gap-4">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="text-red-400 font-medium">High Risk Investment Warning</h4>
                  <p className="text-zinc-400 text-sm">
                    Cryptocurrency trading involves substantial risk and is not suitable for every investor. The valuation of cryptocurrencies may fluctuate, and as a result, clients may lose more than their original investment.
                  </p>
                </div>
              </div>
            </div>

             <Separator className="bg-zinc-800" />

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-zinc-800 text-sm text-zinc-300">5</span>
                Fees and Termination
              </h2>
              <div className="prose prose-invert text-zinc-400 leading-relaxed max-w-none">
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                </p>
              </div>
            </div>

          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}