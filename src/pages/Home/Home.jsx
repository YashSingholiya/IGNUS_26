import React from "react";
import AboutUs from "./sections/AboutUs";
import Hero from "./sections/Hero";
import Footer from "../../components/ui/Footer";
import InitiativePrakriti from "./sections/InitiativePrakriti";
import MascotSection from "./sections/MascotSection";
import MidnightCarnival from "./sections/MidnightCarnival";
import ContactUs from "./sections/ContactUs";
import Stats from "./sections/Stats";

export default function Home() {
  return (
    <>
      {/* Page Content */}
      <main>
        {/* First gradient zone: Hero to MidnightCarnival */}
        <div
          className="relative"
          style={{
            background: 'linear-gradient(to bottom, #000120 0%, #12043a 20%, #311C7B 60%, #7F56D3 100%)'
          }}
        >
          <Hero />
          <AboutUs />
          <Stats />
          <MidnightCarnival />
        </div>

        {/* Second gradient zone: InitiativePrakriti to Footer */}
        <div
          className="relative"
          style={{
            background: 'linear-gradient(to bottom, #370068 0%, #FFE0A8 25%, #FFFFFF 40%, #FFFFFF 75%, #1E0752 100%)'
          }}
        >
          <InitiativePrakriti />
          <MascotSection />
          <ContactUs />
          <Footer />
        </div>
      </main>
    </>
  );
}
