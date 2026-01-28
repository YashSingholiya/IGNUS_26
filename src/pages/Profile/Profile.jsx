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

  // Add Member feature state
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [memberIgnusId, setMemberIgnusId] = useState("");
  const [addMemberLoading, setAddMemberLoading] = useState(false);
  const [addMemberMessage, setAddMemberMessage] = useState({ type: "", text: "" });
  const [teamMembers, setTeamMembers] = useState({});
  const [viewTeamModal, setViewTeamModal] = useState({ open: false, teamId: null, eventName: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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

        console.log("Profile data:", data);
        const { user, userprofile } = data;
        console.log("Events:", userprofile.events);

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

  // Toggle the add member form for an event
  const toggleAddMember = (teamId) => {
    if (expandedEventId === teamId) {
      setExpandedEventId(null);
      setMemberIgnusId("");
      setAddMemberMessage({ type: "", text: "" });
    } else {
      setExpandedEventId(teamId);
      setMemberIgnusId("");
      setAddMemberMessage({ type: "", text: "" });
    }
  };

  // Handle adding a member to the team
  const handleAddMember = async (teamId) => {
    if (!memberIgnusId.trim()) {
      setAddMemberMessage({ type: "error", text: "Please enter an Ignus ID" });
      return;
    }

    setAddMemberLoading(true);
    setAddMemberMessage({ type: "", text: "" });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/update-team/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team_id: teamId,
            member: memberIgnusId.trim(),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Success - update local state
        setAddMemberMessage({ type: "success", text: data.message });
        setMemberIgnusId("");

        // Update team members display
        if (data.team && data.team.members) {
          setTeamMembers((prev) => ({
            ...prev,
            [teamId]: data.team.members,
          }));
        }
      } else if (res.status === 403) {
        setAddMemberMessage({ type: "error", text: "You are not the team leader" });
      } else if (res.status === 404) {
        setAddMemberMessage({ type: "error", text: "The Ignus ID you entered does not exist" });
      } else if (res.status === 402) {
        setAddMemberMessage({ type: "error", text: data || "Member has not completed payment" });
      } else if (res.status === 406) {
        setAddMemberMessage({ type: "error", text: data.message || data || "Cannot add member" });
      } else {
        setAddMemberMessage({ type: "error", text: "Something went wrong" });
      }
    } catch (err) {
      console.error("Add member error:", err);
      setAddMemberMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setAddMemberLoading(false);
    }
  };

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
            className={`pass-card-container animate-slide-up delay-300 ${isFlipped ? "flipped" : ""
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
              <div className="events-list">
                {eventsRegistered.map((event, idx) => (
                  <div
                    key={event.team_id}
                    className={`event-list-item ${expandedEventId === event.team_id ? 'expanded' : ''}`}
                  >
                    <div className="event-header">
                      <div className="event-info">
                        <h4 className="event-title">{event.name || 'Event'}</h4>
                        <p className="event-team-id">Team ID: <span>{event.team_id}</span></p>
                      </div>
                      <div className="event-actions">
                        {/* View Team Button */}
                        <button
                          className="view-team-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewTeamModal({ open: true, teamId: event.team_id, eventName: event.name });
                          }}
                        >
                          👥 View Team
                        </button>
                        {/* Add Member Button */}
                        <button
                          className="add-member-toggle-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAddMember(event.team_id);
                          }}
                        >
                          {expandedEventId === event.team_id ? '✕ Cancel' : '+ Add Member'}
                        </button>
                      </div>
                    </div>

                    {/* Team Members Display (after successful add) */}
                    {teamMembers[event.team_id] && teamMembers[event.team_id].length > 0 && (
                      <div className="team-members-inline">
                        {teamMembers[event.team_id].map((member, mIdx) => (
                          <span key={mIdx} className="team-member-chip">
                            {member.name || member}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Add Member Form */}
                    {expandedEventId === event.team_id && (
                      <div className="add-member-section">
                        <div className="add-member-form-row">
                          <input
                            type="text"
                            className="add-member-input"
                            placeholder="Enter Ignus ID"
                            value={memberIgnusId}
                            onChange={(e) => setMemberIgnusId(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddMember(event.team_id);
                            }}
                            disabled={addMemberLoading}
                          />
                          <button
                            className="add-member-btn"
                            onClick={() => handleAddMember(event.team_id)}
                            disabled={addMemberLoading}
                          >
                            {addMemberLoading ? 'Adding...' : 'Add'}
                          </button>
                        </div>

                        {/* Feedback Message */}
                        {addMemberMessage.text && (
                          <p className={`member-message ${addMemberMessage.type}`}>
                            {addMemberMessage.text}
                          </p>
                        )}
                      </div>
                    )}
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

        {/* View Team Modal */}
        {viewTeamModal.open && (
          <div className="modal-overlay" onClick={() => setViewTeamModal({ open: false, teamId: null, eventName: '' })}>
            <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Team Members</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setViewTeamModal({ open: false, teamId: null, eventName: '' })}
                >
                  ✕
                </button>
              </div>
              <p className="modal-event-name">{viewTeamModal.eventName || 'Event'}</p>
              <p className="modal-team-id">Team ID: {viewTeamModal.teamId}</p>

              <div className="modal-members-list">
                {teamMembers[viewTeamModal.teamId] && teamMembers[viewTeamModal.teamId].length > 0 ? (
                  teamMembers[viewTeamModal.teamId].map((member, idx) => (
                    <div key={idx} className="modal-member-item">
                      <span className="member-avatar">👤</span>
                      <span className="member-name">{member.name || member}</span>
                    </div>
                  ))
                ) : (
                  <p className="modal-no-members">No team members added yet. Add members using the "Add Member" button.</p>
                )}
              </div>
            </div>
          </div>
        )}
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
