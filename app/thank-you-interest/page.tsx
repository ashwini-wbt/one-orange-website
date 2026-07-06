import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Thank You - One Orange',
  description: 'Thank you for your interest in One Orange.',
};

export default function ThankYouBadLeadPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center relative overflow-hidden p-4">
      {/* Clean Background from Hero */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50/50 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-10 max-w-[520px] w-full relative flex flex-col items-center text-center animate-modal z-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-[28px] h-[28px] rounded-full bg-[#FF6900] shrink-0 shadow-lg shadow-orange-500/30"></div>
          <span className="font-poppins font-semibold text-[24px] leading-none text-gray-900 tracking-tight">
            oneorange
          </span>
        </div>

        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-orange-400/30 rounded-full animate-ping blur-md" style={{ animationDelay: '0.2s' }}></div>
          <div className="relative w-16 h-16 bg-gradient-to-tr from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3 tracking-tight">Thank you for your interest!</h3>
        <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
          We appreciate you taking the time to apply. Currently, we are only partnering with brands that meet our minimum scale requirements. We wish you the best as you continue to grow your brand!
        </p>

        <Link 
          href="/"
          className="w-full block py-3.5 bg-gradient-to-r from-[#FF6900] to-[#ff8433] hover:from-[#e55e00] hover:to-[#ff6900] text-white rounded-xl font-semibold text-[15px] shadow-lg shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
