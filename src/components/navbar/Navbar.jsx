import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./navLinks";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="w-full px-6 py-2 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">

          {/* Logo with glow */}
          <div className="flex items-center gap-2 relative">
            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full scale-150" />
            <img
              src={logo}
              alt="Ignus"
              className="h-12 md:h-14 w-auto relative z-10"
            />
          </div>

          {/* Desktop Links - Centered */}
          <ul className="hidden lg:flex gap-10 text-white list-none items-center absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <li 
                key={link.label}
                className="text-[#FCFCFC] cursor-pointer transition-opacity hover:opacity-80"
              >
                <a
                  href={link.href}
                  className="hover:text-purple-300 transition-colors font-rosiana text-base md:text-lg tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Profile Icon */}
          <div className="hidden lg:flex items-center">
            <Link to="/profile" className="text-[#FCFCFC] cursor-pointer transition-opacity hover:opacity-80">
              <img
                src={profile}
                alt="Profile"
                className="h-8 w-8"
              />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="block w-7 h-0.5 bg-white mb-1.5" />
            <span className="block w-7 h-0.5 bg-white mb-1.5" />
            <span className="block w-7 h-0.5 bg-white" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-sm">
            <ul className="flex flex-col gap-4 px-6 py-6 text-white list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-rosiana text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Profile Link in Mobile */}
              <li>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 font-rosiana text-lg"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="h-6 w-6"
                  />
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}