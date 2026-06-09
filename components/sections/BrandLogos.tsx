"use client";

import { useState } from "react";
import Image from "next/image";

import ArtAndCheeseLogo from "../images/logos/ArtandCheese.png";
import BallerLogo from "../images/logos/Baller.webp";
import BlackSheepLogo from "../images/logos/BlackSheep.png";
import BlueTeaLogo from "../images/logos/BlueTea.webp";
import BubblesLogo from "../images/logos/Bubbles.png";
import CoralLogo from "../images/logos/Coral.webp";
import DaUrbanLogo from "../images/logos/DaUrban.png";
import HerringboneLogo from "../images/logos/Herringbone.png";
import LisenLogo from "../images/logos/Lisen.jpeg";
import LovePangolinLogo from "../images/logos/Lovepangolin.png";
import MintreeLogo from "../images/logos/Mintree.svg";
import MoxieBeautyLogo from "../images/logos/MoxieBeauty.png";
import PerforaLogo from "../images/logos/Perfora.png";
import RubysLogo from "../images/logos/rubys.svg"; 
import SassyLogo from "../images/logos/Sassy.png";
import HiraLogo from "../images/HIRA_Logo8.webp";
import SoulflowerLogo from "../images/soulflower.png";
const LOGO_DATA = [
  { name: "Ruby's Organics", logo: RubysLogo, color: "bg-white" },
  { name: "Perfora", logo: PerforaLogo, color: "bg-white" },
  { name: "Blue Tea", logo: BlueTeaLogo, color: "bg-white" },
  { name: "Moxie Beauty", logo: MoxieBeautyLogo, color: "bg-white" },
  { name: "Love Pangolin", logo: LovePangolinLogo, color: "bg-white" },
  { name: "Baller Athletik", logo: BallerLogo, color: "bg-white" },
  { name: "That Sassy Thing", logo: SassyLogo, color: "bg-white" },
  { name: "Da Urban", logo: DaUrbanLogo, color: "bg-white" },
  { name: "Bubbles", logo: BubblesLogo, color: "bg-white" },
  { name: "Mintree", logo: MintreeLogo, color: "bg-white" },
  { name: "Herringbone & Sui", logo: HerringboneLogo, color: "bg-white" },
  { name: "Lisen", logo: LisenLogo, color: "bg-white" },
  { name: "Black Sheep", logo: BlackSheepLogo, color: "bg-white" },
  { name: "Coral & Sky", logo: CoralLogo, color: "bg-white" },
  { name: "Art and Cheese", logo: ArtAndCheeseLogo, color: "bg-white" },
  { name: "Hira", logo: HiraLogo, color: "bg-white" },
  { name: "Kleenest", logo: "/images/Kleenest_Logo_1.avif", color: "bg-white" },
  { name: "New Brand", logo: "/images/Logo_New_150x.avif", color: "bg-white" },
  { name: "Youglo", logo: "/images/Youglo-Primary_Colour_9a537501-2f68-42b4-aa3f-f66e7e3fd2af.avif", color: "bg-white" },
  { name: "Soulflower", logo: SoulflowerLogo, color: "bg-white" },
];

// Duplicate list 3 times for smooth infinite loop
const BRANDS = [...LOGO_DATA, ...LOGO_DATA, ...LOGO_DATA];

export default function BrandLogos() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full py-16 overflow-hidden bg-white">
      {/* Background container */}
      <div className="w-full bg-[#3B4EF6]/10 py-12 relative">
        
        {/* Marquee Wrapper */}
        <div className="overflow-hidden w-full relative">
          
          {/* Moving Track */}
          <div 
            className="animate-marquee flex items-center"
            // Animation Control (Pause on Hover/Touch)
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {BRANDS.map((brand, i) => (
              <div 
                key={i} 
                className={`
                  w-28 h-28 md:w-32 md:h-32 
                  shrink-0 flex items-center justify-center 
                  ${brand.color} 
                  rounded-2xl shadow-sm mx-3 md:mx-4
                  p-6
                  hover:scale-105 transition-transform duration-300 select-none
                `}
              >
                {/* Logo Image Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                        src={typeof brand.logo === 'string' ? brand.logo : brand.logo.src} 
                        alt={brand.name}
                        className="w-full h-full object-contain pointer-events-none" 
                    />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Fade Gradients (Edges ko smooth dikhane ke liye) */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none" />
      
      </div>
    </section>
  );
}