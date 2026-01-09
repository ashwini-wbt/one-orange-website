import Container from "../ui/Container";
import Button from "../ui/Button";

export default function UnlockGrowth() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <Container className="text-center">
        {/* Updated Typography based on Figma Screenshot */}
        <h2 className="font-body font-light text-[32px] md:text-[40px] leading-[100%] text-gray-900 mb-10 max-w-4xl mx-auto">
          Let’s unlock faster, higher, repeat purchases
        </h2>
        
        {/* Link added here */}
        <a 
          href="https://calendly.com/kansal-nitin/strategy-call-with-nitin" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="px-10 py-4 text-lg shadow-xl shadow-orange-200/50">
            Book a call
          </Button>
        </a>

      </Container>
    </section>
  );
}