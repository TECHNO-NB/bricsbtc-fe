import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Server, Cookie, BarChart3, History } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            This page informs you of our policies regarding the collection, use
            and disclosure of personal information we receive from users of our
            site (https://www.bricbtc.com). We use your personal information to
            better understand your usage of the site, and to collect traffic
            statistics. By using the site, you agree to the collection and use
            of information in accordance with this policy.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-zinc-950 border-zinc-800 shadow-2xl shadow-black/50">
          <CardHeader className="pb-8 border-b border-zinc-900">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">
                Policy Details
              </CardTitle>
              <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">
                LAST UPDATED • 2016
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-8 md:p-12 space-y-12">
            
            {/* Section: Log Data */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <Server className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="font-semibold text-white">
                  Log Data
                </span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  Like many site operators, we collect information that your
                  browser sends whenever you visit our site ("Log Data"). This
                  Log Data may include information such as your computer's
                  Internet Protocol ("IP") address (with replaced last byte),
                  browser type, browser version, the pages of our site that you
                  visit, the time and date of your visit, the time spent on
                  those pages and other statistics.
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
                  Cookies are files with small amounts of data, which may
                  include an anonymous unique identifier. Cookies are sent to
                  your browser from a web site and stored on your computer's
                  hard drive. You can instruct your browser to refuse all
                  cookies or to indicate when a cookie is being sent. However,
                  if you do not accept cookies, you may not be able to use some
                  portions of our site.
                </p>
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                  <li>
                    To keep track of whether you have pressed the "OK" button on
                    the cookie disclaimer, so we don't bother you with the
                    notification if you have.
                  </li>
                  <li>
                    Our Analytics software (Google Analytics) uses cookies to
                    measure and better understand user-interactions on our Site.
                    You can read more about how Google Analytics uses cookies{" "}
                    <a href="#" className="text-indigo-400 hover:underline">here</a>.
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            {/* Section: Google Analytics */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <BarChart3 className="w-8 h-8 text-orange-500 mb-2" />
                <span className="font-semibold text-white">
                  Google Analytics
                </span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We use a third-party JavaScript plug-in provided by Google
                  called "Google Analytics" to provide us with useful traffic
                  statistics and to better understand how you use our site. We
                  do not have direct access to the information obtained from
                  Google Analytics, but Google provides us with a summary
                  through their dashboard.
                </p>
                <p>
                  We may share the information obtained from Google Analytics
                  with business partners who are interested in advertising on
                  our website. The information shared with these business
                  partners will not contain any personally identifying
                  information (Google does not provide us with direct access to
                  the data and therefore we cannot see this information).
                </p>
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 text-sm">
                  You can opt-out of having your information collected by Google
                  Analytics by downloading the Google Analytics opt-out browser
                  add-on provided by Google.{" "}
                  <a href="#" className="text-indigo-400 hover:underline">
                    Download here.
                  </a>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            {/* Section: Changes */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-zinc-500 flex flex-col items-start gap-2">
                <History className="w-8 h-8 text-emerald-500 mb-2" />
                <span className="font-semibold text-white">
                  Changes to Policy
                </span>
              </div>
              <div className="space-y-4 text-zinc-400 leading-7">
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new privacy policy on
                  the Site. You are advised to review this privacy policy
                  periodically for any changes.
                </p>
                <p className="text-zinc-500 text-sm">
                  This Privacy Policy was last updated: 5th July, 2016.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-zinc-600 text-sm leading-relaxed max-w-xl mx-auto">
          If you have any questions about our privacy policy, or how your data
          is being collected and processed, please e-mail{" "}
          <a
            href="mailto:privacy@bricbtc.com"
            className="text-indigo-500 hover:underline"
          >
            privacy@bricbtc.com
          </a>
        </p>
      </main>
      <Footer/>
    </div>
  );
}