import React, { useRef, useState, useEffect } from "react";
import "./Events.css";

function Events() {
  // ---------- MODAL STATE ----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ---------- GOOGLE FORM LINKS (ONLINE ONLY) ----------
  const onlineEventLinks = {
    "Mr & Miss IGNUS":
      "https://docs.google.com/forms/d/e/1FAIpQLScXnEU0fUd3esXfza4N1jvVoxFZ_SfWHOsewS61r7ywZURYJQ/viewform?usp=sharing",
    "DIGITAL ART":
      "https://docs.google.com/forms/d/e/1FAIpQLSfLbvYluONmCZ__EoUuv0Nc_1USXH5QSte-5TyGOYchBrsKeQ/viewform",
    "DUBSMASH":
      "https://docs.google.com/forms/d/e/1FAIpQLSeqF1_Zmpn7JSblNgCAfmSYySp4Vf7tSJJSysR0hxgEirVRbg/viewform",
    "PHOTOGRAPHY":
      "https://docs.google.com/forms/d/e/1FAIpQLSfzLbnGBnPWv3bkYQCug_09v_0AiKf3qch7VL-JUTVZjmgqCg/viewform",
    "SHORT MOVIE":
      "https://docs.google.com/forms/d/e/1FAIpQLSezdNUGZcXi9wXeXGMLNPJsSZ_4zy7ABBvevB8kk-7VWsLW2Q/viewform",
    "MEME MAKING":
      "https://docs.google.com/forms/d/e/1FAIpQLSdyfPp2n4az6gJp1AaDlfHWmF_exMeC0G0Njz6KK12ujSSx8A/viewform",
    "PHOTOSHOP BATTLE":
      "https://docs.google.com/forms/d/e/1FAIpQLScNJ3pMvjVLSMD6lDYATTMFtJc_Hx4sIr6Mk6aG9hVOWBDe7w/viewform",
    "CREATIVE WRITING":
      "https://docs.google.com/forms/d/e/1FAIpQLSc4t6YGLGDQtUKXznmAj5v8jW4iH7kqkb0FPVnak2MaK3_Lvw/viewform",
    "REEL MAKING":
      "https://docs.google.com/forms/d/e/1FAIpQLSfJ_ZPtMYeDVouqL2WHU4Sz2BLKcgtujCrgOKSzXK4wR2r8Yg/viewform",
    "PHOTOGRAPHY at IITJ":
      "https://docs.google.com/forms/d/e/1FAIpQLSfzLbnGBnPWv3bkYQCug_09v_0AiKf3qch7VL-JUTVZjmgqCg/viewform",
  };

  // ---------- MODAL FUNCTIONS ----------
  function openModal(eventName, category) {
    setSelectedEvent({ eventName, category });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }

  // ---------- EVENT CLICK HANDLER ----------
  function handleEventClick(eventName, category) {
    // ONLINE → open Google Form directly
    // if (category === "ONLINE" && onlineEventLinks[eventName]) {
    //   window.open(onlineEventLinks[eventName], "_blank");
    //   return;
    // }

    // Others → open modal
    openModal(eventName, category);
  }

  // ---------- ACTIVE TAB ----------
  const [activeTab, setActiveTab] = useState("CULTURAL");

  // ---------- SCROLL REFS ----------
  const culturalRef = useRef(null);
  const informalRef = useRef(null);
  const proniteRef = useRef(null);
  const flagshipRef = useRef(null);
  const onlineRef = useRef(null);

  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  // ---------- SCROLL SPY ----------
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: culturalRef, name: "CULTURAL" },
        { ref: informalRef, name: "INFORMAL" },
        { ref: proniteRef, name: "PRONITE" },
        { ref: flagshipRef, name: "FLAGSHIP" },
        { ref: onlineRef, name: "ONLINE" },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          if (scrollPosition >= section.ref.current.offsetTop) {
            setActiveTab(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* ================= CULTURAL ================= */}
      <div ref={culturalRef} className="cultural">
        <div className="cultural-bg">
          <img className="cultural-image" src="/images/cultural.svg" alt="" />

          <div className="cult">
            <img className="cult-image" src="/images/cult-mask.svg" alt="" />
          </div>

          <div className="left-decoration">
            <img src="/images/decoration-left.svg" alt="" />
          </div>

          <div className="right-decoration">
            <img src="/images/decoration-right.svg" alt="" />
          </div>

          <div className="cult-wrapper">
            <div className="cult-heading">CULTURAL</div>
            <div className="cult-subheading-wrapper">
              <span className="line"></span>
              <div className="cult-subheading">IGNUS'26</div>
              <span className="line"></span>
            </div>
          </div>

          <div className="cult-events">
            {[
              "DANCE",
              "MUSIC",
              "QUIZ",
              "ART",
              "LITERATURE",
              "FILM MAKING",
              "LIFESTYLE",
              "DRAMA",
            ].map((event) => (
              <button
                key={event}
                className="event-item"
                onClick={() => handleEventClick(event, "CULTURAL")}
              >
                {event}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= INFORMAL ================= */}
      <div ref={informalRef} className="informal">
        <div className="informal-bg">
          <img src="/images/informal.svg" alt="" />
        </div>

        <div className="informal-mask">
          <img src="/images/informal-mask.svg" alt="" />
        </div>

        <div className="informal-wrapper">
          <div className="informal-heading">INFORMAL</div>
          <div className="informal-subheading-wrapper">
            <span className="line"></span>
            <div className="informal-subheading">IGNUS'26</div>
            <span className="line"></span>
          </div>
        </div>

        <div className="informal-events">
          {[
            "PROM NIGHT",
            "CUSTOMIZED T-SHIRT",
            "CARICATURE",
            "BONFIRE & MOVIE NIGHT",
            "POTTERY",
            "TAROT CARD",
            "KARAOKE",
            "DANCE WORKSHOP",
            "FOOD EATING COMPETITION",
            "OPEN MIC (KAVI SAMMELAN)",
          ].map((event) => (
            <button
              key={event}
              className="event-item"
              onClick={() => handleEventClick(event, "INFORMAL")}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRONITE ================= */}
      <div ref={proniteRef} className="pronite">
        <div className="pronite-bg">
          <img src="/images/pronite.svg" alt="" />
        </div>

        <div className="pronite-wrapper">
          <div className="pronite-heading">PRONITE</div>
          <div className="pronite-subheading-wrapper">
            <span className="line"></span>
            <div className="pronite-subheading">IGNUS'26</div>
            <span className="line"></span>
          </div>
        </div>

        <div className="pronite-events">
          <button
            className="event-item"
            onClick={() => handleEventClick("Pronite", "PRONITE")}
          >
            Coming Soon...
          </button>
        </div>
      </div>

      {/* ================= FLAGSHIP ================= */}
      <div ref={flagshipRef} className="flagship">
        <div className="flagship-bg">
          <img src="/images/flagship.svg" alt="" />
        </div>

        <div className="flagship-mask">
          <img src="/images/flagship-mask.svg" alt="" />
        </div>

        <div className="flagship-wrapper">
          <div className="flagship-heading">FLAGSHIP</div>
          <div className="flagship-subheading-wrapper">
            <span className="line"></span>
            <div className="flagship-subheading">IGNUS'26</div>
            <span className="line"></span>
          </div>
        </div>

        <div className="flagship-events">
          {["ANTARANG", "NRITYANSH", "THUNDERBEATS", "AAYYAM"].map((event) => (
            <button
              key={event}
              className="event-item"
              onClick={() => handleEventClick(event, "FLAGSHIP")}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      {/* ================= ONLINE ================= */}
      <div ref={onlineRef} className="online">
        <div className="online-bg">
          <img src="/images/online.svg" alt="" />
        </div>

        <div className="online-mask">
          <img src="/images/online-mask.svg" alt="" />
        </div>

        <div className="online-wrapper">
          <div className="online-heading">ONLINE</div>
          <div className="online-subheading-wrapper">
            <span className="line"></span>
            <div className="online-subheading">IGNUS'26</div>
            <span className="line"></span>
          </div>
        </div>

        <div className="online-events">
          {Object.keys(onlineEventLinks).map((event) => (
            <button
              key={event}
              className="event-item"
              onClick={() => handleEventClick(event, "ONLINE")}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      {/* ================= FOOTER TABS ================= */}
      <div className="events-footer">
        {["CULTURAL", "INFORMAL", "PRONITE", "FLAGSHIP", "ONLINE"].map((tab) => (
          <button
            key={tab}
            className={`footer-btn ${tab.toLowerCase()} ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "CULTURAL") scrollTo(culturalRef);
              else if (tab === "INFORMAL") scrollTo(informalRef);
              else if (tab === "PRONITE") scrollTo(proniteRef);
              else if (tab === "FLAGSHIP") scrollTo(flagshipRef);
              else scrollTo(onlineRef);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <h2>{selectedEvent.eventName}</h2>
            <p>{selectedEvent.category} EVENT</p>

            <p>
              Details for this event will be announced soon.
              Stay tuned for IGNUS'26 🎉
            </p>

            <button className="modal-action-btn">Coming Soon</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
