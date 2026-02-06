import React from "react";
import qr1 from "../assets/qr1.svg";
import qr2 from "../assets/qr2.svg";

export default function ContactUs() {
  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-20">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#370068] font-rosiana tracking-wider">
        CONTACT US
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12 md:ml-24">


        {/* Contacts */}
        <div className="
        grid grid-cols-[1fr_auto] gap-x-6 gap-y-2
        md:flex md:gap-12
        ">
        {/* Person 1 */}
        <div className="md:flex md:flex-col">
            <p className="text-lg font-semibold text-[#370068] whitespace-normal md:whitespace-nowrap">
            Vyankatesh Deshpande
            </p>
            <p className="text-base md:text-lg font-semibold text-[#370068] font-sans whitespace-normal md:whitespace-nowrap">
            +91 8208947193
            </p>
        </div>

        {/* Person 2 */}
        <div className="md:flex md:flex-col">
            <p className="text-lg font-semibold text-[#370068] whitespace-normal md:whitespace-nowrap">
            Atharva Honparkhe
            </p>
            <p className="text-base md:text-lg font-semibold text-[#370068] font-sans whitespace-normal md:whitespace-nowrap">
            +91 8847492966
            </p>
        </div>
        </div>


        {/* QR Codes */}
        <div className="flex justify-center gap-4 md:gap-6">
            <a
            href="https://www.youtube.com/@IgnusIITJodhpur"
            target="_blank"
            rel="noopener noreferrer"
            >
            <img src={qr1} alt="YouTube QR" className="w-20 h-20" />
            </a>

            <a
            href="https://www.instagram.com/ignus_iitj/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <img src={qr2} alt="Instagram QR" className="w-20 h-20" />
            </a>
        </div>

        </div>

      </div>
    </section>
  );
}
