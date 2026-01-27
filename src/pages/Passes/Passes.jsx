import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Logo from "../../assets/logo.svg";
import "./Passes.css";
import {
  isLoggedIn,
  isProfileComplete,
} from "../../utils/cookies";


// Helper component for individual pass cards
const PassCard = ({ variant, title, subtitle, price }) => {
  return (
    <div className={`pass-card ${variant}`}>
      <div className="pass-card-header">
        <h3 className="pass-title">{title}</h3>

      </div>

      <p className="pass-subtitle">{subtitle}</p>

      <div className="pass-footer">
        <span className="pass-price">Rs. {price}</span>
        <a className="pass-details-btn" href="https://drive.google.com/file/d/19yvdkVW2z-BazmIxRtbsKqKFy01wAZC5/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          <img src={Logo} className="details-icon"></img>
          <span>Details</span>
        </a>
      </div>
    </div>
  );
};

const passesData = [
  { id: 1, title: "Imperial Gold", subtitle: "Accomodation + Events + Gold Pronite Pass", price: "2799", variant: "gold" },
  { id: 3, title: "Royal Gold", subtitle: "Events + Gold Pronite Pass", price: "1199", variant: "gold" },
  { id: 5, title: "Gold Pronite Pass", subtitle: "Entry to Gold Pronite", price: "699", variant: "gold" },
  { id: 2, title: "Imperial Silver", subtitle: "Accomodation + Events + Silver Pronite Pass", price: "2599", variant: "silver" },
  { id: 4, title: "Royal Silver", subtitle: "Events + Silver Pronite Pass", price: "999", variant: "silver" },
  { id: 6, title: "Silver Pronite Pass", subtitle: "Entry to Silver Pronite", price: "499", variant: "silver" },
  { id: 7, title: "Executive Imperial", subtitle: "Discounted Imperial Gold Pass for executive Students", price: "2099", variant: "glass" },
  { id: 8, title: "Executive Royal", subtitle: "Discounted Royal Gold Pass for executive Students", price: "599", variant: "glass" },
  { id: 9, title: "Clash of Bands", subtitle: "Team Registration", price: "1799", variant: "glass" },
  { id: 10, title: "Group Dance", subtitle: "Team Registration", price: "1999", variant: "glass" },
  { id: 11, title: "Fashion Show", subtitle: "Team Registration", price: "2999", variant: "glass" },
  { id: 12, title: "Nukkad Natak", subtitle: "Team Registration", price: "1499", variant: "glass" }
];

export default function Passes() {
  const loggedIn = isLoggedIn();
  const profileComplete = isProfileComplete();


  return (
    <>

      <div className="passes-page">
        <div className="passes-bg-overlay"></div>

        <div className="passes-content">
          <h1 className="passes-heading">PASSES</h1>

          {/* 🔐 Buy Pass only for logged-in users */}
          {loggedIn && profileComplete ? (
            <a
              href="https://form.qfixonline.com/ignuspps"
              target="_blank"
              rel="noopener noreferrer"
              className="buy-pass-btn"
            >
              Buy Pass
            </a>
          ) : (
            <Link
              to="/login"
              className="buy-pass-btn login-required-btn"
            >
              Login to Buy Pass
            </Link>
          )}

          <div className="passes-grid">
            {passesData.map((pass) => (
              <PassCard
                key={pass.id}
                variant={pass.variant}
                title={pass.title}
                subtitle={pass.subtitle}
                price={pass.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
