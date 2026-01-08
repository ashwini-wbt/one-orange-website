import Image from "next/image";
import Container from "../ui/Container";

// === STEP 1: Import your SVGs here ===
// Adjust the filenames to match exactly what is in your 'components/images' folder
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
import harringbone from "../images/harringbone.svg";
import lelogo from "../images/lelogo.svg"

// === STEP 2: Map the imports to the array ===
const BRANDS = [
  { name: "Ruby's Organics", logo: RubysLogo },
  { name: "Perfora", logo: PerforaLogo },

  { name: "MOXIE", logo: MoxieLogo },

  { name: "Coral & Sky", logo: CoralSkyLogo },
  { name: "Love Pangolin", logo: LovePangolinLogo },
  { name: "BALLER ATHLETIK", logo: BallerLogo },
  { name: "Mintree", logo: MintreeLogo },
  { name: "BLUE TEA", logo: BlueTeaLogo },
  { name: "Bubbles", logo: BubblesLogo },
  { name: "HERRINGBONE & SUI", logo: HerringboneLogo },
  { name: "EARTH RAGA", logo: EarthRagaLogo },
  { name: "THAT SASSY THING", logo: SassyThingLogo },

   { name: "harringbone", logo: harringbone },
   { name: "lelogo", logo: lelogo },
];

export default function TrustedBy() {
  return (
    <section className="py-20 bg-white">
      <Container>
        
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-body font-medium text-[32px] md:text-[56px] leading-[100%] text-black tracking-normal">
            Trusted by top brands in the ecosystem
          </h2>
        </div>

        {/* Logo Section with Borders */}
        <div className="border-t border-b border-indigo-50 py-12 md:py-16">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-10 md:gap-x-16 md:gap-y-14 max-w-6xl mx-auto px-4">
            {BRANDS.map((brand, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default"
              >
                {/* Using Next.js Image Component. 
                   - w-auto / h-8 (or h-10) keeps aspect ratio while fixing height.
                   - object-contain ensures the logo fits within bounds.
                */}
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}