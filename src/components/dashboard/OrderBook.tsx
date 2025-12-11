// import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const asks = [
  { price: 64205.50, amount: 0.45, total: 28892 },
  { price: 64204.00, amount: 0.12, total: 7704 },
  { price: 64203.80, amount: 1.20, total: 77044 },
  { price: 64201.20, amount: 0.05, total: 3210 },
].reverse(); // Sell orders usually sorted descending visually bottom-up

const bids = [
  { price: 64199.50, amount: 0.85, total: 54569 },
  { price: 64198.00, amount: 2.10, total: 134815 },
  { price: 64195.20, amount: 0.50, total: 32097 },
  { price: 64192.10, amount: 1.00, total: 64192 },
];

export default function OrderBook() {
  return (
    <div className="flex flex-col h-full rounded-xl border bg-card text-card-foreground">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Order Book</h3>
      </div>
      
      {/* Header */}
      <div className="grid grid-cols-3 p-2 text-xs text-muted-foreground font-medium">
        <span>Price (USDT)</span>
        <span className="text-right">Amount (BTC)</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sells) */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col justify-end pb-2">
            {asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 px-2 py-0.5 text-xs hover:bg-muted/50 cursor-pointer">
                <span className="text-red-500 font-mono">{ask.price.toFixed(2)}</span>
                <span className="text-right text-muted-foreground">{ask.amount.toFixed(4)}</span>
                <span className="text-right text-muted-foreground">{(ask.price * ask.amount).toFixed(0)}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Spread Indicator */}
      <div className="py-2 text-center border-y bg-muted/20">
        <span className="text-lg font-bold text-green-500">64,200.50</span>
        <span className="text-xs text-muted-foreground ml-2">≈ $64,200.50</span>
      </div>

      {/* Bids (Buys) */}
      <div className="flex-1 overflow-hidden relative">
         <div className="absolute inset-0 pt-2">
            {bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 px-2 py-0.5 text-xs hover:bg-muted/50 cursor-pointer">
                <span className="text-green-500 font-mono">{bid.price.toFixed(2)}</span>
                <span className="text-right text-muted-foreground">{bid.amount.toFixed(4)}</span>
                <span className="text-right text-muted-foreground">{(bid.price * bid.amount).toFixed(0)}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}