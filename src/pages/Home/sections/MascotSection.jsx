import React from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import mascot_video from "../assets/video_mascot.webm";

export default function MascotSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 flex justify-center overflow-hidden"
    >
      {/* Radial glow behind mascot */}
      <div
        className="
          absolute
          top-1/3
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[800px]
          h-[800px]
          rounded-full
          bg-white
          opacity-40
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative w-full max-w-6xl px-4 flex flex-col items-center text-center">

        {/* Mascot Video - Made bigger */}
        <video
          ref={videoRef}
          src={mascot_video}
          muted
          playsInline
          loop
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto"
        />

        {/* Tagline */}
        <p className="mt-6 text-lg md:text-xl italic font-bold font-rosiana text-[#370068]">
          "Step In. Stay Awake. The Carnival Has Begun."
        </p>

        {/* Register Button */}
        <Link to="/login" className="mt-6 px-10 py-3 rounded-full bg-black text-[#FFD966] font-rosiana text-lg hover:bg-[#FFD966] hover:text-black transition-colors">
          Register
        </Link>

      </div>
    </section>
  );
}
