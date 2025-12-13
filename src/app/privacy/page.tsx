import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, Eye, Server, Cookie } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans py-20 px-4 md:px-8">
      <Navbar />
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />

      <main className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            At BRICSBTC, we take your data security seriously. This document
            outlines how we collect, store, and protect your personal
            information.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-zinc-950 border-zinc-800 shadow-2xl shadow-black/50">
          <CardHeader className="pb-8 border-b border-zinc-900">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">
                Legal Agreement
              </CardTitle>
              <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">
                VER 2.4 • 2019
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-8 md:p-12 space-y-12">
            {/* Section: Data Collection */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <Eye className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="font-semibold text-white">
                  Data Collection
                </span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, update your profile, or request
                  customer support. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                  <li>Contact information (email)</li>
                  <li>Identity verification data (government ID, passport)</li>
                  <li>
                    Financial information (bank account details, wallet
                    addresses)
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            {/* Section: Data Usage */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <Server className="w-8 h-8 text-emerald-500 mb-2" />
                <span className="font-semibold text-white">
                  How We Use Data
                </span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We use the information we collect to operate, maintain, and
                  improve our services, such as:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    <h4 className="text-white font-medium mb-1">
                      Transaction Processing
                    </h4>
                    <p className="text-sm">
                      To process your buy and sell orders efficiently.
                    </p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    <h4 className="text-white font-medium mb-1">
                      Fraud Prevention
                    </h4>
                    <p className="text-sm">
                      To detect and prevent illegal activities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            {/* Section: Security */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <Lock className="w-8 h-8 text-orange-500 mb-2" />
                <span className="font-semibold text-white">Data Security</span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal data against unauthorized or unlawful
                  processing, accidental loss, destruction, or damage.
                </p>
                <p>
                  We use{" "}
                  <strong className="text-white">AES-256 encryption</strong> for
                  all sensitive data stored in our databases.
                </p>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            {/* Section: Cookies */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <Cookie className="w-8 h-8 text-blue-500 mb-2" />
                <span className="font-semibold text-white">Cookies</span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We use cookies and similar tracking technologies to track the
                  activity on our Service and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-zinc-600 text-sm">
          For privacy related inquiries, contact us at{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            support@bricbtc.com
          </a>
        </p>
      </main>
    </div>
  );
}
