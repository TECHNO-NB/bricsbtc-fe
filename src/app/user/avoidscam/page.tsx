import React from 'react';
import { AlertTriangle, ShieldAlert, Lock, UserX, MailWarning, Globe, MousePointerClick } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Data structure for the content
const scams = [
  {
    title: "Blackmail",
    description: "Be wary of unsolicited messages threatening to reveal personal information or embarrassing data unless a payment is made in Bitcoin. Always verify claims and do not succumb to fear tactics.", // (Added context as it was missing in prompt)
    icon: <Lock className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Fake Exchanges",
    description: "As bitcoin has become more popular, more people have sought to acquire it. Unfortunately, nefarious people have taken advantage of this and have been known to set up fake bitcoin exchanges. These fake exchanges may trick users by offering extremely competitive market prices that lull them into thinking they're getting a steal, with quick and easy access to some cheap bitcoin. Be sure to use a reputable exchange when buying or selling bitcoin.",
    icon: <Globe className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Free Giveaways",
    description: "Due to the viral nature of how information spreads across on the internet, scammers seek to take advantage of people by offering free giveaways of bitcoin or other digital currencies in exchange for sending a small amount to register, or by providing some personal information. When you see this on a website or social network, it's best to immediately report the content as fraudulent.",
    icon: <UserX className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Impersonation",
    description: "Unfortunately it's very easy for con-artists to create social media accounts and impersonate people. Often times they lie in wait, until the person they're trying to impersonate publishes content. The impersonator then replies with a follow-up message using an account that looks almost identical to the original poster. Never participate in free giveaways, and always double check to confirm authenticity.",
    icon: <UserX className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Malware",
    description: "Hackers have become very creative at finding ways to steal from people. Some malware programs, once installed, will change bitcoin addresses when they're pasted from a user's clipboard, so that all of the bitcoin unknowingly gets sent to the hacker's address instead. It's a good idea to be super-cautious about what programs you allow to have administrator access on your devices.",
    icon: <ShieldAlert className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Meet in Person",
    description: "When buying or selling bitcoin locally, a counterparty may ask you to meet in person to conduct the exchange. If it isn't a trusted party that you already know, this is a very risky proposition that could result in you getting robbed or injured. Consider using a peer-to-peer platform to escrow the funds in place of meeting in person.",
    icon: <UserX className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Money Transfer Fraud",
    description: "Do not reply to emails or inbound communications from strangers telling you they need help moving some money, whereafter in exchange for your services, you'll get a portion of the funds.",
    icon: <MailWarning className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Phishing Emails",
    description: "Beware of emails purported to be from services you use soliciting you for action, such as resetting your password. It can be very difficult to spot the difference in a fake email. When in doubt, considering triple-checking the authenticity of the communication by forwarding it to the company or reaching out via official channels.",
    icon: <MailWarning className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Phishing Websites",
    description: "Phishing emails can link to a replica website designed to steal login credentials or prompt one to install malware. Do not install software or log in to a website unless you are 100% sure it isn't a fake one. Phishing websites may also appear as sponsored results on search engines.",
    icon: <MousePointerClick className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Ponzi Schemes",
    description: "Do not participate in offerings where one or more people offer you a guaranteed return in exchange for an upfront deposit. This is known as a ponzi scheme, where-in future depositors' principals are used to pay previous investors. The end result is usually a lot of people losing a lot of money.",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Pyramid Schemes",
    description: "A pyramid scheme promises returns to participants based on the number of people they invite to join. This enables the scheme to grow virally and rapidly, however, it most often doesn't result in any kind of meaningful return. Never invite your personal network under the sole goal of accumulating rewards.",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Prize Giveaways",
    description: "Similarly to free giveaways, prize giveaway scams trick people into taking action or supplying information about themselves. For example, supplying a name, address, email and phone number in order to claim a prize. This can allow a hacker to attempt to use the information to gain access to accounts by impersonating you.",
    icon: <UserX className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Pump and Dumps",
    description: "Do not trust people who entice you or others to invest because they claim that they know what the bitcoin price is going to be. In a pump and dump scheme, a person (or persons) try to artificially drive up or pump the price so that they can dump their holdings for a profit.",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Ransomware",
    description: "This is a type of malware that partially or completely blocks access to a device unless you pay a ransom in bitcoin. It's best to consult the advice of a trusted computer professional for removal assistance, rather than paying the ransom. Be careful about what programs you install on your devices.",
    icon: <Lock className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Scam Coins",
    description: "Be careful when investing in alternative coins (altcoins). Amongst altcoins there may be scam coins, enticing users to invest via private sales, or with presale discounts. Scam coins may feature a flashy website or boast a large community to create a fear of missing out (FOMO) effect.",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
  },
];

export default function AvoidScams() {
  return (
    <section className="min-h-screen bg-[#11131f] text-slate-300 py-16 font-sans">
        <Navbar/>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Avoid Scams
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Familiarize yourself with some of the most commonly observed bitcoin scams to help protect yourself and your finances.
          </p>
          <div className="h-1 w-20 bg-[#ff9500] mt-6"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scams.map((scam, index) => (
            <div 
              key={index} 
              className="bg-[#1c1f33] border border-slate-800 rounded-lg p-6 hover:border-[#ff9500] transition-colors duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#11131f] rounded-full border border-slate-700 group-hover:border-[#ff9500]/50 transition-colors">
                  {scam.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff9500] transition-colors">
                  {scam.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {scam.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action / Note */}
        <div className="mt-16 bg-slate-900/50 border-l-4 border-[#ff9500] p-6 rounded-r-lg">
          <p className="text-slate-300 italic">
            "If something sounds too good to be true, it probably is."
          </p>
        </div>

      </div>
      <Footer/>
    </section>
  );
}