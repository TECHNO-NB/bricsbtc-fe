import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, DollarSign, Scale, Code, AlertTriangle, Clock, Link as LinkIcon, Briefcase } from "lucide-react";
// Assuming you have a Navbar component imported
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

// Structured data for the sections
const disclaimerSections = [
  {
    icon: <FileText className="w-8 h-8 text-indigo-500 mb-2" />,
    title: "Information Published on bricbtc.com",
    content: (
      <>
        <p>
          The website <a href="https://bricbtc.com/" className="text-indigo-400 hover:underline">https://bricbtc.com/</a> (hereinafter, referred to as the "Website") provides information and material of a general nature. You are not authorized and nor should you rely on the Website for legal advice, business advice, or advice of any kind.
        </p>
        <p>
          You act at your own risk in reliance on the contents of the Website. Should you make a decision to act or not act you should contact a licensed attorney in the relevant jurisdiction in which you want or need help. In no way are the owners of, or contributors to, the Website responsible for the actions, decisions, or other behavior taken or not taken by you in reliance upon the Website.
        </p>
      </>
    ),
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-cyan-500 mb-2" />,
    title: "Translations",
    content: (
      <>
        <p>
          The Website may contain translations of the English version of the content available on the Website. These translations are provided only as a convenience. In the event of any conflict between the English language version and the translated version, the English language version shall take precedence.
        </p>
        <p>
          If you notice any inconsistency, please report them on <a href="#" className="text-cyan-400 hover:underline">GitHub</a>.
        </p>
      </>
    ),
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />,
    title: "Risks Related to the Use of Bitcoin",
    content: (
      <>
        <p>
          The Website will not be responsible for any losses, damages or claims arising from events falling within the scope of the following five categories:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>
            **Mistakes made by the user:** e.g., forgotten passwords, payments sent to wrong Bitcoin addresses, and accidental deletion of wallets.
          </li>
          <li>
            **Software problems:** e.g., corrupted wallet file, incorrectly constructed transactions, unsafe cryptographic libraries, malware affecting the Website and/or any Bitcoin-related software or service.
          </li>
          <li>
            **Technical failures in the hardware:** e.g., data loss due to a faulty or damaged storage device.
          </li>
          <li>
            **Security problems experienced by the user:** e.g., unauthorized access to users' wallets and/or accounts.
          </li>
          <li>
            **Actions or inactions of third parties and/or events experienced by third parties:** e.g., bankruptcy of service providers, information security attacks on service providers, and fraud conducted by third parties.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: <DollarSign className="w-8 h-8 text-emerald-500 mb-2" />,
    title: "Investment Risks",
    content: (
      <p>
        The investment in Bitcoin can lead to loss of money over short or even long periods. The investors in Bitcoin should expect prices to have large range fluctuations. The information published on the Website cannot guarantee that the investors in Bitcoin would not lose money.
      </p>
    ),
  },
  {
    icon: <Briefcase className="w-8 h-8 text-yellow-500 mb-2" />,
    title: "Compliance with Tax Obligations",
    content: (
      <p>
        The users of the Website are solely responsible to determinate what, if any, taxes apply to their Bitcoin transactions. The owners of, or contributors to, the Website are NOT responsible for determining the taxes that apply to Bitcoin transactions.
      </p>
    ),
  },
  {
    icon: <Code className="w-8 h-8 text-pink-500 mb-2" />,
    title: "The Website Does Not Store, Send, or Receive Bitcoins",
    content: (
      <p>
        The Website does not store, send or receive bitcoins. This is because bitcoins exist only by virtue of the ownership record maintained in the Bitcoin network. Any transfer of title in bitcoins occurs within a decentralized Bitcoin network, and not on the Website.
      </p>
    ),
  },
  {
    icon: <Scale className="w-8 h-8 text-purple-500 mb-2" />,
    title: "No Warranties & Limitation of Liability",
    subSections: [
      {
        subTitle: "No Warranties (Section 7)",
        subContent: (
          <p>
            The Website is provided on an "as is" basis without any warranties of any kind regarding the Website and/or any content, data, materials and/or services provided on the Website.
          </p>
        )
      },
      {
        subTitle: "Limitation of Liability (Section 8)",
        subContent: (
          <p>
            Unless otherwise required by law, in no event shall the owners of, or contributors to, the Website be liable for any damages of any kind, including, but not limited to, loss of use, loss of profits, or loss of data arising out of or in any way connected with the use of the Website.
          </p>
        )
      }
    ]
  },
  {
    icon: <Scale className="w-8 h-8 text-red-600 mb-2" />,
    title: "Arbitration (Section 9)",
    content: (
      <p>
        The user of the Website agrees to arbitrate any dispute arising from or in connection with the Website or this disclaimer, except for disputes related to copyrights, logos, trademarks, trade names, trade secrets or patents.
      </p>
    ),
  },
];

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 font-sans py-20 px-4 md:px-8 z-10">
      <Navbar />
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />

      <main className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Legal Disclaimer
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Please read the following information carefully. Your use of this website is subject to these terms.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-zinc-950 border-zinc-800 shadow-2xl shadow-black/50">
          <CardHeader className="pb-8 border-b border-zinc-900">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">
                Website Terms of Use
              </CardTitle>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-600" />
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">
                  LAST AMENDED • JUL 5th, 2016
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 md:p-12 space-y-12">
            {disclaimerSections.map((section, index) => (
              <React.Fragment key={index}>
                <section className="grid md:grid-cols-[200px_1fr] gap-8">
                  <div className="text-zinc-500 flex flex-col items-start gap-2">
                    {section.icon}
                    <span className="font-semibold text-white text-lg">
                      {section.title}
                    </span>
                    <span className="text-zinc-500 text-sm">
                      Section {index + 1}
                    </span>
                  </div>
                  <div className="space-y-4 text-zinc-400 leading-7">
                    {section.content}
                    {/* Handle combined sections like No Warranties/Limitation of Liability */}
                    {section.subSections && section.subSections.map((sub, subIndex) => (
                      <div key={subIndex} className="mt-6 border-l-4 border-zinc-800 pl-4">
                        <h4 className="text-white font-medium mb-2">{sub.subTitle}</h4>
                        {sub.subContent}
                      </div>
                    ))}
                  </div>
                </section>
                {index < disclaimerSections.length - 1 && <Separator className="bg-zinc-900" />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </main>
      <Footer/>
    </div>
  );
}