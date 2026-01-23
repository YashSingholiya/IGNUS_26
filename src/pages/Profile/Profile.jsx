import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import profileBg from "./assets/profile.png";
import "./Profile.css";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Placeholder data
  const profileData = {
    name: "John Doe",
    phoneNumber: "+91 9876543210",
    emailId: "johndoe@example.com",
    universityName: "IIT Jodhpur",
    gender: "Male",
    passType: "Pro Pass",
    passId: "IGN-2024-8832",
    daysToGo: 12,
  };

  const eventsRegistered = [
    "Cosplay",
    "Esports",
    "Hackathon",
    "DJ Night"
  ];

  const handlePassClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="profile-container">
      <img src={profileBg} alt="Profile Background" className="profile-bg" />
      <Navbar />

      <div className="profile-content">

        {/* Hero Section */}
        <div className="profile-hero animate-slide-up">
          <div className="avatar-container">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User Avatar"
              className="profile-avatar"
            />
          </div>
          <h1 className="profile-name">{profileData.name}</h1>
          <p className="profile-university">{profileData.universityName}</p>
        </div>

        {/* Main Content Grid */}
        <div className="profile-grid">

          {/* Left Column: Personal Details */}
          <div className="glass-card details-card animate-slide-up delay-200">
            <h2>Personal Details</h2>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{profileData.emailId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{profileData.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{profileData.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">University</span>
                <span className="detail-value">{profileData.universityName}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Digital Pass (3D Flip) */}
          <div
            className={`pass-card-container animate-slide-up delay-300 ${isFlipped ? 'flipped' : ''}`}
            onClick={handlePassClick}
          >
            <div className="pass-card-inner">

              {/* Front of Card */}
              <div className="pass-card-front">
                <div className="glass-card pass-card">
                  <h2>Digital Pass</h2>
                  <div className="digital-pass">
                    <div className="pass-info">
                      <span className="pass-type">{profileData.passType}</span>
                      <span className="pass-id">ID: {profileData.passId}</span>
                      <div style={{ marginTop: '15px', fontSize: '0.85rem', color: '#a0c4ff', letterSpacing: '0.5px' }}>
                        ACCESS: ALL EVENTS + PRO NIGHTS
                      </div>
                    </div>
                    <div className="qr-placeholder">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IgnusProPass"
                        alt="QR Code"
                      />
                    </div>
                  </div>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', letterSpacing: '0.5px' }}>
                    Tap to view details • Present at entry
                  </p>
                </div>
              </div>

              {/* Back of Card */}
              <div className="pass-card-back glass-card">
                <h2>Pass Details</h2>
                <div style={{ textAlign: 'left', width: '100%', color: '#ddd' }}>
                  <p style={{ marginBottom: '10px' }}><strong>Holder:</strong> {profileData.name}</p>
                  <p style={{ marginBottom: '10px' }}><strong>Valid Until:</strong> Feb 28, 2024</p>
                  <p style={{ marginBottom: '10px' }}><strong>Zone Access:</strong> VIP, Main Stage, Gaming Zone</p>
                  <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#aaa' }}>
                    This pass is non-transferable. Please carry a valid ID proof along with this digital pass.
                  </p>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#d4af37' }}>Tap to flip back</p>
              </div>

            </div>
          </div>

          {/* Bottom Row: Journey / Events */}
          <div className="glass-card journey-card animate-slide-up delay-400">
            <h2>Your Events ({eventsRegistered.length})</h2>
            {eventsRegistered.length > 0 ? (
              <div className="events-grid">
                {eventsRegistered.map((event, index) => (
                  <div key={index} className="event-item event-card">
                    <span className="event-name">{event}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#aaa' }}>No events registered yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
