"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Container from "../ui/Container";

// === IMAGE IMPORTS (All 7 Images) ===
import Img2crTo7cr from "../images/2crto7cr.jpeg";
import Img200Growth from "../images/200growth.jpeg";
import Img88LTo2_5cr from "../images/88t02.5cr.jpeg";
import Img25LTo90L from "../images/25lto90l.jpeg";
import ImgSixMonth from "../images/sixMonth.jpeg";
import ImgOneYear from "../images/oneYear.jpeg";
import ImgThreeMonth from "../images/threeMonth.jpeg";

const METRICS_DATA = [
  {
    id: 1,
    image: Img2crTo7cr, 
    label: "7cr to 20cr in 1 Year"
  },
  {
    id: 2,
    image: Img200Growth,
    label: "200% Growth in 1 Year"
  },
  {
    id: 3,
    image: Img88LTo2_5cr,
    label: "88L to 2.5cr with 5+ ROAS"
  },
  {
    id: 4,
    image: Img25LTo90L,
    label: "25L to 90L with 4+ ROAS"
  },
  {
    id: 5,
    image: ImgSixMonth,
    label: "1cr to 3cr in 6 Months"
  },
  {
    id: 6,
    image: ImgOneYear,
    label: "30L to 1cr in 1 Year"
  },
  {
    id: 7,
    image: ImgThreeMonth,
    label: "2cr to 4.2cr in 3 Months"
  }
];

export default function Metrics() {
  const [activeIndex, setActiveIndex] = useState(0);

  // === DRAG REFS ===
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const getIndex = (index: number) => {
    const len = METRICS_DATA.length;
    return (index + len) % len;
  };

  const handlePrev = () => setActiveIndex((prev) => getIndex(prev - 1));
  const handleNext = () => setActiveIndex((prev) => getIndex(prev + 1));

  // === DRAG LOGIC ===
  const minSwipeDistance = 30;

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragEndX.current = null;
    if ('touches' in e) dragStartX.current = e.touches[0].clientX;
    else dragStartX.current = (e as React.MouseEvent).clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    if ('touches' in e) dragEndX.current = e.touches[0].clientX;
    else dragEndX.current = (e as React.MouseEvent).clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (!dragStartX.current || !dragEndX.current) return;
    const distance = dragStartX.current - dragEndX.current;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
    dragStartX.current = null;
    dragEndX.current = null;
  };

  const handleCardClick = (e: React.MouseEvent, index: number, position: string, prevIndex: number, nextIndex: number) => {
    if (dragStartX.current && dragEndX.current && Math.abs(dragStartX.current - dragEndX.current) > 10) {
      e.preventDefault();
      return;
    }
    if (position === 'prev') setActiveIndex(prevIndex);
    if (position === 'next') setActiveIndex(nextIndex);
  };

  return (
    <section className="py-8 md:py-12 bg-white w-full overflow-hidden relative select-none">
      <Container className="text-center relative z-10">
        
        {/* Heading */}
        <h2 className="font-heading font-normal text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 md:mb-10 px-4">
          Our numbers speak for us
        </h2>

        {/* CONTAINER */}
        <div 
          className="relative w-full h-[480px] sm:h-[550px] md:h-[650px] flex items-center justify-center cursor-grab active:cursor-grabbing outline-none"
          style={{ perspective: "1000px" }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {METRICS_DATA.map((data, index) => {
            let position = 'hidden';
            const active = getIndex(activeIndex);
            const prev = getIndex(activeIndex - 1);
            const next = getIndex(activeIndex + 1);

            if (index === active) position = 'active';
            else if (index === prev) position = 'prev';
            else if (index === next) position = 'next';

            let transformClass = "opacity-0 scale-75 z-0 hidden pointer-events-none"; 
            
            if (position === 'active') {
              transformClass = "opacity-100 scale-100 z-30 translate-x-0 [transform:rotateY(0deg)] cursor-grab";
            } else if (position === 'prev') {
              transformClass = `opacity-40 scale-90 z-20 -translate-x-[15%] md:-translate-x-[60%] [transform:rotateY(45deg)] blur-[1px] cursor-pointer hover:opacity-80 hover:scale-[0.92] hover:blur-0 hover:z-25`; 
            } else if (position === 'next') {
              transformClass = `opacity-40 scale-90 z-20 translate-x-[15%] md:translate-x-[60%] [transform:rotateY(-45deg)] blur-[1px] cursor-pointer hover:opacity-80 hover:scale-[0.92] hover:blur-0 hover:z-25`;
            }

            return (
              // Main Sliding Wrapper
              <div 
                key={data.id}
                className={`
                  absolute top-1/2  -translate-y-1/2 -translate-x-1/2
                  w-[90%] sm:w-[400px] md:w-[450px] 
                  flex flex-col items-center
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  will-change-transform pointer-events-auto 
                  ${transformClass}
                `}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                onClick={(e) => handleCardClick(e, index, position, prev, next)}
              >
                
                {/* === IMAGE BOX === */}
                <div className="w-full bg-gray-50 rounded-[24px] md:rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden relative h-[400px] sm:h-[500px] md:h-[600px]">
                    <div className="relative w-full h-full pointer-events-none">
                        <Image 
                            src={data.image} 
                            alt={data.label}
                            className="w-full h-full object-contain" 
                            priority={position === 'active'}
                        />
                    </div>
                </div>

                {/* === TEXT BELOW CARD === */}
                <div 
                    className={`
                        mt-6 md:mt-8 text-center transition-all duration-500
                        ${position === 'active' ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'}
                    `}
                >
                  <h3 
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    style={{ fontFamily: "'Fustat', sans-serif" }} 
                  >
                    {data.label}
                  </h3>
                </div>

              </div>
            );
          })}
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center gap-3 mt-4 md:mt-8">
           {METRICS_DATA.map((_, index) => (
             <button 
               key={index}
               onClick={() => setActiveIndex(index)}
               className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-brand-orange scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
               aria-label={`Go to slide ${index + 1}`}
             />
           ))}
        </div>

      </Container>
    </section>
  );
}