import Container from "../ui/Container";

export default function Hero() {
  return (
    // Padding top adjust kiya taaki header ke niche sahi space aaye
    <section className="relative pt-36 pb-20 md:pt-52 md:pb-32 overflow-hidden">
      
      {/* Background Blur Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[1200px] h-[800px] bg-purple-100/70 blur-[180px] rounded-full pointer-events-none -z-10" />

      <Container className="text-center relative z-10">
        
        {/* New Headline */}
        <h1 className="max-w-7xl mx-auto font-heading font-normal text-gray-900 leading-[0.95] tracking-tight">
          <span className="block text-[clamp(3.5rem,9vw,7.5rem)]">
            We help D2C brands
          </span>
          <span className="block text-[clamp(3.5rem,9vw,7.5rem)] -mt-2 md:-mt-4">
            scale profitably
          </span>
        </h1>
        
        {/* New Subtext */}
        <p className="mt-10 md:mt-14 font-body text-lg md:text-2xl lg:text-[28px] font-medium text-gray-700 tracking-tight max-w-3xl mx-auto">
          Scaled 100+ D2C brands • Generated ₹500Cr + revenue
        </p>

      </Container>
    </section>
  );
}