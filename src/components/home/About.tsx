'use client'
import React from "react";
import coverpic from "@/../public/coverpic.jpeg";
import Image from "next/image";
import { Button } from "../ui/button";

const About = () => {
  return (
    <div className="w-full mb-6  flex justify-center px-4 items-center flex-wrap md:flex-nowrap gap-10 mt-20">
      <div>
        <Image
          className=" rounded-2xl border-2 border-white/20 shadow-2xl opacity-80 backdrop-blur-2xl  animate-bg shadow-amber-50/20"
          src={coverpic}
          alt="coverpic"
          height={400}
          width={400}
        />
      </div>
      <div className="md:w-[50%]">
        <h1 className="text-4xl font-extrabold text-white to-red-600 hover:from-orange-600 hover:to-red-700">
          ABOUT <span className="text-orange-500 shadow-2xl shadowo-orange-500/50 backdrop-blur-3xl">BRICSBTC</span>
        </h1>
        <p className="mt-4 mb-1  md:text-xl text-slate-400">
          "W're not just building a platform—we're powering a global movement
          toward financial freedom. By making crypto and digital assets simple
          and accessible, we're helping people everywhere take control of their
          finances and join the shift toward a more open, decentralized
          economy."
        </p>
        <Button className="bg mt-4">More About Us</Button>
      </div>
    </div>
  );
};

export default About;
