import React from "react";
import qr1 from "../assets/qr1.svg";
import qr2 from "../assets/qr2.svg";
import qr3 from "../assets/qr3.svg";
export default function ContactUs() {
    return (
        <section className="w-full py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                <h2 className="text-3xl md:text-4xl font-bold text-[#370068] font-rosiana tracking-wider">
                    CONTACT US
                </h2>

                <div className="flex gap-6">
                    <a href="https://www.youtube.com/@IgnusIITJodhpur" target="_blank" rel="noopener noreferrer">
                        <img src={qr1} alt="QR 1" className="w-20 h-20" />
                    </a>
                    <a href="https://www.instagram.com/ignus_iitj/" target="_blank" rel="noopener noreferrer">
                        <img src={qr2} alt="QR 2" className="w-20 h-20" />
                    </a>
                </div>
            </div>
        </section>
    )
}