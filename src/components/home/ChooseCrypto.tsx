"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

import btc from "@/../public/coin.png";
import eth from "@/../public/coin3.png";
import usdt from "@/../public/coin2.png";
import ltc from "@/../public/litcoin.png";
import { useRouter } from "next/navigation";

const coinsMeta = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: btc },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: eth },
  { id: "tether", name: "Tether", symbol: "USDT", icon: usdt },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", icon: ltc },
];

type CoinPrice = {
  usd: number;
  usd_24h_change: number;
};

const ChooseCrypto = () => {
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const router=useRouter()

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price" +
          "?ids=bitcoin,ethereum,tether,litecoin" +
          "&vs_currencies=usd&include_24hr_change=true"
      );
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error("Failed to fetch prices", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold">
        Choose Your{" "}
        <span className="text-orange-500 uppercase">Crypto</span>
      </h1>

      <p className="text-sm md:text-md text-zinc-500 mt-1">
        Trade at your convenience. Select from 20+ cryptocurrencies.
      </p>

      <div className="mt-6 w-full divide-yellow-500 divide-y rounded-xl backdrop-blur px-6">
        {coinsMeta.map((coin, index) => {
          const priceData = prices[coin.id];
          const change = priceData?.usd_24h_change ?? 0;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between py-5 px-4 gap-4 hover:bg-white/5 transition-all"
            >
              {/* Icon + Name */}
              <div className="flex items-center gap-3">
                <Image
                  src={coin.icon}
                  height={45}
                  width={45}
                  alt={coin.name}
                  className="bg-amber-500/20 p-2 rounded-full"
                />
                <h1 className="text-xl font-bold">
                  {coin.name}{" "}
                  <span className="text-blue-500 text-lg">{coin.symbol}</span>
                </h1>
              </div>

              {/* Price */}
              <h1 className="font-semibold text-xl">
                {priceData
                  ? `$${priceData.usd.toLocaleString()} USD`
                  : "Loading..."}
              </h1>

              {/* Change */}
              <h1
                className={`font-semibold text-xl ${
                  change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {change.toFixed(2)}%
              </h1>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button onClick={()=>router.push("/auth/login")} variant="secondary" className="px-6 py-5 text-lg">
                  Buy
                </Button>
                <Button onClick={()=>router.push("/auth/login")} className="px-6 py-5 text-lg bg-transparent border text-white hover:bg-white/10">
                  Sell
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseCrypto;
