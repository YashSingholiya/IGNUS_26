import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import profileBg from "./assets/profile.png";
import "./Profile.css";
import {
  isLoggedIn,
  isProfileComplete,
  clearAuthCookies,
} from "../../utils/cookies";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState(null);
  const [eventsRegistered, setEventsRegistered] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 🔐 Auth guards
        if (!isLoggedIn()) {
          window.location.href = "/login";
          return;
        }

        if (!isProfileComplete()) {
          window.location.href = "/login";
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/accounts/user-profile-details/`,
          {
            method: "GET",
            credentials: "include", // 🔥 REQUIRED
          },
        );

        if (res.status === 401 || res.status === 403) {
          clearAuthCookies();
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          throw new Error(`Failed to fetch profile (${res.status})`);
        }

        const data = await res.json();
        const { user, userprofile } = data;

        setProfileData({
          name:
            `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "N/A",
          email: user.email ?? "N/A",
          phone: userprofile.phone ?? "N/A",
          gender:
            userprofile.gender === "M"
              ? "Male"
              : userprofile.gender === "F"
                ? "Female"
                : userprofile.gender === "T"
                  ? "Other"
                  : "N/A",
          college: userprofile.college || "N/A",
          year: userprofile.current_year ?? "N/A",
          passType: userprofile.pass_type_details?.name ?? "None",
          passId: userprofile.registration_code ?? "—",
          isGold: userprofile.is_gold,
          isCA: userprofile.is_ca,
          qrCodeHtml: userprofile.qr_code,
        });

        setEventsRegistered(userprofile.events || []);
      } catch (err) {
        console.error("Profile error:", err);
        clearAuthCookies();
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePassClick = () => setIsFlipped(!isFlipped);

  if (loading) {
    return (
      <div className="profile-container">
        <div style={{ color: "#fff", textAlign: "center", marginTop: 120 }}>
          Loading profile…
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-container">
        <div style={{ color: "#fff", textAlign: "center", marginTop: 120 }}>
          Unable to load profile.
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <img src={profileBg} alt="Profile Background" className="profile-bg" />

      <div className="profile-content">
        {/* Hero */}
        <div className="profile-hero animate-slide-up">
          <div className="avatar-container">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.email}`}
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
          <h1 className="profile-name">{profileData.name}</h1>
          <p className="profile-university">{profileData.college}</p>

          {profileData.isGold && (
            <span className="badge badge-gold">Gold Pass</span>
          )}
          {profileData.isCA && (
            <span className="badge badge-ca">Campus Ambassador</span>
          )}
        </div>

        <div className="profile-grid">
          {/* Personal Details */}
          <div className="glass-card details-card animate-slide-up delay-200">
            <h2>Personal Details</h2>
            <div className="details-list">
              <Detail label="Email" value={profileData.email} />
              <Detail label="Phone" value={profileData.phone} />
              <Detail label="Gender" value={profileData.gender} />
              <Detail label="College" value={profileData.college} />
              <Detail label="Year" value={profileData.year} />
            </div>
          </div>

          {/* Digital Pass */}
          <div
            className={`pass-card-container animate-slide-up delay-300 ${
              isFlipped ? "flipped" : ""
            }`}
            onClick={handlePassClick}
          >
            <div className="pass-card-inner">
              {/* Front */}
              <div className="pass-card-front">
                <div className="glass-card profile-pass-card">
                  <h2>Digital Pass</h2>
                  <div className="digital-pass">
                    <div className="pass-info">
                      <span className="pass-type">{profileData.passType}</span>
                      <span className="pass-id">ID: {profileData.passId}</span>
                    </div>
                    <div
                      className="qr-placeholder"
                      dangerouslySetInnerHTML={{
                        __html: profileData.qrCodeHtml,
                      }}
                    />
                  </div>
                  <p className="pass-hint">
                    Tap to view details • Present at entry
                  </p>
                </div>
              </div>

              {/* Back */}
              <div className="pass-card-back glass-card">
                <h2>Pass Details</h2>
                <p>
                  <strong>Holder:</strong> {profileData.name}
                </p>
                <p>
                  <strong>Pass Type:</strong> {profileData.passType}
                </p>
                <p>
                  <strong>Registration ID:</strong> {profileData.passId}
                </p>
                <p className="pass-note">
                  Non-transferable • Carry valid ID proof
                </p>
                <p className="flip-back">Tap to flip back</p>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="glass-card journey-card animate-slide-up delay-400">
            <h2>Your Events ({eventsRegistered.length})</h2>
            {eventsRegistered.length > 0 ? (
              <div className="events-grid">
                {eventsRegistered.map((event, idx) => (
                  <div key={idx} className="event-item event-card">
                    {event}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "#aaa" }}>
                No events registered yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value || "N/A"}</span>
    </div>
  );
}
