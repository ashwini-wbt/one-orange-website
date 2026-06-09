"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import Container from "../ui/Container";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

// === IMPORTS: LOGOS ===
import ZariinLogo from "../images/Logo-Zariin-for-Web-removebg-preview 1.svg"; 
import RubysLogo from "../images/rubys.svg";
import MoxieLogo from "../images/moxie.svg";
import PerforaLogo from "../images/perfora.svg";
import BlueTeaLogo from "../images/bluetea.svg";
// Vedic Valley logo removed for text fallback demo

// === DATA ===
const TESTIMONIALS = [
  {
    id: 1,
    brandName: "ZARIIN",
    logo: ZariinLogo,
    name: "Mamta Gupta", // Updated
    designation: "Founder, Zariin",
    quote: "Scaled this Jewellery brand 3x on D2C with 2x better ROI",
    videoSrc: "/videos/Mamta Testimonial.mov", 
  },
  {
    id: 2,
    brandName: "Ruby's Organics",
    logo: RubysLogo,
    name: "Rubeina Karachiwala", // Updated
    designation: "Founder, Ruby's Organics",
    quote: "How we scaled this Shark Tank funded cosmetics brand from 8L/month to 1cr/month",
    videoSrc: "/videos/Ruby Testimonial.mp4", 
  },
  {
    id: 3,
    brandName: "MOXIE BEAUTY",
    logo: MoxieLogo,
    name: "Nikita Khanna", // Updated
    designation: "Founder, Moxie Beauty",
    quote: "Scaled this hair care brand from 0 to 3cr/month within a span of 14 months",
    videoSrc: "/videos/Moxie Testimonial.mp4", 
  },
  {
    id: 4,
    brandName: "VEDIC VALLEY",
    logo: null, 
    name: "Kanikka",
    designation: "Founder, Vedic Valley",
    quote: "Achieved 5x ROAS within the first quarter of engagement",
    videoSrc: "/videos/Kanikka Testimonial.mp4", 
  },
  {
    id: 5,
    brandName: "Perfora",
    logo: PerforaLogo,
    name: "Drishti Singhal", // Updated
    designation: "Head D2c, Perfora Care", // Updated
    quote: "Our best marketing partner for scaling oral care products.",
    videoSrc: "/videos/drishti perfora testimonial.mp4", 
  },
  {
    id: 6,
    brandName: "BLUE TEA",
    logo: BlueTeaLogo,
    name: "Nitesh Singh", // Updated
    designation: "Founder, Blue Tea",
    quote: "Exceptional growth in a crowded market.",
    videoSrc: "/videos/Nitesh Testimonial.mp4", 
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMuted, setIsMuted] = useState(true);
  
  // Visibility & Refs
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Smart Video Control
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && isInView) {
        video.muted = isMuted;
        const playPromise = video.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      } else {
        video.pause();
        if (index !== activeIndex) video.currentTime = 0;
      }
    });
  }, [activeIndex, isMuted, isInView]);

  // Navigation Helpers
  const getIndex = (index: number) => {
    const len = TESTIMONIALS.length;
    return (index + len) % len;
  };
  const handlePrev = () => setActiveIndex((prev) => getIndex(prev - 1));
  const handleNext = () => setActiveIndex((prev) => getIndex(prev + 1));

  // Drag Logic
  const minSwipeDistance = 40;
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
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
    if (dragStartX.current === null || dragEndX.current === null) return;
    const distance = dragStartX.current - dragEndX.current;
    dragStartX.current = null;
    dragEndX.current = null;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-8 md:py-12 bg-white w-full overflow-hidden select-none"
    >
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading font-normal text-4xl md:text-6xl lg:text-[70px] leading-[1.1] text-gray-900">
            Proven by results, not promises.
          </h2>
        </div>
      </Container>

      {/* TRACK CONTAINER */}
      <div 
        className="relative w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseLeave={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        
        {/* Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2 md:left-10 z-40 w-10 h-10 md:w-16 md:h-16 bg-white shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-gray-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2 md:right-10 z-40 w-10 h-10 md:w-16 md:h-16 bg-white shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-gray-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />
        </button>

        {/* CARDS WRAPPER */}
        <div className="relative w-full h-full flex justify-center items-center pointer-events-none">
          {TESTIMONIALS.map((item, index) => {
            
            let offset = index - activeIndex;
            const len = TESTIMONIALS.length;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const isVisible = Math.abs(offset) <= 2.5; 
            const isActive = offset === 0;
            const isFar = Math.abs(offset) > 2.5;
            
            const translateX = offset * 110; 
            let scale = 0.85;
            if (isActive) scale = 1;
            else if (Math.abs(offset) >= 2) scale = 0.75; 

            let opacity = 0.4;
            if (isActive) opacity = 1;
            else if (Math.abs(offset) >= 2) opacity = 0.3; 
            if (!isVisible) opacity = 0;

            const zIndex = 30 - Math.abs(offset);
            const transitionDuration = isDragging.current || isFar ? '0ms' : '700ms';

            return (
              <div
                key={item.id}
                className="absolute top-1/2 left-1/2 flex flex-col items-center will-change-transform pointer-events-auto"
                style={{
                  width: '350px', 
                  transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transition: `transform ${transitionDuration} cubic-bezier(0.25, 1, 0.5, 1), opacity ${transitionDuration} ease`,
                }}
                onClick={(e) => {
                    if (!isActive && isVisible && !isDragging.current) {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }
                }}
              >
                {/* 1. BRAND HEADER (Logo OR Text Fallback) */}
                <div 
                  className={`
                    mb-6 h-8 md:h-10 w-full flex items-center justify-center 
                    transition-all duration-500
                    ${isActive && !isInView ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                  `}
                >
                  {item.logo ? (
                    <Image 
                      src={item.logo} 
                      alt={item.brandName} 
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xl md:text-2xl font-bold uppercase tracking-widest font-heading text-gray-900">
                      {item.brandName}
                    </span>
                  )}
                </div>

                {/* 2. Video Card */}
                <div className="relative w-full aspect-[4/5] bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-transparent group">
                   
                   {/* VIDEO TAG */}
                   {isVisible && (
                     <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        src={item.videoSrc}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                        muted={true} 
                        style={{ pointerEvents: 'none' }} 
                        onEnded={handleNext} 
                     />
                   )}
                   
                   {/* Overlay */}
                   {(!isActive || !isInView) && <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500"></div>}

                   {/* Sound Toggle */}
                   {isActive && (
                     <button 
                       onClick={toggleMute}
                       className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                     >
                       {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                     </button>
                   )}

                   {/* Quote Box */}
                   <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                        <p className="text-[13px] font-semibold text-gray-800 leading-relaxed text-center">
                          "{item.quote}"
                        </p>
                      </div>
                   </div>
                </div>

                {/* 3. NAME & DESIGNATION */}
                <div className="mt-6 text-center">
                   <h3 
                     className="text-2xl font-normal text-gray-900 leading-tight"
                     style={{ fontFamily: "'Fustat', sans-serif" }} 
                   >
                     {item.name}
                   </h3>
                   
                   <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
                     {item.designation}
                   </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}