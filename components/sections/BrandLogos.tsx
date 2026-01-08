import Image from "next/image";

// === IMPORTS ===
import RubysLogo from "../images/rubys.svg";
import PerforaLogo from "../images/perfora.svg";
import MoxieLogo from "../images/moxie.svg";
import CoralSkyLogo from "../images/Coral_and_Sky_logo-removebg-preview 1.svg";
import LovePangolinLogo from "../images/lovepangolin.svg";
import BallerLogo from "../images/baller.png";
import MintreeLogo from "../images/minl.svg";
import BlueTeaLogo from "../images/bluetea.svg";
import BubblesLogo from "../images/bubbles.svg";
import HerringboneLogo from "../images/harringbone.svg";
import EarthRagaLogo from "../images/earthraga.svg";
import SassyThingLogo from "../images/sassy.svg";
import Lelogo from "../images/lelogo.svg";

// === DATA ===
const LOGO_DATA = [
  { name: "BLUE TEA", logo: BlueTeaLogo, color: "bg-white" },
  { name: "MOXIE", logo: MoxieLogo, color: "bg-[#DFFF00]" }, // Yellow Tile
  { name: "Perfora", logo: PerforaLogo, color: "bg-white" },
  { name: "Ruby's", logo: RubysLogo, color: "bg-white" },
  { name: "Pangolin", logo: LovePangolinLogo, color: "bg-white" },
  { name: "Baller", logo: BallerLogo, color: "bg-white" },
  { name: "Mintree", logo: MintreeLogo, color: "bg-white" },
  { name: "Snaqary", logo: SassyThingLogo, color: "bg-white" }, 
  { name: "Earth Raga", logo: EarthRagaLogo, color: "bg-white" },
  { name: "Herringbone", logo: HerringboneLogo, color: "bg-white" },
  { name: "Le Logo", logo: Lelogo, color: "bg-white" },
  { name: "Coral & Sky", logo: CoralSkyLogo, color: "bg-white" },
  { name: "Bubbles", logo: BubblesLogo, color: "bg-white" },
];

// Duplicate for smooth loop
const BRANDS = [...LOGO_DATA, ...LOGO_DATA, ...LOGO_DATA];

export default function BrandLogos() {
  return (
    <section className="w-full py-16 overflow-hidden bg-white">
      {/* Background container */}
      <div className="w-full bg-[#3B4EF6]/10 py-12 relative">
        
        {/* Marquee Wrapper */}
        <div className="overflow-hidden w-full relative">
          
          {/* Moving Track */}
          <div className="animate-marquee flex items-center">
            {BRANDS.map((brand, i) => (
              <div 
                key={i} 
                // === FIXED TILE STYLING ===
                // Width/Height: Fixed 128px (w-32) for consistency
                // Margin: mx-4 creates the gap between tiles
                // Padding: p-6 ensures the logo has space inside (doesn't touch edges)
                // Rounded: rounded-2xl matches the soft look in screenshot
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
                    <Image 
                        src={brand.logo} 
                        alt={brand.name}
                        // object-contain: Ensures logo fits inside without stretching/cutting
                        className="w-full h-full object-contain"
                    />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Fade Gradients (Optional: Makes edges look smooth) */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none" />
      
      </div>
    </section>
  );
}