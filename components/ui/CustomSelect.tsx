"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  onChange?: (value: string) => void;
  value?: string;
}

export default function CustomSelect({ options, placeholder, onChange, value }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(value || null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === internalValue);

  return (
    <div className="relative w-full text-sm" ref={dropdownRef}>
      <div
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 cursor-pointer flex justify-between items-center transition-colors hover:border-orange-500/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={internalValue ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] py-1.5 overflow-hidden">
          <div className="max-h-[170px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-orange-400">
            {options.map((option) => (
              <div
              key={option.value}
              className="px-4 py-2.5 hover:bg-orange-50 cursor-pointer text-gray-700 transition-colors text-[13px]"
              onClick={() => {
                setInternalValue(option.value);
                setIsOpen(false);
                if (onChange) onChange(option.value);
              }}
            >
              {option.label}
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
