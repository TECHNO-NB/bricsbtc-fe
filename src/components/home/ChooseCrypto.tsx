"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

import btc from "@/../public/coin.png";
import eth from "@/../public/coin3.png";
import usdt from "@/../public/coin2.png";
import ltc from "@/../public/litcoin.png";

const coins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$89,752.03 USD",
    change: "-2.54%",
    changeColor: "text-red-500",
    icon: btc,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,050.13 USD",
    change: "-1.98%",
    changeColor: "text-red-500",
    icon: eth,
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: "$1.00 USD",
    change: "0.00%",
    changeColor: "text-green-500",
    icon: usdt,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: "$81.20 USD",
    change: "-3.74%",
    changeColor: "text-red-500",
    icon: ltc,
  },
];

const ChooseCrypto = () => {
  return (
    <div className="w-full">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold">
        Choose Your{" "}
        <span className="text-orange-500 uppercase">Crypto</span>
      </h1>

      <p className="text-sm md:text-md text-zinc-500 mt-1">
        Trade at your convenience. Select from 20+ cryptocurrencies.
      </p>

      {/* Crypto List */}
      <div className="mt-6 w-full divide-yellow-500 divide-y  rounded-xl  backdrop-blur px-6">
        {coins.map((coin, index) => (
          <div
            key={index}
            className="
            flex flex-col md:flex-row
            items-center justify-between
            py-5 px-4 gap-4
            hover:bg-white/5 transition-all
          "
          >
            {/* Left: Icon + Name */}
            <div className="flex items-center gap-3">
              <Image
                src={coin.icon}
                height={45}
                width={45}
                alt={coin.name}
                className="bg-amber-500/20 p-2 rounded-full"
              />

              <h1 className="text-xl font-bold flex flex-col md:flex-row md:items-center gap-1">
                {coin.name}{" "}
                <span className="text-blue-500 text-lg">{coin.symbol}</span>
              </h1>
            </div>

            {/* Middle: Price */}
            <h1 className="font-semibold text-xl text-center">
              {coin.price}
            </h1>

            {/* Change % */}
            <h1
              className={`font-semibold text-xl ${coin.changeColor}`}
            >
              {coin.change}
            </h1>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" className="px-6 py-5 text-lg">
                Buy
              </Button>
              <Button
                className="px-6 py-5 text-lg bg-transparent border text-white hover:bg-white/10"
              >
                Sell
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCrypto;
