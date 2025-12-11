'use client';

import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export default function TradingChart() {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <AdvancedRealTimeChart 
        theme="dark" 
        autosize 
        symbol="BINANCE:BTCUSDT" 
        interval="15" 
        timezone="Etc/UTC"
        style="1" 
        locale="en" 
        hide_side_toolbar={false}
      />
    </div>
  );
}