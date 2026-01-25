import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import maskedimg from "../assets/masked_image.svg";
import ignusLogo from "../assets/ignus_logo.svg";


export default function Hero() {
  // Generate random stars with useMemo to avoid regenerating on each render
  const stars = useMemo(() => 
    Array.from({ length: 150 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 2,
    })), []
  );

  return (
    <section
      className="relative w-full overflow-hidden flex justify-center"
    >
      <Navbar />
      
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Star CSS Animation */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.2; 
              transform: scale(0.8);
              box-shadow: 0 0 2px rgba(255,255,255,0.3);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2);
              box-shadow: 0 0 8px rgba(255,255,255,0.8);
            }
          }
        `}
      </style>

      <div className="relative w-full max-w-7xl px-4 py-24 flex flex-col items-center z-10 mt-16">

        {/* IGNUS LOGO */}
        <img
          src={ignusLogo}
          alt="Ignus 2026 - The Midnight Carnival"
          className="w-full max-w-4xl h-auto"
        />

        {/* CTA ROW - Larger button and masks */}
        <div className="mt-12 flex items-center gap-8 group">

          {/* Left Decorative Image - Larger size */}
          <img
            src={maskedimg}
            alt=""
            className="w-12 sm:w-14 md:w-16 lg:w-20 h-auto transition-transform duration-300 group-hover:-rotate-45 ease-out"
          />

          {/* Register Button - Larger size */}
          <Link
            to="/login"
            className="
              px-12 sm:px-14 md:px-16 lg:px-20
              py-3 sm:py-4
              rounded-full
              border-2
              border-[#FFCD7A]
              text-[#FFCD7A]
              bg-black
              font-medium
              font-rosiana
              text-lg sm:text-xl md:text-2xl
              transition-all duration-300
              hover:bg-[#FFCD7A]
              hover:text-black
              hover:px-20 sm:hover:px-24 md:hover:px-28
              hover:scale-105
            "
          >
            Register
          </Link>

          {/* Right Decorative Image - Larger size */}
          <img
            src={maskedimg}
            alt=""
            className="w-12 sm:w-14 md:w-16 lg:w-20 h-auto transition-transform duration-300 group-hover:rotate-45 ease-out"
          />
        </div>

      </div>
    </section>
  );
}