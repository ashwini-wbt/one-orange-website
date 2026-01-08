import Container from "../ui/Container";
import { Monitor, Repeat, PenTool, Layout, BarChart3 } from "lucide-react";

const SERVICE_DATA = [
  { title: "Website Development", icon: Monitor },     // Row 1
  { title: "Retention", icon: Repeat },                // Row 1
  { title: "Content & Creative", icon: PenTool },      // Row 2
  { title: "UI/UX & CRO", icon: Layout },              // Row 2
  { title: "Performance Marketing", icon: BarChart3 }, // Row 3
];

const ServiceCard = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="
    w-full md:w-[420px] 
    h-[170px] 
    bg-[#EDEDFF] 
    rounded-[16px] 
    p-6 md:p-8 
    flex flex-col items-start justify-between
    transition-transform duration-300 hover:scale-[1.02] cursor-pointer group
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
  ">
    {/* Icon */}
    <div className="w-12 h-12 flex items-center justify-start group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-gray-900 stroke-1" />
    </div>
    {/* Title */}
    <h3 className="font-body font-normal text-xl md:text-2xl text-gray-900 leading-tight">
      {title}
    </h3>
  </div>
);

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <Container>
        {/* Heading */}
        <div className="text-center mb-16 md:mb-24 max-w-[961px] mx-auto">
          <h2 className="font-body font-medium text-[36px] md:text-[56px] text-gray-900 leading-[100%] tracking-normal">
            Growth services built to lower CAC <br className="hidden md:block" />
            and drive profitable scale
          </h2>
        </div>

        <div className="flex flex-col gap-y-6 md:gap-y-12 items-center max-w-6xl mx-auto">
          
          {/* === ROW 1: LARGE GAP === */}
          {/* First two cards with extra spacing in between */}
          <div className="flex flex-wrap justify-center w-full gap-8 md:gap-48">
            <ServiceCard {...SERVICE_DATA[0]} />
            <ServiceCard {...SERVICE_DATA[1]} />
          </div>

          {/* === ROW 2: SMALL GAP === */}
          {/* Next two cards closer together */}
          <div className="flex flex-wrap justify-center w-full gap-8 md:gap-10">
            <ServiceCard {...SERVICE_DATA[2]} />
            <ServiceCard {...SERVICE_DATA[3]} />
          </div>

          {/* === ROW 3: CENTER === */}
          {/* Last card alone in center */}
          <div className="flex justify-center w-full">
            <ServiceCard {...SERVICE_DATA[4]} />
          </div>

        </div>
      </Container>
    </section>
  );
}