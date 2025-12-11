import { Button } from "@/components/ui/button"
import { Bitcoin, Bell, Settings, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl mr-8">
        <div className="bg-orange-500 rounded-full p-1">
            <Bitcoin className="h-5 w-5 text-white" />
        </div>
        <span>NextCEX</span>
      </div>

      <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
        <a href="#" className="text-foreground transition-colors hover:text-foreground">Trade</a>
        <a href="#" className="transition-colors hover:text-foreground">Markets</a>
        <a href="#" className="transition-colors hover:text-foreground">Futures</a>
        <a href="#" className="transition-colors hover:text-foreground">Earn</a>
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
                type="text" 
                placeholder="Search coin..." 
                className="w-full rounded-full bg-secondary pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
        </div>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-5 w-5" />
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
            Connect Wallet
        </Button>
      </div>
    </header>
  );
}