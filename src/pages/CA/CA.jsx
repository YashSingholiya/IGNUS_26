import React, { useEffect, useState, useRef } from "react";
import "./CA.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CA = () => {
  document.title = "CA | Ignus 26 IIT Jodhpur";

  const videoRef = useRef(null);

  const isCa = String(cookieStore.isCA).toLowerCase() === "true";
  const ignusID = cookieStore.ignusID;

  const [numberOfReferrals, setNumberOfReferrals] = useState(0);
  const [CAPerksDetails, setCAPerksDetails] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const handleCARegisterButton = () => {
    if (cookieStore.LoggedIn) {
      // handleCARegister();
    } else {
      toast.error("Please Login first!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  };

  return (
    <>
      {/* 🔥 Background Video */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="bg-video"
          src="/celebs.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <ToastContainer />

      {/* 🌍 Content */}
      <div className="map-section1">
        {!CAPerksDetails ? (
          <div className="map-title-content">
            <h2>IGNUS'26</h2>
            <h1>Ignus Ambassador Program</h1>

            {isCa ? (
              <>
                <button
                  className="about-btn"
                  onClick={() => setCAPerksDetails(true)}
                >
                  View Perks
                </button>

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
