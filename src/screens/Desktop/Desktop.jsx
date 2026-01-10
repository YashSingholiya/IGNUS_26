import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Desktop = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const targetDate = new Date("2026-02-05T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (field, value) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.college) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      await addDoc(collection(db, "pre_registrations"), {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        college: form.college,
        createdAt: Timestamp.now(),
      });

      toast.success("Pre-registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setForm({ fullName: "", email: "", phone: "", college: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const countdownItems = [
    { value: countdown.days.toString(), label: "Days" },
    { value: countdown.hours.toString(), label: "Hours" },
    { value: countdown.minutes.toString(), label: "Min" },
    { value: countdown.seconds.toString(), label: "Sec" },
  ];

  const formFields = [
    { placeholder: "Full Name", key: "fullName" },
    { placeholder: "Email Address", key: "email" },
    { placeholder: "Phone Number", key: "phone" },
    { placeholder: "College/Institute", key: "college" },
  ];

  return (
    <main
      className="w-full flex flex-col bg-black overflow-hidden"
      data-model-id="233:798"
    >
      <ToastContainer />
      
      <section className="w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-screen flex relative overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,1)_100%)]">
        <video
          className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-full lg:min-h-screen object-contain animate-fade-in opacity-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/src/assets/updated midnight carnival.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex items-end justify-center pb-3 sm:pb-6 md:pb-10 lg:pb-16 px-4">
          <div className="flex flex-col items-center gap-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <p className="[font-family:'Cinzel',Helvetica] font-bold text-lg sm:text-xl md:text-2xl lg:text-[32px] text-center tracking-[0.15em] leading-[110%] bg-[linear-gradient(90deg,#4117EF_14%,#92A1FF_25%,#92A1FF_65%,#5747E5_88%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent]">
              The Carnival Is Assembling....
            </p>
            <p className="[font-family:'Cinzel',Helvetica] font-normal text-base sm:text-lg md:text-xl lg:text-[32px] text-center tracking-[0.10em] leading-[110%] bg-[linear-gradient(90deg,#4117EF_14%,#92A1FF_25%,#92A1FF_65%,#5747E5_88%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] px-2">
              Get ready for IIT Jodhpur's biggest cultural extravaganza.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full relative mt-9 mb-0 pb-0">
        <div className="w-full min-h-[1800px] sm:min-h-[2000px] md:min-h-[2200px] lg:min-h-[2300px] h-auto relative">
          <div className="absolute top-[1100px] left-0 w-full h-[1136px] flex rotate-180">
            <div className="w-full h-[1136.17px] relative bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(9,15,37,1)_100%)]">
              {/* 4 Corner particles - rotated section */}
              <div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 top-[5%] left-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
                style={{ animation: "particle-top-left 5s linear infinite" }}
              />
              <div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 top-[5%] right-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
                style={{ animation: "particle-top-right 5s linear infinite" }}
              />
              <div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bottom-[5%] left-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
                style={{ animation: "particle-bottom-left 5s linear infinite" }}
              />
              <div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bottom-[5%] right-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
                style={{
                  animation: "particle-bottom-right 5s linear infinite",
                }}
              />
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-[1100px] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(9,15,37,1)_100%)]">
            {/* 4 Corner particles - normal section */}
            <div
              className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 top-[5%] left-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
              style={{ animation: "particle-top-left 5s linear infinite" }}
            />
            <div
              className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 top-[5%] right-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
              style={{ animation: "particle-top-right 5s linear infinite" }}
            />
            <div
              className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bottom-[5%] left-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
              style={{ animation: "particle-bottom-left 5s linear infinite" }}
            />
            <div
              className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bottom-[5%] right-[5%] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-indigo-600/40 blur-2xl"
              style={{ animation: "particle-bottom-right 5s linear infinite" }}
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-[1442px] mx-auto items-center gap-8 sm:gap-12 md:gap-[63px] px-4 py-6 sm:py-8 md:py-[46px] absolute top-4 sm:top-8 md:top-11 left-1/2 -translate-x-1/2">
          <div className="flex flex-col w-full max-w-[1327px] items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-[42px] py-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="flex flex-col items-center justify-center w-fit [font-family:'Cinzel',Helvetica] font-normal text-transparent text-center">
              <span className="font-spicy font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[3.69px] leading-tight mb-6 sm:mb-10 md:mb-16 animate-color-cycle-blue">
                Midnight
              </span>
              <span className="font-spicy font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[150px] tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[9.00px] leading-tight animate-color-cycle-pink">
                Carnival
              </span>
            </h1>
          </div>

          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="flex h-auto items-center justify-center gap-2 sm:gap-[13px] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-[36px] border-[none] bg-[linear-gradient(90deg,rgba(73,123,245,1)_0%,rgba(90,72,230,1)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[36px] before:[background:linear-gradient(119deg,rgba(255,255,255,1)_0%,rgba(102,102,102,0.1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none animate-fast-pulse">
              <span className="[font-family:'Bungee',Helvetica] font-normal text-[#fbeaff] text-lg sm:text-xl md:text-2xl text-center tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.96px] leading-[normal]">
                5th - 8th feb.
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[926.25px] items-center justify-center gap-4 sm:gap-5 md:gap-[25px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            <h2 className="flex items-center justify-center w-full [font-family:'Cinzel',Helvetica] font-bold text-blue-300 text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-center tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[3.52px] leading-[normal] px-4">
              The Carnival Awakens In:
            </h2>

            <div className="flex w-full max-w-[786px] items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-[62px] flex-wrap">
              {countdownItems.map((item, index) => (
                <div
                  key={index}
                  className="flex w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px] items-center justify-center gap-2.5 bg-[#050810] rounded-[12px] sm:rounded-[16px] md:rounded-[20px] border-2 sm:border-[3px] border-solid border-blue-400"
                >
                  <div className="flex flex-col items-center justify-center [font-family:'Inter',Helvetica] font-normal text-transparent text-center tracking-[0] leading-[normal]">
                    <span className="font-bold text-blue-300 text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                      {item.value}
                    </span>
                    <span className="text-blue-300 text-sm sm:text-base md:text-lg lg:text-2xl">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[1426px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms] px-4">
            <p className="flex items-center justify-center [font-family:'Cinzel_Decorative',Helvetica] font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.96px] leading-relaxed">
              When the sun sets, the magic begins. Join us for IIT Jodhpur&#39;s
              enchanting cultural festival under the stars. Three nights of
              mystery, wonder, and unforgettable moments.
            </p>
          </div>

          <Card className="flex flex-col w-full max-w-[754px] items-center gap-6 sm:gap-8 md:gap-[42px] pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-5 md:pb-[21px] px-0 rounded-[21px] border-2 border-solid border-blue-400 bg-[linear-gradient(135deg,rgba(8,17,50,0.5)_0%,rgba(32,2,83,0.5)_100%)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
            <CardContent className="w-full max-w-[659px] p-0">
              <div className="flex flex-col gap-3 sm:gap-[13px] px-4">
                <h3 className="flex items-center justify-center w-full bg-[linear-gradient(90deg,rgba(153,188,253,1)_0%,rgba(186,140,252,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-black text-transparent text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-center tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[4.48px] leading-[normal]">
                  PRE REGISTRATION
                </h3>

                <p className="flex items-center justify-center [font-family:'Cinzel',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg text-center tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[2.88px] leading-relaxed">
                  Be among the first to experience the magic! Pre-register now
                  for exclusive updates, early access to moonlit events, and
                  special discounts.
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-[56px] px-4">
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-[25px]">
                  <Input
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="w-full h-14 sm:h-16 md:h-[71px] px-4 sm:px-[15px] py-3 sm:py-3.5 bg-[#00000080] rounded-xl border-2 border-solid border-blue-400 [font-family:'Inter',Helvetica] font-normal text-[#b2b2b2] text-base sm:text-lg md:text-xl placeholder:text-[#b2b2b2]"
                  />

                  <Input
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full h-14 sm:h-16 md:h-[71px] px-4 sm:px-[15px] py-3 sm:py-3.5 bg-[#00000080] rounded-xl border-2 border-solid border-blue-400 [font-family:'Inter',Helvetica] font-normal text-[#b2b2b2] text-base sm:text-lg md:text-xl placeholder:text-[#b2b2b2]"
                  />

                  <Input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full h-14 sm:h-16 md:h-[71px] px-4 sm:px-[15px] py-3 sm:py-3.5 bg-[#00000080] rounded-xl border-2 border-solid border-blue-400 [font-family:'Inter',Helvetica] font-normal text-[#b2b2b2] text-base sm:text-lg md:text-xl placeholder:text-[#b2b2b2]"
                  />

                  <Input
                    placeholder="College/Institute"
                    value={form.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                    className="w-full h-14 sm:h-16 md:h-[71px] px-4 sm:px-[15px] py-3 sm:py-3.5 bg-[#00000080] rounded-xl border-2 border-solid border-blue-400 [font-family:'Inter',Helvetica] font-normal text-[#b2b2b2] text-base sm:text-lg md:text-xl placeholder:text-[#b2b2b2]"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="flex h-auto w-full items-center justify-center gap-2.5 px-6 sm:px-12 md:px-16 lg:px-24 py-4 sm:py-5 rounded-[21px] bg-[linear-gradient(90deg,rgba(68,125,245,1)_0%,rgba(125,85,246,1)_49%,rgba(82,70,228,1)_100%)] hover:opacity-90 transition-opacity"
                >
                  <span className="[font-family:'Inter',Helvetica] font-black text-[#f7f7f7] text-lg sm:text-xl md:text-[22px] tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[1.32px] leading-[normal]">
                    PRE-REGISTER NOW
                  </span>
                </Button>
              </div>

              <p className="flex items-center justify-center w-full mt-4 sm:mt-6 md:mt-[32px] px-4 [font-family:'Inter',Helvetica] font-normal text-gray-400 text-xs sm:text-sm text-center tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[1.96px] leading-relaxed">
                * Registrations open soon. This form is for early notifications
                only.
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col w-full max-w-[650px] items-center gap-8 sm:gap-12 md:gap-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]">
            <div className="flex flex-col w-full items-center gap-3 sm:gap-[14px]">
              <h3 className="flex items-center justify-center [font-family:'Cinzel',Helvetica] font-bold text-[#a0bbff] text-lg sm:text-xl md:text-2xl text-center tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.96px] leading-[normal] px-4">
                Or Just Stay Updated
              </h3>

              <div className="flex w-full gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center px-4">
                <Input
                  placeholder="Phone Number"
                  className="flex-1 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] h-14 sm:h-16 md:h-[78px] px-4 sm:px-6 md:px-[30px] py-3 sm:py-4 md:py-[25px] bg-black rounded-[59px] border-2 border-solid border-[#5174f5] [font-family:'Inter',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.80px] leading-[normal] placeholder:text-[#b2b2b2]"
                />

                <Button className="flex h-auto items-center justify-center gap-2 sm:gap-[13px] px-6 sm:px-8 md:px-[45px] py-3 sm:py-4 md:py-[25px] rounded-[53px] bg-[linear-gradient(90deg,rgba(73,121,245,1)_0%,rgba(83,70,228,1)_100%)] hover:opacity-90 active:opacity-60 transition-opacity">
                  <span className="[font-family:'Inter',Helvetica] font-black text-white text-base sm:text-lg md:text-xl text-center tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.96px] leading-[normal]">
                    Subscribe
                  </span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-center gap-4 sm:gap-6">
              <h4 className="flex items-center justify-center [font-family:'Cinzel',Helvetica] font-bold text-[#d1d1d1] text-lg sm:text-xl md:text-2xl text-center tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.96px] leading-[normal] px-4">
                Follow The Midnight Magic
              </h4>

              <div className="flex w-full items-center justify-center gap-4 sm:gap-6 md:gap-8">
                <a
                  href="https://www.instagram.com/ignus_iitj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <img
                    src="/src/assets/Insta.svg"
                    alt="Instagram"
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-[85px]"
                  />
                </a>
                <a
                  href="https://www.facebook.com/ignus.iitj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <img
                    src="/src/assets/fb.svg"
                    alt="Facebook"
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-[85px]"
                  />
                </a>
                <a
                  href="https://www.youtube.com/user/IgnusIITJodhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <img
                    src="/src/assets/yt.svg"
                    alt="YouTube"
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-[85px]"
                  />
                </a>
              </div>
            </div>
          </div>
          <footer className="flex items-center justify-center w-full h-auto min-h-20 mt-6 sm:mt-8 mb-0 pb-4 px-4 [font-family:'Inter',Helvetica] font-normal text-[#bfbfbf] text-sm sm:text-base text-center tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.64px] leading-relaxed">
            IIT Jodhpur | February 05-08, 2026
            <br />© 2026 IGNUS. All rights reserved.
          </footer>
        </div>
      </section>
    </main>
  );
};