import React from "react";
import "../css/Events.css";

function Events() {
  return (
    <div>
      <div className="cultural">
        <div className="cultural-bg">
          <img
            className="cultural-image"
            src="/images/cultural.svg"
            alt="Cultural Background"
          />
          <div className="cult">
            <img
              className="cult-image"
              src="/images/cult-mask.svg"
              alt="Cultural Icon"
            />
          </div>
          <div className="left-decoration">
            <img
              className="left-decor-image"
              src="/images/decoration-left.svg"
              alt="Left Decoration"
            />
          </div>
          <div className="right-decoration">
            <img
              className="right-decor-image"
              src="/images/decoration-right.svg"
              alt="Right Decoration"
            />
          </div>
          <div className="cult-wrapper">
            <div className="cult-heading">CULTURAL</div>

            <div className="cult-subheading-wrapper">
              <span className="line"></span>
              <div className="cult-subheading">IGNUS’26</div>
              <span className="line"></span>
            </div>
          </div>
          <div className="cult-events">
            <div className="event-item">Dance</div>
            <div className="event-item">Music</div>
            <div className="event-item">Drama</div>
            <div className="event-item">Literary Arts</div>
            <div className="event-item">Fine Arts</div>
            <div className="event-item">Fashion</div>
          </div>
        </div>
      </div>
      <div className="informal">
        <div className="informal-bg">
          <img
            className="informal-image"
            src="/images/informal.svg"
            alt="Informal Background"
          />
        </div>
        <div className="informal-mask">
          <img
            className="informal-mask-image"
            src="/images/informal-mask.svg"
            alt="Informal Icon"
          />
        </div>
        <div className="informal-wrapper">
          <div className="informal-heading">INFORMAL</div>

          <div className="informal-subheading-wrapper">
            <span className="line"></span>
            <div className="informal-subheading">IGNUS’26</div>
            <span className="line"></span>
          </div>
        </div>
        <div className="informal-events">
          <div className="event-item">Dance</div>
          <div className="event-item">Music</div>
          <div className="event-item">Drama</div>
          <div className="event-item">Literary Arts</div>
          <div className="event-item">Fine Arts</div>
          <div className="event-item">Fashion</div>
        </div>
      </div>
      <div className="pronite">
        <div className="pronite-bg">
          <img
            className="pronite-image"
            src="/images/pronite.svg"
            alt="Pronite Background"
          />
        </div>
        <div className="pronite-wrapper">
          <div className="pronite-heading">PRONITE</div>

          <div className="pronite-subheading-wrapper">
            <span className="line"></span>
            <div className="pronite-subheading">IGNUS’26</div>
            <span className="line"></span>
          </div>
        </div>
        <div className="pronite-events">
          COMING SOON...
        </div>
      </div>
      <div className="flagship">
        <div className="flagship-bg">
          <img
            className="flagship-image"
            src="/images/flagship.svg"
            alt="Flagship Background"
          />
        </div>
        <div className="flagship-mask">
          <img
            className="flagship-mask-image"
            src="/images/flagship-mask.svg"
            alt="Flagship Icon"
          />
        </div>
        <div className="flagship-wrapper">
          <div className="flagship-heading">FLAGSHIP</div>
          <div className="flagship-subheading-wrapper">
            <span className="line"></span>
            <div className="flagship-subheading">IGNUS’26</div>
            <span className="line"></span>
          </div>
        </div>
        <div className="flagship-events">
          <div className="event-item">Bands Battle</div>
          <div className="event-item">DJ Night</div>
          <div className="event-item">Fashion Show</div>
          <div className="event-item">Street Dance</div>
        </div>
      </div>
      <div className="online">
        <div className="online-bg">
          <img
            className="online-image"
            src="/images/online.svg"
            alt="Online Background"
          />
        </div>
        <div className="online-mask">
          <img
            className="online-mask-image"
            src="/images/online-mask.svg"
            alt="Online Icon"
          />
        </div>
        <div className="online-wrapper">
          <div className="online-heading">ONLINE</div>
          <div className="online-subheading-wrapper">
            <span className="line"></span>
            <div className="online-subheading">IGNUS’26</div>
            <span className="line"></span>
          </div>
        </div>
        <div className="online-events">
          <div className="event-item">E-Sports</div>
          <div className="event-item">Quizzes</div>
          <div className="event-item">Treasure Hunt</div>
          <div className="event-item">Arts</div>
          <div className="event-item">Coding</div>
          <div className="event-item">Workshops</div>
        </div>
      </div>
    </div>
  );
}

export default Events;
