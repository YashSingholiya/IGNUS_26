import React, { useEffect, useState, useRef } from "react";
import "./CA.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn, isCA, getIgnusID } from "../../utils/cookies";

const CA = () => {
  document.title = "CA | Ignus 26 IIT Jodhpur";

  const videoRef = useRef(null);

  const isCa = isCA();
  const ignusID = getIgnusID();

  const [numberOfReferrals, setNumberOfReferrals] = useState(0);
  const [CAPerksDetails, setCAPerksDetails] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newReferralID, setNewReferralID] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const handleCARegisterButton = () => {
    if (isLoggedIn()) {
      setShowRegisterModal(true);
    } else {
      toast.error("Please Login first!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  };

  const handleConfirmCARegister = async () => {
    setIsRegistering(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/accounts/ca-register/`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Registration failed");
      }

      const data = await response.json();

      // Store the referral ID and show success modal
      setNewReferralID(data["Ignus ID"]);
      setShowRegisterModal(false);
      setShowSuccessModal(true);
      toast.success("CA Registration successful! 🎉");
    } catch (error) {
      console.error("CA Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Reload page to update CA status
    window.location.reload();
  };

  const copyReferralID = () => {
    navigator.clipboard.writeText(newReferralID);
    toast.success("Referral ID copied to clipboard!");
  };

  return (
    <>
      {/* 🔥 Background Video */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="bg-video"
          src="/celebs.webm"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <ToastContainer />

      {/* CA Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-purple-900 text-center mb-6">
              Here's what being a Campus Ambassador (CA) gets you:
            </h3>

            <div className="space-y-3 mb-6">

              <div className="p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border-l-4 border-purple-500">
                <span className="font-bold text-purple-800">🥈 20+ Referrals:</span>{" "}
                <span className="text-gray-700">Earn <strong>1 FREE Imperial Gold Pass</strong> — your gateway to IGNUS'26!</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border-l-4 border-yellow-500">
                <span className="font-bold text-yellow-700">🥇 50+ Referrals:</span>{" "}
                <span className="text-gray-700">Unlock <strong>4 FREE Imperial Gold Passes</strong> — VIP access for you and your crew!</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-pink-500">
                <span className="font-bold text-pink-700">💎 100+ Referrals:</span>{" "}
                <span className="text-gray-700">Go legendary with <strong>up to 10 FREE Imperial Gold Passes</strong> — become the ultimate ambassador!</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700 text-sm">
                <span className="font-bold text-yellow-800">Note:</span> To qualify as a Campus Ambassador, your referrals must purchase an Imperial Silver Pass or Imperial Gold Pass (accommodation passes) for the referrals to be valid. Participants only need to enter your referral code ONCE WHEN COMPLETING THEIR PROFILE.
              </p>
            </div>

            <button
              onClick={handleConfirmCARegister}
              disabled={isRegistering}
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-colors"
            >
              {isRegistering ? "Registering..." : "REGISTER"}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal with Referral ID */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>

            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Registration Successful!
            </h3>

            <p className="text-gray-600 mb-6">
              Congratulations! You are now a Campus Ambassador for IGNUS'26.
            </p>

            {/* Referral ID Display */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Unique Referral ID</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-purple-800 tracking-wider">
                  {newReferralID}
                </span>
                <button
                  onClick={copyReferralID}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-red-800 text-sm font-medium flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>
                  <strong>Important:</strong> Please save this Referral ID securely. It is your responsibility to remember and share this ID with participants. This ID will not be shown again.
                </span>
              </p>
            </div>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
            >
              I've Saved My ID
            </button>
          </div>
        </div>
      )}

      {/* 🌍 Content */}
      <div className="map-section1">
        {!CAPerksDetails ? (
          <div className="map-title-content">
            <h2>IGNUS'26</h2>
            <h1>Ignus Ambassador Program</h1>

            {isCa ? (
              <>
                {/* <button
                  className="about-btn"
                  onClick={() => setCAPerksDetails(true)}
                >
                  View Perks
                </button> */}

                <div className="ca_details p-4 rounded-md">
                  <p>
                    Campus Ambassador ID:{" "}
                    <span className="highlight">{ignusID}</span>
                  </p>
                  <p>
                    Number of Referrals:{" "}
                    <span className="highlight">{numberOfReferrals}</span>
                  </p>
                </div>
              </>
            ) : (
              <button className="about-btn" onClick={handleCARegisterButton}>
                REGISTER
              </button>
            )}
          </div>
        ) : (
          <div className="perks-container">
            <h3 className="perks-title">
              Here's what being a Campus Ambassador (CA) gets you:
            </h3>

            <div className="perks-list">
              <div className="perk-item"><strong>5+:</strong> ₹1000 rewards</div>
              <div className="perk-item"><strong>10+:</strong> ₹2000 rewards</div>
              <div className="perk-item"><strong>20+:</strong> ₹2000 + Silver Pass</div>
              <div className="perk-item"><strong>30+:</strong> ₹3000 + Gold Pass</div>
              <div className="perk-item"><strong>40+:</strong> ₹4000 + Gold + Merch</div>
              <div className="perk-item"><strong>50+:</strong> ₹5000 + Gold + Tour</div>
            </div>

            <p className="note">
              Referrals must purchase Silver/Gold Pass.
            </p>

            <button
              className="about-btn-2"
              onClick={() => setCAPerksDetails(false)}
            >
              Back
            </button>
          </div>
        )}
      </div>

      <div id="about-body">
        <div className="about-main-cont">
          <div className="about-text">
            <h1>ABOUT MAP</h1>
            <p>
              This nationwide programme is well-known for shaping and exposing budding leaders from various colleges as efficient managers and creative beacons. Once successfully becoming a part of this elite team, the members gain an experience of a lifetime, on various fronts; be it entrepreneurial or character development. We officially call upon for ambassador registrations to build up a team of powerful professionals who'll help spread the word
            </p>
          </div>

          <div className="about-responsibilities">
            <h2>Your Responsibilites:</h2>
            <ul>
              <li>
                <div className="responsibility-header">REPRESENT</div>
                <div className="responsibility-content">
                  Be the representative of IGNUS in your college
                </div>
              </li>
              <li>
                <div className="responsibility-header">PUBLICIZE</div>
                <div className="responsibility-content">
                  Use social media like instagram, facebook to publicize IGNUS
                </div>
              </li>
              <li>
                <div className="responsibility-header">ORGANIZE</div>
                <div className="responsibility-content">
                  Events and activities to engage audience and peers
                </div>
              </li>
              <li>
                <div className="responsibility-header">PROMOTE</div>
                <div className="responsibility-content">
                  IGNUS through posters, banners, emails
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CA;

