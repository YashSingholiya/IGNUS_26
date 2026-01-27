import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "./navLinks";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import { isLoggedIn, isProfileComplete, clearAuthCookies } from "../../utils/cookies";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ login state from cookie

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/logout/`, {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout response:", response.status);
    } catch (error) {
      console.error("Logout error:", error);
    }
    // Clear cookies on frontend as fallback
    clearAuthCookies();
    window.location.href = "/login";
  };

  // Close mobile menu on resize to desktop
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

          {/* Logo */}
          <div className="flex items-center gap-2 relative">
            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full scale-150" />
            <Link to="/">
              <img
                src={logo}
                alt="Ignus"
                className="h-12 md:h-14 w-auto relative z-10 invert"
              />
            </Link>
          </div>

          {/* Desktop Links (Centered) */}
          <ul className="hidden lg:flex gap-10 text-white items-center absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-rosiana text-base md:text-lg tracking-wide ease-out hover:text-purple-300 transition-all duration-200 hover:scale-[1.1] inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn() && isProfileComplete() ? (
              <>
                <Link
                  to="/profile"
                  className="transition-opacity hover:opacity-80"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="h-8 w-8"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
              >
                Login / Register
              </Link>
            )}
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

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-sm">
            <ul className="flex flex-col gap-4 px-6 py-6 text-white">
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

              {/* Mobile Auth Section */}
              {isLoggedIn() && isProfileComplete() ? (
                <>
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
                  <li>
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout;
                      }}
                      className="w-full text-left py-2 font-rosiana text-lg text-purple-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="py-2 font-rosiana text-lg text-purple-300"
                  >
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}