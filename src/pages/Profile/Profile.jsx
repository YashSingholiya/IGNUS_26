import React from "react";
import Navbar from "../../components/navbar/Navbar";
import profileBg from "./assets/profile.png";
import "./Profile.css";

export default function Profile() {
  // Placeholder data
  const profileData = {
    name: "John Doe",
    phoneNumber: "+91 9876543210",
    emailId: "johndoe@example.com",
    universityName: "IIT Jodhpur",
    gender: "Male",
    passType: "Pro Pass",
  };

  const eventsRegistered = ["Sample 1", "Sample 2"];

  return (
    <div className="profile">
      <img src={profileBg} alt="Profile Background" className="profile-bg" />
      <Navbar />
      
      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <h1 className="profile-title">PROFILE</h1>
          <div className="profile-fields font-rosiana">
            {/* Left Column */}
            <div className="profile-field">
              <span className="field-label">Name</span>
              <span className="field-value">{profileData.name}</span>
            </div>
            
            {/* Right Column */}
            <div className="profile-field">
              <span className="field-label">Phone Number</span>
              <span className="field-value">{profileData.phoneNumber}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Email Id</span>
              <span className="field-value">{profileData.emailId}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">University Name</span>
              <span className="field-value">{profileData.universityName}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Gender</span>
              <span className="field-value">{profileData.gender}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Pass type</span>
              <span className="field-value">{profileData.passType}</span>
            </div>
          </div>
        </div>
        
        {/* Events Registered Section */}
        <div className="events-section">
          <div className="events-header">
            <span>Events Registered:</span>
          </div>
          <div className="events-list">
            {eventsRegistered.map((event, index) => (
              <div key={index} className="event-item-profile">
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


