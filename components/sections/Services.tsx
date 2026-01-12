"use client";

import Container from "../ui/Container";
import { Monitor, Repeat, PenTool, Layout, BarChart3 } from "lucide-react";

// === DATA ===
const SERVICE_DATA = [
  { 
    title: "Website Development", 
    icon: Monitor, 
    desc: "Fast, scalable stores built for growth & conversion." 
  },
  { 
    title: "Retention", 
    icon: Repeat, 
    desc: "Turn Buyers Into Repeat Customers" 
  },
  { 
    title: "Content & Creative", 
    icon: PenTool, 
    desc: "Ads That Sell, Not Just Look Good" 
  },
  { 
    title: "UI/UX & CRO", 
    icon: Layout, 
    desc: "Landing pages, PDPs & checkout optimizations that boost CVR." 
  },
  { 
    title: "Performance Marketing", 
    icon: BarChart3, 
    desc: "Profit-driven campaigns across Meta, Google & more." 
  },
];

const ServiceCard = ({ title, icon: Icon, desc }: { title: string; icon: any; desc: string }) => (
  <div className="
    group relative overflow-hidden
    /* Mobile: Width 48%, Height 160px, Padding p-4 */
    w-[48%] h-[160px] p-4 
    
    /* Desktop: Fixed Width, Height, Padding */
    md:w-[420px] md:h-[180px] md:p-8 
    
    bg-[#EDEDFF] 
    rounded-[16px] 
    
    /* Active class added for better Mobile Touch response */
    transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
  ">
    
    {/* === ICON === */}
    <div className="
        absolute top-4 left-4 md:top-8 md:left-8 
        transition-transform duration-300 
        group-hover:scale-90 origin-top-left
    ">
      <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-start">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-gray-900 stroke-1" />
      </div>
    </div>

    {/* === CONTENT WRAPPER === */}
    <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col justify-end">
      
      {/* TITLE */}
      <h3 className="
        font-body font-normal text-sm md:text-2xl text-gray-900 leading-tight 
        transition-transform duration-300 origin-bottom-left
        
        /* Base State (Mobile & Desktop): Normal Position */
        translate-y-0
        
        /* Hover State (Mobile & Desktop): Moves Up */
        group-hover:-translate-y-8 md:group-hover:-translate-y-6 
      ">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="
        absolute top-full left-0 w-full 
        text-[10px] md:text-sm text-gray-600 leading-tight font-medium
        transition-all duration-300 delay-75
        
        /* Base State (Mobile & Desktop): Hidden & Pushed Down */
        opacity-0 translate-y-4

        /* Hover State (Mobile & Desktop): Visible & Moves Up */
        group-hover:opacity-100 group-hover:-translate-y-7 md:group-hover:-translate-y-5
      ">
        {desc}
      </p>

    </div>
  </div>
);

export default function Services() {
  return (
    <section className="py-16 md:py-32 bg-white">
      <Container>
        {/* Heading */}
        <div className="text-center mb-4 md:mb-24 max-w-[961px] mx-auto">
          <h2 className="font-body font-medium text-[32px] md:text-[56px] text-gray-900 leading-[100%] tracking-normal">
            Growth services built to lower CAC <br className="hidden md:block" />
            and drive profitable scale
          </h2>
        </div>

        {/* Wrapper */}
        <div className="flex flex-col gap-y-3 md:gap-y-12 items-center max-w-6xl mx-auto">
          
          {/* === ROW 1 === */}
          <div className="flex flex-row justify-center w-full gap-3 md:gap-48">
            <ServiceCard {...SERVICE_DATA[0]} />
            <ServiceCard {...SERVICE_DATA[1]} />
          </div>

          {/* === ROW 2 === */}
          <div className="flex flex-row justify-center w-full gap-3 md:gap-10">
            <ServiceCard {...SERVICE_DATA[2]} />
            <ServiceCard {...SERVICE_DATA[3]} />
          </div>

          {/* === ROW 3 === */}
          <div className="flex justify-center w-full">
            <ServiceCard {...SERVICE_DATA[4]} />
          </div>

        </div>
      </Container>
    </section>
  );
}