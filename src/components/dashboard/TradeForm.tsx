'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
 // You might need to add this: npx shadcn@latest add slider
import { Wallet, Info } from "lucide-react"

export default function TradeForm() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-full flex flex-col">
      <Tabs defaultValue="buy" className="w-full flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-2 rounded-t-xl rounded-b-none h-12">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500 h-full rounded-none rounded-tl-xl border-b-2 border-transparent data-[state=active]:border-green-500">
            Buy BTC
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 h-full rounded-none rounded-tr-xl border-b-2 border-transparent data-[state=active]:border-red-500">
            Sell BTC
          </TabsTrigger>
        </TabsList>
        
        <div className="p-6 flex-1 flex flex-col gap-6">
            {/* Market / Limit Selector (Simplified) */}
            <div className="flex gap-2 text-sm">
                <button className="bg-muted px-3 py-1 rounded-md text-foreground font-medium">Spot</button>
                <button className="text-muted-foreground px-3 py-1 hover:text-foreground">Cross 3x</button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground flex justify-between">
                        <span>Price (USDT)</span>
                        <span>Market Price</span>
                    </Label>
                    <div className="relative">
                        <Input placeholder="64000.00" className="pl-3 pr-12 font-mono" />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">USDT</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground flex justify-between">
                        <span>Amount (BTC)</span>
                        <span className="flex items-center gap-1"><Wallet size={12}/> 0.045 BTC</span>
                    </Label>
                    <div className="relative">
                        <Input placeholder="0.00" className="pl-3 pr-12 font-mono" />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">BTC</span>
                    </div>
                </div>
                
                {/* Percentage Slider Placeholder */}
                <div className="h-2 bg-secondary rounded-full w-full mt-2 relative">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-muted-foreground/30 rounded-full"></div>
                    <div className="absolute -top-1 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-sm cursor-pointer"></div>
                </div>
            </div>

            <div className="mt-auto pt-4">
                 <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span>Total</span>
                    <span className="font-mono text-foreground">0.00 USDT</span>
                 </div>
                 
                 <TabsContent value="buy" className="mt-0">
                    <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-white">
                        Buy BTC
                    </Button>
                 </TabsContent>
                 
                 <TabsContent value="sell" className="mt-0">
                    <Button className="w-full bg-red-600 hover:bg-red-700 font-bold text-white">
                        Sell BTC
                    </Button>
                 </TabsContent>
            </div>
        </div>
      </Tabs>
    </div>
  );
}