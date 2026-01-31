import React from "react";
import moon from "../assets/moon.png";
import icon_college from "../assets/icon_college.svg";
import icon_eyeball from "../assets/icon_eyeball.svg";
import icon_govt from "../assets/icon_govt.svg";
import icon_footfall from "../assets/icon_footfall.svg";
import icon_corporate from "../assets/icon_corporate.svg";
import icon_events from "../assets/icon_events.svg";

export default function AboutUs() {
  return (
    <section className="relative w-full py-8 flex justify-center overflow-hidden min-h-[700px]">

      {/* Realistic soft clouds - behind content */}
      <style>
        {`
          /* Soft dreamy cloud style matching reference */
          .cloud-soft {
            position: absolute;
            z-index: 1;
          }
          
          .cloud-soft .puff {
            position: absolute;
            background: radial-gradient(ellipse at center, 
              rgba(200, 210, 235, 0.7) 0%,
              rgba(180, 195, 225, 0.5) 30%,
              rgba(160, 180, 215, 0.3) 60%,
              transparent 100%
            );
            border-radius: 50%;
            filter: blur(8px);
          }
          
          /* Cloud 1 - Large left side, upper position */
          .cloud-1 { top: 8%; animation: driftCloud 120s linear infinite; }
          .cloud-1 .puff:nth-child(1) { width: 180px; height: 100px; left: 0; top: 60px; }
          .cloud-1 .puff:nth-child(2) { width: 160px; height: 110px; left: 80px; top: 40px; }
          .cloud-1 .puff:nth-child(3) { width: 200px; height: 130px; left: 180px; top: 20px; }
          .cloud-1 .puff:nth-child(4) { width: 180px; height: 120px; left: 320px; top: 0; }
          .cloud-1 .puff:nth-child(5) { width: 160px; height: 100px; left: 440px; top: 25px; }
          .cloud-1 .puff:nth-child(6) { width: 140px; height: 90px; left: 540px; top: 50px; }
          .cloud-1 .puff:nth-child(7) { width: 120px; height: 80px; left: 100px; top: 90px; }
          .cloud-1 .puff:nth-child(8) { width: 150px; height: 95px; left: 250px; top: 80px; }
          .cloud-1 .puff:nth-child(9) { width: 130px; height: 85px; left: 380px; top: 70px; }
          
          /* Cloud 2 - Bottom left large */
          .cloud-2 { top: 45%; animation: driftCloud 100s linear infinite; animation-delay: -40s; }
          .cloud-2 .puff:nth-child(1) { width: 200px; height: 120px; left: 0; top: 80px; }
          .cloud-2 .puff:nth-child(2) { width: 220px; height: 140px; left: 120px; top: 50px; }
          .cloud-2 .puff:nth-child(3) { width: 250px; height: 160px; left: 280px; top: 20px; }
          .cloud-2 .puff:nth-child(4) { width: 230px; height: 150px; left: 460px; top: 0px; }
          .cloud-2 .puff:nth-child(5) { width: 200px; height: 130px; left: 620px; top: 30px; }
          .cloud-2 .puff:nth-child(6) { width: 180px; height: 110px; left: 150px; top: 120px; }
          .cloud-2 .puff:nth-child(7) { width: 200px; height: 130px; left: 350px; top: 100px; }
          .cloud-2 .puff:nth-child(8) { width: 170px; height: 100px; left: 530px; top: 90px; }
          
          /* Cloud 3 - Bottom right */
          .cloud-3 { top: 78%; animation: driftCloud 90s linear infinite; animation-delay: -70s; }
          .cloud-3 .puff:nth-child(1) { width: 180px; height: 110px; left: 0; top: 40px; }
          .cloud-3 .puff:nth-child(2) { width: 200px; height: 130px; left: 100px; top: 20px; }
          .cloud-3 .puff:nth-child(3) { width: 230px; height: 150px; left: 240px; top: 0px; }
          .cloud-3 .puff:nth-child(4) { width: 210px; height: 140px; left: 400px; top: 0px; }
          .cloud-3 .puff:nth-child(5) { width: 180px; height: 120px; left: 540px; top: 5px; }
          .cloud-3 .puff:nth-child(6) { width: 160px; height: 100px; left: 140px; top: 50px; }
          .cloud-3 .puff:nth-child(7) { width: 190px; height: 120px; left: 320px; top: 45px; }
          
          /* Cloud 4 - Small mid-left */
          .cloud-4 { top: 65%; animation: driftCloud 110s linear infinite; animation-delay: -20s; }
          .cloud-4 .puff:nth-child(1) { width: 120px; height: 75px; left: 0; top: 20px; }
          .cloud-4 .puff:nth-child(2) { width: 140px; height: 90px; left: 70px; top: 20px; }
          .cloud-4 .puff:nth-child(3) { width: 160px; height: 100px; left: 160px; top: 0px; }
          .cloud-4 .puff:nth-child(4) { width: 140px; height: 85px; left: 270px; top: 0px; }
          .cloud-4 .puff:nth-child(5) { width: 120px; height: 70px; left: 360px; top: 20px; }
          .cloud-4 .puff:nth-child(6) { width: 130px; height: 80px; left: 100px; top: 20px; }
          
          /* Cloud 5 - Small bottom right accent */
          .cloud-5 { top: 85%; animation: driftCloud 85s linear infinite; animation-delay: -55s; }
          .cloud-5 .puff:nth-child(1) { width: 150px; height: 95px; left: 0; top: -260px; }
          .cloud-5 .puff:nth-child(2) { width: 170px; height: 110px; left: 90px; top: -255px; }
          .cloud-5 .puff:nth-child(3) { width: 190px; height: 125px; left: 200px; top: -220px; }
          .cloud-5 .puff:nth-child(4) { width: 170px; height: 110px; left: 340px; top: -220px; }
          .cloud-5 .puff:nth-child(5) { width: 150px; height: 95px; left: 460px; top: -220px; }
          .cloud-5 .puff:nth-child(6) { width: 160px; height: 100px; left: 120px; top: -220px; }
          .cloud-5 .puff:nth-child(7) { width: 140px; height: 90px; left: 280px; top: -220px; }
          
          @keyframes driftCloud {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-800px); }
          }
        `}
      </style>

      {/* Cloud layer - positioned behind content with z-index: 1 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud-soft cloud-1">
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
        </div>
        <div className="cloud-soft cloud-2">
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
        </div>
        <div className="cloud-soft cloud-3">
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
        </div>
        <div className="cloud-soft cloud-4">
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
        </div>
        <div className="cloud-soft cloud-5">
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
          <div className="puff"></div>
        </div>
      </div>

      {/* Content layer - z-index: 10 to be above clouds */}
      <div className="relative flex flex-col items-center max-w-4xl px-4 text-center z-10">

        {/* Moon with transparent PNG - BIGGER */}
        <div className="relative w-80 md:w-96 lg:w-[450px]">
          {/* Soft glow behind moon */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(135, 206, 250, 0.6) 0%, rgba(135, 206, 250, 0.3) 40%, transparent 70%)',
              transform: 'translate(-50%, -50%) scale(0.8)',
              filter: 'blur(30px)'
            }}
          />
          {/* Moon image - now using PNG with transparent background */}
          <img
            src={moon}
            alt="Moon"
            className="relative w-full h-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(135, 206, 250, 0.8)) drop-shadow(0 0 80px rgba(135, 206, 250, 0.5))'
            }}
          />
        </div>

        {/* ABOUT US - Bigger with more spacing */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFFFFF] font-rosiana tracking-wider mt-8">
          ABOUT US
        </h2>

        {/* Paragraph with more spacing from title */}
        <p className="text-lg md:text-xl leading-relaxed text-[#FFFFFF] font-caudex max-w-3xl mt-8">
          IGNUS, the much-anticipated annual socio-cultural fest of IIT Jodhpur, is back with greater energy and grandeur than ever before.
A celebration of art, culture, and pluralism, IGNUS brings together the brightest creative and intellectual minds from across the country.

It serves as a vibrant stage where talent meets passion — a space to express, perform, and showcase extraordinary creativity through the spirit of art and culture.
        </p>

        {/* Merged Stats Section */}
        {/* <div className="grid grid-cols-3 gap-y-10 gap-x-10 md:gap-x-14 lg:gap-x-20 max-w-5xl px-6 mt-16">
          <Stat value="200+" label="COLLEGES" img={icon_college} />
          <Stat value="200k+" label="EYEBALLS" img={icon_eyeball} />
          <Stat value="30+" label="GOVT. ORG" img={icon_govt} />
          <Stat value="80k+" label="FOOTFALLS" img={icon_footfall} />
          <Stat value="75+" label="CORPORATES" img={icon_corporate} />
          <Stat value="50+" label="EVENTS" img={icon_events} />
        </div> */}

      </div>

    </section>
  );
}

function Stat({ value, label, img }) {
  return (
    <div className="flex items-center gap-4">
      {/* Icon - Bigger */}
      <img
        src={img}
        alt=""
        className="w-8 h-8 md:w-10 md:h-10"
      />
      {/* Text - Bigger */}
      <div className="flex flex-col text-[#DAB8FF] text-left">
        <span className="text-xl md:text-2xl lg:text-3xl font-bold font-redrose">
          {value}
        </span>
        <span className="text-sm md:text-base tracking-wide font-raleway uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}