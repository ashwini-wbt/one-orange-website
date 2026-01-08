"use client";

import { useState, useRef } from "react";
import Container from "../ui/Container";
import { ArrowUpRight } from "lucide-react";

const METRICS_DATA = [
  {
    id: 1,
    label: "Total sales",
    amount: "$12,073.93",
    growth: "227%",
    online_store: "$7,669.03",
    online_growth: "255%",
    draft_orders: "$4,404.90",
    draft_growth: "187%"
  },
  {
    id: 2,
    label: "Total Revenue",
    amount: "₹10,086,742",
    growth: "145%",
    online_store: "₹6,200,500",
    online_growth: "120%",
    draft_orders: "₹3,886,242",
    draft_growth: "180%"
  },
  {
    id: 3,
    label: "Net Profit",
    amount: "₹8,289,944",
    growth: "310%",
    online_store: "₹5,100,200",
    online_growth: "290%",
    draft_orders: "₹3,189,744",
    draft_growth: "340%"
  },
  {
    id: 4,
    label: "Active Users",
    amount: "45,200",
    growth: "85%",
    online_store: "30,100",
    online_growth: "90%",
    draft_orders: "15,100",
    draft_growth: "75%"
  }
];

export default function Metrics() {
  const [activeIndex, setActiveIndex] = useState(0);

  // === DRAG REFS ===
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Helper to get circular index
  const getIndex = (index: number) => {
    const len = METRICS_DATA.length;
    return (index + len) % len;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => getIndex(prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => getIndex(prev + 1));
  };

  // === DRAG LOGIC ===
  const minSwipeDistance = 30; // Thoda aur sensitive banaya

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragEndX.current = null; // Reset end position
    if ('touches' in e) {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = (e as React.MouseEvent).clientX;
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    if ('touches' in e) {
      dragEndX.current = e.touches[0].clientX;
    } else {
      dragEndX.current = (e as React.MouseEvent).clientX;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (!dragStartX.current || !dragEndX.current) return;
    
    const distance = dragStartX.current - dragEndX.current;
    
    // Check Swipe
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    
    // Reset
    dragStartX.current = null;
    dragEndX.current = null;
  };

  // Click Handler for Cards (To prevent click if dragging)
  const handleCardClick = (e: React.MouseEvent, index: number, position: string, prevIndex: number, nextIndex: number) => {
    // Agar drag hua hai, toh click ignore karo
    if (dragStartX.current && dragEndX.current && Math.abs(dragStartX.current - dragEndX.current) > 10) {
      e.preventDefault();
      return;
    }

    if (position === 'prev') setActiveIndex(prevIndex);
    if (position === 'next') setActiveIndex(nextIndex);
  };

  return (
    <section className="py-20 md:py-32 bg-white w-full overflow-hidden relative select-none">
      <Container className="text-center relative z-10">
        
        {/* Heading */}
        <h2 className="font-heading font-normal text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-12 md:mb-20 px-4">
          Our numbers speak for us
        </h2>

        {/* CONTAINER with Drag Listeners attached to the Wrapper */}
        <div 
          className="relative w-full h-[550px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing outline-none"
          style={{ perspective: "1000px" }} // Lower perspective = Stronger 3D effect
          
          // Drag Events on Container (captures bubbles from cards)
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

            // Base Styles
            let transformClass = "opacity-0 scale-75 z-0 hidden pointer-events-none"; 
            
            if (position === 'active') {
              // === CENTER CARD ===
              // No rotation
              transformClass = "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl [transform:rotateY(0deg)] cursor-grab";
            } else if (position === 'prev') {
              // === LEFT CARD ===
              // Increased Rotation: 45deg
              transformClass = `
                opacity-40 scale-90 z-20 
                -translate-x-[15%] md:-translate-x-[60%] 
                [transform:rotateY(45deg)] 
                blur-[1px] 
                cursor-pointer 
                hover:opacity-80 hover:scale-[0.92] hover:blur-0 hover:z-25
              `; 
            } else if (position === 'next') {
              // === RIGHT CARD ===
              // Increased Rotation: -45deg
              transformClass = `
                opacity-40 scale-90 z-20 
                translate-x-[15%] md:translate-x-[60%] 
                [transform:rotateY(-45deg)] 
                blur-[1px] 
                cursor-pointer 
                hover:opacity-80 hover:scale-[0.92] hover:blur-0 hover:z-25
              `;
            }

            return (
              <div 
                key={data.id}
                className={`
                  absolute top-1/2  -translate-y-1/2 -translate-x-1/2
                  w-[95%] sm:w-[90%] md:w-[600px] 
                  bg-white rounded-[24px] md:rounded-[32px] 
                  shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] 
                  border border-gray-100 
                  p-6 sm:p-8 md:p-12 font-body
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  will-change-transform
                  pointer-events-auto 
                  ${transformClass}
                `}
                // Important: Prevent text selection while dragging
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                // Handle Click but allow Drag
                onClick={(e) => handleCardClick(e, index, position, prev, next)}
              >
                
                {/* --- CARD CONTENT (Pointer Events disable to prevent interference inside) --- */}
                <div className="pointer-events-none">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="text-left">
                        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1 sm:mb-2 flex items-center gap-1 border-b border-dotted border-gray-400 w-fit pb-0.5">
                            {data.label}
                        </p>
                        <h3 className="text-3xl sm:text-[40px] md:text-[50px] font-bold text-gray-900 leading-none tracking-tight">
                            {data.amount}
                        </h3>
                    </div>

                    <div className="text-right flex flex-col items-end">
                        <span className="text-xs sm:text-sm font-medium text-blue-500 mb-1 sm:mb-2">
                            View report
                        </span>
                        <div className="flex items-center gap-1 text-green-600 text-lg sm:text-xl font-bold">
                        <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
                        {data.growth}
                        </div>
                    </div>
                    </div>

                    {/* Stats List */}
                    <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                    <div className="flex justify-between items-center text-sm sm:text-[16px]">
                        <span className="text-gray-600 font-medium">Online Store</span>
                        <div className="flex items-center gap-3 sm:gap-6">
                        <span className="font-semibold text-gray-900 tracking-tight">{data.online_store}</span>
                        <div className="flex items-center text-green-600 text-xs sm:text-sm font-bold min-w-[50px] md:min-w-[60px] justify-end">
                            <span className="text-[10px] sm:text-xs mr-0.5">↑</span> {data.online_growth}
                        </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm sm:text-[16px]">
                        <span className="text-gray-600 font-medium">Draft Orders</span>
                        <div className="flex items-center gap-3 sm:gap-6">
                        <span className="font-semibold text-gray-900 tracking-tight">{data.draft_orders}</span>
                        <div className="flex items-center text-green-600 text-xs sm:text-sm font-bold min-w-[50px] md:min-w-[60px] justify-end">
                            <span className="text-[10px] sm:text-xs mr-0.5">↑</span> {data.draft_growth}
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Graph Area */}
                    <div className="relative h-24 sm:h-32 w-full border-t border-gray-100 pt-4 md:pt-5 mt-2 md:mt-4">
                    <div className="absolute top-4 md:top-5 left-0 text-[10px] sm:text-xs font-bold text-gray-500 border-b border-dotted border-gray-400 pb-0.5">
                        Sales over time
                    </div>
                    <div className="absolute left-0 bottom-0 top-8 sm:top-10 flex flex-col justify-between text-[9px] sm:text-[11px] text-gray-400 font-medium z-10">
                        <span>$1K</span>
                        <span>$500</span>
                        <span>$0</span>
                    </div>
                    
                    <div className="absolute inset-0 left-8 sm:left-10 bottom-0 top-6 sm:top-8">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id={`chartGradient-${data.id}`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        <path 
                            d="M0,100 L5,90 L10,80 L15,95 L20,50 L25,80 L30,70 L35,85 L40,90 L45,10 L50,85 L55,50 L60,95 L65,85 L70,88 L75,25 L80,90 L85,60 L90,85 L95,40 L100,80" 
                            fill="none" 
                            stroke="#6366f1" 
                            strokeWidth="3" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                        <path d="M0,60 L100,60" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>
                    </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* === PAGINATION DOTS === */}
        <div className="flex justify-center gap-3 mt-4 md:mt-8">
           {METRICS_DATA.map((_, index) => (
             <button 
               key={index}
               onClick={() => setActiveIndex(index)}
               className={`
                 w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 
                 ${activeIndex === index ? 'bg-brand-orange scale-125' : 'bg-gray-200 hover:bg-gray-300'}
               `}
               aria-label={`Go to slide ${index + 1}`}
             />
           ))}
        </div>

      </Container>
    </section>
  );
}