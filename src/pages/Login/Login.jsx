import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import mascot from "./assets/mascot.svg";
import wheel_circle from "./assets/wheel_circle.svg";
import wheel_stand from "./assets/wheel_stand.svg";
import cloud_2 from "./assets/cloud_2.png";
import devicon_google from "./assets/devicon_google.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

export default function Auth() {
  const navigate = useNavigate();

  // Views: 'login', 'signup', 'complete-profile'
  const [currentView, setCurrentView] = useState("login");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const getCookie = (name) => {
  //   return document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith(name + "="))
  //     ?.split("=")[1];
  // };

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    phone: "",
    gender: "M",
    college: "",
    currentYear: "1",
    state: "",
    govId: null,
    collegeId: null,
    referralCode: null,
  });
  const isLoginValid = () => {
    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error("Email and password are required");
      return false;
    }
    return true;
  };

  const isSignupValid = () => {
    if (
      !signupData.firstName.trim() ||
      !signupData.lastName.trim() ||
      !signupData.email.trim() ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const isProfileValid = () => {
    if (!profileData.phone || profileData.phone.length !== 10) {
      toast.error("Enter valid 10-digit phone number");
      return false;
    }
    if (!profileData.college.trim()) {
      toast.error("College name is required");
      return false;
    }
    if (!profileData.state) {
      toast.error("Please select your state");
      return false;
    }
    if (!profileData.govId) {
      toast.error("Government ID is required");
      return false;
    }
    if (!profileData.collegeId) {
      toast.error("College ID is required");
      return false;
    }
    return true;
  };

  const GENDER_OPTIONS = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "T", label: "Other" },
  ];

  const YEAR_OPTIONS = [
    { value: "1", label: "First Year" },
    { value: "2", label: "Second Year" },
    { value: "3", label: "Third Year" },
    { value: "4", label: "Fourth Year" },
    { value: "5", label: "Fifth Year" },
    { value: "6", label: "Other" },
  ];

  const STATE_OPTIONS = [
    { value: "1", label: "Andhra Pradesh" },
    { value: "2", label: "Arunachal Pradesh" },
    { value: "3", label: "Assam" },
    { value: "4", label: "Bihar" },
    { value: "5", label: "Chhattisgarh" },
    { value: "6", label: "Goa" },
    { value: "7", label: "Gujarat" },
    { value: "8", label: "Haryana" },
    { value: "9", label: "Himachal Pradesh" },
    { value: "10", label: "Jammu & Kashmir" },
    { value: "11", label: "Jharkhand" },
    { value: "12", label: "Karnataka" },
    { value: "13", label: "Kerala" },
    { value: "14", label: "Madhya Pradesh" },
    { value: "15", label: "Maharashtra" },
    { value: "16", label: "Manipur" },
    { value: "17", label: "Meghalaya" },
    { value: "18", label: "Mizoram" },
    { value: "19", label: "Nagaland" },
    { value: "20", label: "Odisha" },
    { value: "21", label: "Punjab" },
    { value: "22", label: "Rajasthan" },
    { value: "23", label: "Sikkim" },
    { value: "24", label: "Tamil Nadu" },
    { value: "25", label: "Telangana" },
    { value: "26", label: "Tripura" },
    { value: "27", label: "Uttarakhand" },
    { value: "28", label: "Uttar Pradesh" },
    { value: "29", label: "West Bengal" },
    { value: "30", label: "Andaman & Nicobar Islands" },
    { value: "31", label: "Delhi" },
    { value: "32", label: "Chandigarh" },
    { value: "33", label: "Dadra & Nagar Haveli" },
    { value: "34", label: "Daman & Diu" },
    { value: "35", label: "Lakshadweep" },
    { value: "36", label: "Puducherry" },
  ];

  // Smooth transition handler
  const transitionTo = (view) => {
    setCurrentView(view);
  };

  // Form handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isLoginValid()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/accounts/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loginData.email,
            password: loginData.password,
          }),
        },
      );

      const text = await res.text();

      if (!res.ok) {
        if (text.toLowerCase().includes("google")) {
          toast.info(
            "This account was created using Google. Please sign in with Google.",
          );
        } else {
          toast.error(text || "Invalid credentials");
        }
        return;
      }

      const data = JSON.parse(text);

      // 🔥 STORE AUTH STATE
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("isProfileComplete", String(data.profile_complete));
      localStorage.setItem("isGoogle", String(data.is_google));

      if (!data.profile_complete) {
        transitionTo("complete-profile");
      } else {
        navigate("/profile");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isSignupValid()) return;
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: signupData.firstName,
            last_name: signupData.lastName,
            email: signupData.email,
            password: signupData.password,
          }),
        },
      );

      if (res.status === 409) {
        toast.info("Account already exists. Please sign in.");
        setLoginData({ email: signupData.email, password: "" });
        transitionTo("login");
        return;
      }

      if (!res.ok) {
        toast.error("Signup failed");
        return;
      }
      const data = await res.json();

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("isProfileComplete", "false");
      localStorage.setItem("isGoogle", "false");

      transitionTo("complete-profile");

      transitionTo("complete-profile");
    } catch {
      toast.error("Signup failed");
    }
  };

  const handleCompleteProfile = (e) => {
    e.preventDefault();
    if (!isProfileValid()) return;
    // Show confirmation modal instead of directly navigating
    setShowModal(true);
  };

  const handleConfirmAndSave = async () => {
    try {
      const formData = new FormData();

      formData.append("phone", profileData.phone);
      formData.append("gender", profileData.gender);
      formData.append("college", profileData.college);
      formData.append("current_year", profileData.currentYear);
      formData.append("state", profileData.state);
      formData.append("referral_code", profileData.referralCode ?? "");

      if (profileData.govId) {
        formData.append("govt_id", profileData.govId);
      }

      if (profileData.collegeId) {
        formData.append("clg_id", profileData.collegeId);
      }

      const token = localStorage.getItem("access");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/accounts/user-profile/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data?.detail || "Profile update failed");
        return;
      }

      console.log("Profile saved:", data);
      localStorage.setItem("isProfileComplete", "true");

      setShowModal(false);
      navigate("/profile");
    } catch (err) {
      console.error("Profile error:", err);
      alert("Something went wrong while saving profile");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/accounts/login/google/`;
  };

  const handleGoogleSignup = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: `${import.meta.env.VITE_BACKEND_URL}/api/accounts/register/google/`,
      response_type: "code",
      scope: "openid email profile",
      access_type: "online",
      prompt: "select_account",
    });
    console.log(params.toString());
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileData({ ...profileData, [field]: file });
    }
  };

  // Determine if mascot should be on the left (signup or complete-profile)
  const isMascotLeft =
    currentView === "signup" || currentView === "complete-profile";

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={4000} />
      <main
        className="pt-16 min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #4B2BFF 0%, #FFF0E3 100%)",
        }}
      >
        {/* Background Wheel */}
        <div className="wheel-container">
          <img src={wheel_stand} alt="" className="wheel-stand" />
          <img src={wheel_circle} alt="" className="wheel-circle" />
        </div>

        {/* Main sliding container */}
        <div className="auth-container relative z-4">
          {/* Mascot Panel - slides left/right */}
          <div
            className={`mascot-panel ${isMascotLeft ? "mascot-left" : "mascot-right"}`}
          >
            <div
              className={`mascot-wrapper ${isMascotLeft ? "rounded-left" : "rounded-right"}`}
            >
              <img src={mascot} alt="Mascot" className="mascot-image" />
            </div>
          </div>

          {/* Forms Panel - slides opposite to mascot */}
          <div
            className={`forms-panel ${isMascotLeft ? "forms-right" : "forms-left"}`}
          >
            {/* Login Form */}
            <div
              className={`form-container ${currentView === "login" ? "form-active" : "form-inactive"}`}
            >
              <div className="form-content rounded-left-form">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-rosiana">
                  Login to Account
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                {/* <div className="mt-6 text-center">
                  <p className="text-white/60 mb-4">Or</p>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <img
                      src={devicon_google}
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Sign in with Google
                  </button>
                </div> */}

                <p className="mt-6 text-center text-gray-800 text-base font-medium">
                  Don't have an account?{" "}
                  <button
                    onClick={() => transitionTo("signup")}
                    className="text-gray-900 font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <div
              className={`form-container ${currentView === "signup" ? "form-active" : "form-inactive"}`}
            >
              <div className="form-content rounded-right-form">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Create Account
                </h2>

                <form onSubmit={handleSignup} className="space-y-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={signupData.firstName}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={signupData.lastName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full transition-colors"
                    >
                      Sign up
                    </button>
                  </div>
                </form>

                {/* <div className="mt-6 text-center">
                  <p className="text-white/60 mb-4">Or</p>
                  <button
                    onClick={handleGoogleSignup}
                    className="w-full py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <img
                      src={devicon_google}
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Sign up with Google
                  </button>
                </div> */}

                <p className="mt-6 text-center text-gray-800 text-base font-medium">
                  Already have an account?{" "}
                  <button
                    onClick={() => transitionTo("login")}
                    className="text-gray-900 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>

            {/* Complete Profile Form */}
            <div
              className={`form-container ${currentView === "complete-profile" ? "form-active" : "form-inactive"}`}
            >
              <div className="form-content rounded-right-form">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Complete Profile
                </h2>

                <form onSubmit={handleCompleteProfile} className="space-y-4">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="Phone Number"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    required
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white"
                  />

                  <select
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white"
                  >
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="College Name"
                    value={profileData.college}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        college: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white"
                  />

                  <select
                    value={profileData.currentYear}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        currentYear: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white"
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y.value} value={y.value}>
                        {y.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={profileData.state}
                    onChange={(e) =>
                      setProfileData({ ...profileData, state: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {STATE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Referral Code (optional)"
                    value={profileData.referralCode || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        referralCode: e.target.value || null,
                      })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />

                  {/* Gov. ID Upload */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Gov. ID"
                      readOnly
                      value={profileData.govId?.name || ""}
                      className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30"
                    />
                    <label className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full cursor-pointer transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("govId", e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* College ID Upload */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="College ID"
                      readOnly
                      value={profileData.collegeId?.name || ""}
                      className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30"
                    />
                    <label className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full cursor-pointer transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("collegeId", e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud image at the bottom */}
        <img
          src={cloud_2}
          alt=""
          className="absolute bottom-0 left-0 w-full h-auto object-cover pointer-events-none z-50 opacity-20"
        />

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Important Notice
              </h3>
              <p className="text-gray-700 text-center mb-6 leading-relaxed">
                While coming to campus, please carry a physical copy of your
                government document as well as college ID, otherwise you won't
                be granted entry into the college.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAndSave}
                  className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
