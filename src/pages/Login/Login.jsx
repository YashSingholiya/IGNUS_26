import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import mascot from "./assets/mascot.svg";
import wheel_circle from "./assets/wheel_circle.svg";
import wheel_stand from "./assets/wheel_stand.svg";
import cloud_2 from "./assets/cloud_2.png";
import devicon_google from "./assets/devicon_google.svg";

import "./Login.css";

export default function Auth() {
  const navigate = useNavigate();
  
  // Views: 'login', 'signup', 'complete-profile'
  const [currentView, setCurrentView] = useState("login");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    phoneNo: "",
    gender: "",
    college: "",
    currentYear: "",
    referralCode: "",
    govId: null,
    collegeId: null,
  });

  // Smooth transition handler
  const transitionTo = (view) => {
    setCurrentView(view);
  };

  // Form handlers
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", loginData);
    navigate("/profile");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log("Signup:", signupData);
    transitionTo("complete-profile");
  };

  const handleCompleteProfile = (e) => {
    e.preventDefault();
    // Show confirmation modal instead of directly navigating
    setShowModal(true);
  };

  const handleConfirmAndSave = () => {
    // TODO: Implement profile completion logic
    console.log("Profile:", profileData);
    setShowModal(false);
    navigate("/profile");
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-in
    console.log("Google Sign-in clicked");
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileData({ ...profileData, [field]: file });
    }
  };

  // Determine if mascot should be on the left (signup or complete-profile)
  const isMascotLeft = currentView === "signup" || currentView === "complete-profile";

  return (
    <>
      <Navbar />
      <main 
        className="pt-16 min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #4B2BFF 0%, #FFF0E3 100%)' }}
      >
        {/* Background Wheel */}
        <div className="wheel-container">
          <img
            src={wheel_stand}
            alt=""
            className="wheel-stand"
          />
          <img
            src={wheel_circle}
            alt=""
            className="wheel-circle"
          />
        </div>
        
        {/* Main sliding container */}
        <div className="auth-container relative z-4">
          
          {/* Mascot Panel - slides left/right */}
          <div
            className={`mascot-panel ${isMascotLeft ? 'mascot-left' : 'mascot-right'}`}
          >
            <div className={`mascot-wrapper ${isMascotLeft ? 'rounded-left' : 'rounded-right'}`}>
              <img
                src={mascot}
                alt="Mascot"
                className="mascot-image"
              />
            </div>
          </div>

          {/* Forms Panel - slides opposite to mascot */}
          <div
            className={`forms-panel ${isMascotLeft ? 'forms-right' : 'forms-left'}`}
          >
            {/* Login Form */}
            <div className={`form-container ${currentView === 'login' ? 'form-active' : 'form-inactive'}`}>
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

                <div className="mt-6 text-center">
                  <p className="text-white/60 mb-4">Or</p>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <img
                      src={devicon_google}
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Sign in with Google
                  </button>
                </div>

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
            <div className={`form-container ${currentView === 'signup' ? 'form-active' : 'form-inactive'}`}>
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
                      setSignupData({ ...signupData, firstName: e.target.value })
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

                <div className="mt-6 text-center">
                  <p className="text-white/60 mb-4">Or</p>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <img
                      src={devicon_google}
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Sign in with Google
                  </button>
                </div>

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
            <div className={`form-container ${currentView === 'complete-profile' ? 'form-active' : 'form-inactive'}`}>
              <div className="form-content rounded-right-form">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Complete Profile
                </h2>

                <form onSubmit={handleCompleteProfile} className="space-y-4">
                  <input
                    type="tel"
                    placeholder="Phone No"
                    value={profileData.phoneNo}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phoneNo: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="Gender"
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="College"
                    value={profileData.college}
                    onChange={(e) =>
                      setProfileData({ ...profileData, college: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="Current Year"
                    value={profileData.currentYear}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        currentYear: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="Referral Code"
                    value={profileData.referralCode}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        referralCode: e.target.value,
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
                While coming to campus, please carry a physical copy of your government document as well as college ID, otherwise you won't be granted entry into the college.
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
