import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import BrandLogos from "@/components/sections/BrandLogos";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services"; 
import Metrics from "@/components/sections/Metrics";     
import TrustedBy from "@/components/sections/TrustedBy"; // IMPORT THIS

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden bg-white">
      <Header />
      
      <div className="mt-20">
        <Hero />
        <BrandLogos />
        <Testimonials />
        <Services />
        <Metrics />
        <TrustedBy /> {/* Added Here */}
      </div>
      
      <footer className="py-12 border-t border-gray-100 mt-auto bg-white">
        <div className="text-center text-gray-400 text-sm">
          © 2026 OneOrange. All rights reserved.
        </div>
      </footer>
    </main>
  );
}