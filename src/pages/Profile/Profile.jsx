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
  const [teamLeader, setTeamLeader] = useState({}); // Store leader info per team
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

  // Fetch team leader info for all events after profile loads
  useEffect(() => {
    if (eventsRegistered.length > 0) {
      eventsRegistered.forEach(async (event) => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/events/team-details/?team_id=${event.team_id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await res.json();
          if (res.ok && data.team) {
            setTeamMembers((prev) => ({
              ...prev,
              [event.team_id]: data.team.members,
            }));
            setTeamLeader((prev) => ({
              ...prev,
              [event.team_id]: data.team.leader,
            }));
          }
        } catch (err) {
          console.error("Error fetching team details for event:", event.team_id, err);
        }
      });
    }
  }, [eventsRegistered]);

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
          method: "POST",
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

  // Fetch team details when modal opens
  useEffect(() => {
    if (viewTeamModal.open && viewTeamModal.teamId) {
      const fetchTeamDetails = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/events/team-details/?team_id=${viewTeamModal.teamId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await res.json();
          if (res.ok && data.team) {
            setTeamMembers((prev) => ({
              ...prev,
              [viewTeamModal.teamId]: data.team.members,
            }));
            setTeamLeader((prev) => ({
              ...prev,
              [viewTeamModal.teamId]: data.team.leader,
            }));
          }
        } catch (err) {
          console.error("Error fetching team details:", err);
        }
      };
      fetchTeamDetails();
    }
  }, [viewTeamModal.open, viewTeamModal.teamId]);

  // Handle removing a member from the team
  const handleRemoveMember = async (teamId, memberIgnusId) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    console.log("Removing member:", { teamId, memberIgnusId });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/update-team/remove-member/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team_id: teamId,
            member: memberIgnusId,
          }),
        }
      );

      console.log("Remove member response status:", res.status);
      const data = await res.json();
      console.log("Remove member response data:", data);

      if (res.ok) {
        // Success - update local state with data from response
        if (data.team && data.team.members) {
          setTeamMembers((prev) => ({
            ...prev,
            [teamId]: data.team.members,
          }));
        } else {
          setTeamMembers((prev) => ({
            ...prev,
            [teamId]: prev[teamId].filter((m) => (m.ignus_id || m) !== memberIgnusId),
          }));
        }
        alert(data.message || "Member removed successfully");
      } else {
        alert(data.message || data || "Failed to remove member");
      }
    } catch (err) {
      console.error("Remove member error:", err);
      alert("Network error. Please try again.");
    }
  };

  // Handle de-registering self from the team
  const handleDeregister = async (teamId, eventName) => {
    if (!confirm("Are you sure you want to leave this team?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/deregister/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name: eventName,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Success - remove from local events list
        setEventsRegistered((prev) => prev.filter((e) => e.team_id !== teamId));
        alert("You have left the team successfully.");
      } else {
        alert(data.message || data || "Failed to leave the team.");
      }
    } catch (err) {
      console.error("Deregister error:", err);
      alert("Network error. Please try again.");
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
                        {/* Add Member (Leader) or De-register (Member) */}
                        {teamLeader[event.team_id]?.id === profileData.passId ? (
                          <button
                            className="add-member-toggle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAddMember(event.team_id);
                            }}
                          >
                            {expandedEventId === event.team_id ? '✕ Cancel' : '+ Add Member'}
                          </button>
                        ) : (
                          <button
                            className="de-register-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeregister(event.team_id, event.name);
                            }}
                          >
                            🚪 Leave Team
                          </button>
                        )}
                      </div>
                    </div>


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

        {viewTeamModal.open && (
          <div className="modal-overlay" onClick={() => setViewTeamModal({ open: false, teamId: null, eventName: '' })}>
            <div className="modal-content glass-card team-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Team Members</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setViewTeamModal({ open: false, teamId: null, eventName: '' })}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-event-name">{viewTeamModal.eventName || 'Event'}</p>
                <p className="modal-team-id">Team ID: <span>{viewTeamModal.teamId}</span></p>

                <div className="modal-members-list">
                  {/* Leader First */}
                  {teamLeader[viewTeamModal.teamId] && (
                    <div className="modal-member-item glass-card leader-item">
                      <div className="member-info">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teamLeader[viewTeamModal.teamId].name}`}
                          alt="Leader Avatar"
                          className="member-avatar-img"
                        />
                        <div className="member-details">
                          <span className="member-name">
                            {teamLeader[viewTeamModal.teamId].name}
                            <span className="leader-badge">Leader</span>
                          </span>
                          <span className="member-id">{teamLeader[viewTeamModal.teamId].id}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Other Members */}
                  {teamMembers[viewTeamModal.teamId] && teamMembers[viewTeamModal.teamId].length > 0 ? (
                    teamMembers[viewTeamModal.teamId].map((member, idx) => (
                      <div key={idx} className="modal-member-item glass-card">
                        <div className="member-info">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email || member.name || member}`}
                            alt="Avatar"
                            className="member-avatar-img"
                          />
                          <div className="member-details">
                            <span className="member-name">{member.name || member}</span>
                            <span className="member-id">{member.ignus_id || ""}</span>
                          </div>
                        </div>
                        {/* Only show remove button if current user is the leader AND the member being removed is not the leader */}
                        {teamLeader[viewTeamModal.teamId]?.id === profileData.passId && (member.ignus_id || member) !== profileData.passId && (
                          <button
                            className="remove-member-btn"
                            onClick={() => handleRemoveMember(viewTeamModal.teamId, member.ignus_id || member)}
                            title="Remove Member"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>No other team members yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
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
