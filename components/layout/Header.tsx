"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO IMPLEMENTATION */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* 1. The Orange Circle (25px x 25px as per Figma) */}
            <div className="w-[25px] h-[25px] rounded-full bg-brand-orange shrink-0"></div>
            
            {/* 2. The Text (Poppins, Medium 500, 22px) */}
            <span className="font-poppins font-medium text-[22px] leading-none text-black tracking-tight">
              oneorange
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {["Home", "About", "Work"].map((item) => (
              <Link key={item} href="#" className="hover:text-brand-orange transition-colors">
                {item}
              </Link>
            ))}
            <Button className="px-6 py-2.5">Contact Us</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4">
             {["Home", "About", "Work"].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-gray-600 font-medium py-2 hover:text-brand-orange"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button className="w-full py-3">Contact Us</Button>
          </div>
        )}
      </Container>
    </header>
  );
}