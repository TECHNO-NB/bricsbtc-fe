"use client";
import React from "react";
import Image from "next/image";
import pic from "@/../public/pic.svg";
import { Button } from "../ui/button";

const Trade = () => {
  return (
    <div className="relative w-full pb-20">
      {/* Background SVG */}
      <div className="absolute top-0 left-0 w-full -z-10 opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fffff"
            fillOpacity="1"
            d="M0,32L40,80C80,128,160,224,240,256C320,288,400,256,480,213.3C560,171,640,117,720,90.7C800,64,880,64,960,69.3C1040,75,1120,85,1200,96C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-10 px-4 md:px-16 lg:px-24">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={pic}
            width={600}
            height={600}
            alt="Trade Illustration"
            className="drop-shadow-xl rounded-xl"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Trade with <span className="text-orange-500">Transparency</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Feel confident by trading on-chain with non-custodial exchange.
            Exchange Bitcoin, Ethereum, and other popular cryptocurrencies using
            secure smart contracts and Bitcoin scripts alongside wallets where
            you control the private keys.
            <br />
            <br />
            Empower yourself by exploring how to buy and sell cryptocurrency
            without having to hand over control of your funds.
          </p>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-4 px-6 py-6 text-lg rounded-xl shadow-lg">
            Start Trading
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trade;
