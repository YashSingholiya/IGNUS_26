import React from "react";
import "../css/Events.css";

function Events() {
  return (
    <div>
      <div className="cultural">
        <div className="cultural-bg">
            <img  className="cultural-image" src="/images/cultural.svg" alt="Cultural Background" />
            <div className="cult">
                <img className="cult-image" src="/images/cult-mask.svg" alt="Cultural Icon" />
            </div>
            <div className="left-decoration">
                <img className="left-decor-image" src="/images/decoration-left.svg" alt="Left Decoration" />
            </div>
            <div className="right-decoration">
                <img className="right-decor-image" src="/images/decoration-right.svg" alt="Right Decoration" />
            </div>
        </div>
      </div>
      {/* Other sections untouched */}
      <div className="informal"></div>
      <div className="pronite"></div>
      <div className="flagship"></div>
      <div className="online"></div>
    </div>
  );
}

export default Events;
