import Image from "next/image";
import Container from "../ui/Container";


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
const BRANDS = [
  { name: "Ruby's Organics", logo: RubysLogo },
  { name: "Perfora", logo: PerforaLogo },
  { name: "Blue Tea", logo: BlueTeaLogo },
  { name: "Moxie Beauty", logo: MoxieBeautyLogo },
  { name: "Love Pangolin", logo: LovePangolinLogo },
  { name: "Baller Athletik", logo: BallerLogo },
  { name: "That Sassy Thing", logo: SassyLogo },
  { name: "Da Urban", logo: DaUrbanLogo },
  { name: "Bubbles", logo: BubblesLogo },

  { name: "Mintree", logo: MintreeLogo },
  { name: "Herringbone & Sui", logo: HerringboneLogo },
  { name: "Lisen", logo: LisenLogo },

  { name: "Black Sheep", logo: BlackSheepLogo },

  { name: "Coral & Sky", logo: CoralLogo },
  { name: "Art and Cheese", logo: ArtAndCheeseLogo },
  { name: "Hira", logo: HiraLogo },
  { name: "Kleenest", logo: "/images/Kleenest_Logo_1.avif" },
  { name: "New Brand", logo: "/images/Logo_New_150x.avif" },
  { name: "Youglo", logo: "/images/Youglo-Primary_Colour_9a537501-2f68-42b4-aa3f-f66e7e3fd2af.avif" },
];

export default function TrustedBy() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <Container>

        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-body font-medium text-[32px] md:text-[56px] leading-[100%] text-black tracking-normal">
            Trusted by top brands in the ecosystem
          </h2>
        </div>

        {/* Logo Section with Borders */}
        <div className="border-t border-b border-indigo-50 py-8 md:py-10">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16 max-w-7xl mx-auto px-4">
            {BRANDS.map((brand, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center opacity-100 transition-opacity duration-300 cursor-default"
              >
                {/* Original Colors (No Grayscale) */}
                <img
                  src={typeof brand.logo === 'string' ? brand.logo : brand.logo.src}
                  alt={`${brand.name} logo`}
                  className="h-8 md:h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}