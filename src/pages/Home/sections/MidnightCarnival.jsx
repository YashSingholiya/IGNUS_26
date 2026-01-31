import React from "react";
import ferrisWheelTop from "../assets/ferris_wheel_top.svg";
import ferrisWheelBottom from "../assets/ferris_wheel_bottom.svg";
import carnival_1 from "../assets/carnival_1.svg";
export default function MidnightCarnival() {
  return (
    <section className="relative w-full overflow-hidden pt-8 pb-0 flex flex-col items-center">

      {/* CSS for wheel rotation */}
      <style>
        {`
          @keyframes rotateCounterClockwise {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }
          .rotate-wheel {
            animation: rotateCounterClockwise 30s linear infinite;
          }
        `}
      </style>

      {/* Title - positioned higher, more space below before carnival scene */}
      <h2 className="text-4xl md:text-5xl font-bold text-center relative z-20 text-[#FFFFFF] mb-20 font-rosiana tracking-wider">
        The Midnight Carnival
      </h2>

      {/* Visual scene - full width */}
      <div className="relative w-full">

        {/* FERRIS WHEEL CONTAINER - centered above skyline */}
        <div className="absolute -top-[20%] left-3/4 -translate-x-1/2 w-[30%] md:w-[25%] opacity-40 z-0">
          {/* Rotating wheel top (circle) */}
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <img
              src={ferrisWheelTop}
              alt="Ferris Wheel"
              className="absolute top-1/2 left-1/2 w-full h-auto rotate-wheel"
              style={{
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Static wheel bottom (stand) - positioned so its top meets the center of the wheel */}
          <img
            src={ferrisWheelBottom}
            alt="Ferris Wheel Stand"
            className="absolute -translate-x-1/2 w-[40%] h-auto"
            style={{
              top: '50%',
              left: '48.8%',
            }}
          />
        </div>

        {/* FOREGROUND SKYLINE - full width edge to edge */}
        <img
          src={carnival_1}
          alt="Carnival Skyline"
          className="relative z-10 w-full h-auto"
        />

      </div>

      {/* Description */}
      {/* <div className="relative z-20 max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-lg md:text-xl leading-relaxed text-[#FFFFFF] font-caudex">
          Midnight Carnival, a realm where imagination lights up in the dark. Lights shimmer and music kindles the heart. The sun sets as creativity lights everything ablaze. Wonder and excitement fill the air as the carnival beckons from afar.
        </p>
      </div> */}
    </section>
  );
}