"use client";

import { useState } from "react";
import oneOrangeFounder from "../images/oneOrangeFounder.png";
import CustomSelect from "../ui/CustomSelect";
import CountUp from "../ui/CountUp";
import { useRouter } from "next/navigation";

export default function Hero({ country = "IN" }: { country?: "IN" | "US" }) {
  const router = useRouter();
  
  const adSpendOptionsIN = [
    { value: 'Under 1 Lac', label: 'Under 1Lac INR / month' },
    { value: '1 - 3 Lac', label: '1 Lac INR - 3 Lac INR / month' },
    { value: '3 - 10 Lac', label: '3 Lac INR - 10 Lac INR / month' },
    { value: '10 - 25 Lac', label: '10 Lac INR - 25 Lac INR / month' },
    { value: '25 - 50 Lac', label: '25 Lac INR - 50 Lac INR / month' },
    { value: '50 Lac+', label: '50 Lac+ INR / month' },
  ];
  const adSpendOptionsUS = [
    { value: 'Under 5,000 USD', label: 'Under 5,000 USD / month' },
    { value: '5,000 USD - 15,000 USD', label: '5,000 USD - 15,000 USD / month' },
    { value: '15,000 USD - 35,000 USD', label: '15,000 USD - 35,000 USD / month' },
    { value: '35,000 USD - 60,000 USD', label: '35,000 USD - 60,000 USD / month' },
    { value: '60,000 USD - 100,000 USD', label: '60,000 USD - 100,000 USD / month' },
    { value: '100,000+ USD', label: '100,000+ USD / month' },
  ];
  const adSpendOptions = country === "IN" ? adSpendOptionsIN : adSpendOptionsUS;
  const [formData, setFormData] = useState({
    fullName: "",
    brandWebsite: "",
    workEmail: "",
    phone: "",
    adSpend: "",
    challenge: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState({ workEmail: "", phone: "", brandWebsite: "" });

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(p => ({...p, brandWebsite: val}));
    setGlobalError("");
    // Flexible URL validation pattern (allows with or without https:// or www.)
    if (val && !/^(https?:\/\/)?(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(val)) {
      setErrors(p => ({...p, brandWebsite: "Please enter a valid website (e.g. yourbrand.com)"}));
    } else {
      setErrors(p => ({...p, brandWebsite: ""}));
    }
  };
  const [globalError, setGlobalError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(p => ({...p, workEmail: val}));
    setGlobalError("");
    if (val && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(val)) {
      setErrors(p => ({...p, workEmail: "Please enter a valid email address"}));
    } else {
      setErrors(p => ({...p, workEmail: ""}));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(p => ({...p, phone: val}));
    setGlobalError("");
    if (val && !/^\+?[0-9\s\-\(\)]{10,15}$/.test(val)) {
      setErrors(p => ({...p, phone: "Please enter a valid 10 to 15 digit phone number"}));
    } else {
      setErrors(p => ({...p, phone: ""}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    
    // Validate empty fields
    if (!formData.fullName || !formData.brandWebsite || !formData.workEmail || !formData.phone || !formData.adSpend || !formData.challenge) {
      setGlobalError("Please fill all the fields before submitting.");
      
      // Also trigger specific errors if fields are empty
      setErrors({
        workEmail: !formData.workEmail ? "Email is required" : errors.workEmail,
        phone: !formData.phone ? "Phone number is required" : errors.phone,
        brandWebsite: !formData.brandWebsite ? "Brand website is required" : errors.brandWebsite
      });
      return;
    }

    if (errors.workEmail || errors.phone || errors.brandWebsite) return;
    
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Failed to submit");
      
      router.push("/thank-you");
      // We don't reset status or form data here because we're navigating away
    } catch {
      setStatus("error");
    }
  };
  return (
    <section className="relative pb-12 md:pb-16 overflow-hidden bg-[#fafafa]">
      {/* Background Blur Effect */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50/50 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 md:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col pt-2">
            <div className="inline-flex items-center gap-2 bg-orange-100/50 px-3 py-1.5 rounded-full w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-[11px] font-bold text-orange-600 tracking-wider uppercase">For D2C Founders Ready to Scale</span>
            </div>
            
            <h1 className="text-[3rem] lg:text-[4rem] font-serif leading-[1.05] text-gray-900 mb-6 tracking-tight">
              We help D2C brands<br />
              scale <span className="italic text-orange-500 font-medium">profitably</span>
            </h1>
            
            <p className="text-lg md:text-[19px] text-gray-600 mb-6 leading-relaxed max-w-xl font-light">
              Lower your CAC, lift retention, and unlock faster, higher, repeat purchases. If your brand is doing real revenue, the team behind 60+ brands wants to talk.
            </p>
            
            <div className="flex gap-16 mb-6">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <CountUp end={60} suffix="+" />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">D2C Brands Scaled</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <CountUp prefix="$" end={100} suffix=" Million+" />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue Generated</div>
              </div>
            </div>
            
            {/* Founder Card */}
            <div className="group relative rounded-3xl overflow-hidden w-full max-w-[400px] h-[280px] bg-gray-900 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-default">
              {/* Note: User should place their image in public/images/founder.jpg */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
              {/* Using a placeholder or the intended path for the image */}
              <img 
                src={oneOrangeFounder.src} 
                alt="Nitin Kansal" 
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md border border-white/50 shadow-xl p-4 rounded-2xl z-20 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="font-bold text-gray-900 text-[17px]">Nitin Kansal</div>
                <div className="text-[13px] text-white/90 mt-0.5 font-medium">Founder, One Orange Digital</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="bg-white rounded-[2rem] px-6 pt-8 pb-5 lg:px-8 lg:pt-10 lg:pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-20">
            <h2 className="text-[28px] font-serif font-bold text-gray-900 mb-2">Apply to scale with us</h2>
            <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
              We take on a limited number of brands. Tell us about yours — we reply to qualified founders within 48 hours.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8">
                <div className="flex flex-col justify-end">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Full Name <span className="text-orange-500">*</span></label>
                  <input value={formData.fullName} onChange={(e) => { setFormData(p => ({...p, fullName: e.target.value})); setGlobalError(""); }} type="text" placeholder="e.g. John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors text-sm placeholder:text-gray-400" />
                </div>
                
                <div className="flex flex-col justify-end relative">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Mobile <span className="text-orange-500">*</span></label>
                  <input value={formData.phone} onChange={handlePhoneChange} type="text" placeholder="e.g. +91 98765 43210" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500/20 focus:border-orange-500'} transition-colors text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2`} />
                  {errors.phone && <span className="absolute -bottom-5 left-1 text-red-500 text-[11px] whitespace-nowrap">{errors.phone}</span>}
                </div>

                <div className="flex flex-col justify-end relative">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Work Email <span className="text-orange-500">*</span></label>
                  <input value={formData.workEmail} onChange={handleEmailChange} type="text" placeholder="e.g. founder@brand.com" className={`w-full px-4 py-3 rounded-xl border ${errors.workEmail ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500/20 focus:border-orange-500'} transition-colors text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2`} />
                  {errors.workEmail && <span className="absolute -bottom-5 left-1 text-red-500 text-[11px] whitespace-nowrap">{errors.workEmail}</span>}
                </div>
                
                <div className="flex flex-col justify-end relative">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Brand Website <span className="text-orange-500">*</span></label>
                  <input value={formData.brandWebsite} onChange={handleWebsiteChange} type="text" placeholder="e.g. yourbrand.com" className={`w-full px-4 py-3 rounded-xl border ${errors.brandWebsite ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500/20 focus:border-orange-500'} transition-colors text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2`} />
                  {errors.brandWebsite && <span className="absolute -bottom-5 left-1 text-red-500 text-[11px] whitespace-nowrap">{errors.brandWebsite}</span>}
                </div>
                
                <div className="flex flex-col justify-end">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Current Monthly Ad Spend <span className="text-orange-500">*</span></label>
                  <CustomSelect 
                    placeholder="Select ad spend range" 
                    value={formData.adSpend}
                    onChange={(val) => setFormData(p => ({...p, adSpend: val}))}
                    options={adSpendOptions} 
                  />
                </div>
                
                <div className="flex flex-col justify-end">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Biggest Growth Challenge right now <span className="text-orange-500">*</span></label>
                  <CustomSelect 
                    placeholder="Select biggest challenge" 
                    value={formData.challenge}
                    onChange={(val) => setFormData(p => ({...p, challenge: val}))}
                    options={[
                      { value: 'cac-roas', label: 'CAC too high / ROAS dropping' },
                      { value: 'plateau', label: 'Stuck at a revenue plateau' },
                      { value: 'retention', label: 'Low retention / repeat rate' },
                      { value: 'scaling', label: 'Scaling spend without losing efficiency' },
                      { value: 'creative-fatigue', label: 'Creative fatigue' },
                      { value: 'other', label: 'Other' },
                    ]} 
                  />
                </div>
              </div>
              
              <button disabled={status === "loading"} type="submit" className="w-full py-4 mt-2 bg-[#ff611d] hover:bg-[#ff5108] disabled:bg-[#ff611d]/50 disabled:cursor-not-allowed text-white rounded-[14px] font-semibold text-[15px] shadow-[0_4px_14px_rgba(255,97,29,0.39)] transition-all flex justify-center items-center gap-2">
                {status === "loading" ? "Submitting..." : "Apply now →"}
              </button>
              
              {globalError && (
                <p className="text-red-500 text-[13px] text-center font-medium">{globalError}</p>
              )}

              {status === "error" && (
                <p className="text-red-500 text-sm text-center font-medium">Something went wrong. Please try again.</p>
              )}
              
              <p className="text-[11px] text-center text-gray-400 mt-4">
                No spam. Your details stay between you and our growth team.
              </p>
            </form>
          </div>
          
        </div>
      </div>

    </section>
  );
}
