import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneOrange",
  description: "A marketing company built to scale brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 1. Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 2. Load Fonts: Taviraj (Heading), Fustat (Body), Poppins (Logo) */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;500;600;700&family=Poppins:wght@500&family=Taviraj:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}