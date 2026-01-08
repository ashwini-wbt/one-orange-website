import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  // Height: 50px, Radius: 52px, Font: Fustat Medium
  const baseStyles = "inline-flex items-center justify-center rounded-[52px] font-medium transition-all duration-300 transform active:scale-95 text-base font-body";
  
  const variants = {
    // Width: ~166px (min-w-[166px]), Color: #FF6900
    primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-md h-[50px] px-8 min-w-[166px]",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-brand-orange hover:text-brand-orange bg-transparent h-[50px] px-8 min-w-[166px]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}