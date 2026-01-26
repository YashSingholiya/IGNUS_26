import React, { useRef, useState, useEffect } from "react";
import nritya from "./images/dance.jpeg";
import music from "./images/music.jpg";
import art from "./images/art.jpg";
import lit from "./images/Lit.jpg";
import LifeStyle from "./images/LifeStyle.jpg";
import drama from "./images/drama.jpg";
import antarang from "./images/antarang.jpeg";
import dance from "./images/nritya.jpeg";
import clash from "./images/clash.jpeg";
import aayam from "./images/aayam.jpeg";
import tshirt from "./images/tshirt.jpg";
import pottery from "./images/pottery.jpg";
import "./Events.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getAccessToken = () => {
  return localStorage.getItem("access");
};

const isLoggedIn = () => {
  return !!getAccessToken();
};

function Events() {
  const navigate = useNavigate();
  const CATEGORY_TYPE_MAP = {
    CULTURAL: "1",
    FLAGSHIP: "4",
    INFORMAL: null, // handled separately
  };
  // ---------- MODAL STATE ----------
  const [backendEvents, setBackendEvents] = useState([]);
  const [modalEvents, setModalEvents] = useState([]);
  const [selectedBackendEvent, setSelectedBackendEvent] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/events/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ EVENTS FROM BACKEND:", data);
        setBackendEvents(data);
      })
      .catch(() => toast.error("Failed to load events"));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ---------- INFORMAL EVENTS DATA ----------
  const CulturalArray = [
    {
      name: "DANCE",
      venue: "TBA",
      date: "TBA",
      image: dance,
    },
    {
      name: "MUSIC",
      venue: "TBA",
      date: "TBA",
      image: music,
    },
    {
      name: "QUIZ",
      venue: "TBA",
      date: "TBA",
      image:
        "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
    },
    {
      name: "ART",
      venue: "TBA",
      date: "TBA",
      image: art,
    },
    {
      name: "LITERATURE",
      venue: "TBA",
      date: "TBA",
      image: lit,
    },
    {
      name: "FILM MAKING",
      venue: "TBA",
      date: "TBA",
      image:
        "https://rsace.edu.in/wp-content/uploads/2025/01/1d2e74e09ff27f72a1c97f462e8f79e9.png",
    },
    {
      name: "LIFESTYLE",
      venue: "TBA",
      date: "TBA",
      image: LifeStyle,
    },
    {
      name: "DRAMA",
      venue: "TBA",
      date: "TBA",
      image: drama,
    },
  ];

  const FlagshipArray = [
    {
      name: "ANTARANG",
      venue: "TBA",
      date: "TBA",
      image: antarang,
    },
    {
      name: "NRITYANSH",
      venue: "TBA",
      date: "TBA",
      image: nritya,
    },
    {
      name: "CLASH OF BANDS",
      venue: "TBA",
      date: "TBA",
      image: clash,
    },
    {
      name: "AAYAAM",
      venue: "TBA",
      date: "TBA",
      image: aayam,
    },
  ];

  const InformalsArray = [
    {
      name: "PROM NIGHT",
      venue: "TBA",
      date: "TBA",
      image:
        "https://ilead.net.in/wp-content/uploads/2023/02/prom_night_2023_16.jpg",
    },
    {
      name: "CUSTOMIZED T-SHIRT",
      venue: "TBA",
      date: "TBA",
      image: tshirt,
    },
    {
      name: "CARICATURE",
      venue: "TBA",
      date: "TBA",
      image:
        "https://www.shutterstock.com/image-photo/firenze-italy-09-july-2024-600nw-2496659593.jpg",
    },
    {
      name: "BONFIRE & MOVIE NIGHT",
      venue: "TBA",
      date: "TBA",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCWAn03mhVoHwm-hkdnMQ_-KO2crJhyySbdoNBAyaHDvX96HjIT4WQqAylVmnrbwun-XluCVQedPxddbwjonLpd68PjJdfKih86Fo-1v9Y3At7EMF2M7NCfPvpTAPlombGIrk-kSWqLpcN/s1600/20170303_214950-1612x1209.jpg",
    },
    {
      name: "POTTERY",
      venue: "TBA",
      date: "TBA",
      image: pottery,
    },
    {
      name: "TAROT CARD",
      venue: "TBA",
      date: "TBA",
      image: "https://miro.medium.com/v2/resize:fit:1400/0*kZnuhdKFV1IbSP_3",
    },
    {
      name: "KARAOKE",
      venue: "TBA",
      date: "TBA",
      image: "https://wallpapercave.com/wp/wp12329107.jpg",
    },
    {
      name: "DANCE WORKSHOP",
      venue: "TBA",
      date: "TBA",
      image:
        "https://w0.peakpx.com/wallpaper/943/50/HD-wallpaper-music-and-dance-and-dance-music.jpg",
    },
    {
      name: "FOOD EATING COMPETITION",
      venue: "TBA",
      date: "TBA",
      image:
        "https://c4.wallpaperflare.com/wallpaper/741/599/723/pizza-food-vegetables-fruit-wallpaper-preview.jpg",
    },
    {
      name: "OPEN MIC (KAVI SAMMELAN)",
      venue: "TBA",
      date: "TBA",
      image: "https://devizine.com/wp-content/uploads/2024/09/openmic.jpg",
    },
  ];

  // ---------- GOOGLE FORM LINKS (ONLINE ONLY) ----------
  const onlineEventLinks = {
    "Mr & Miss IGNUS":
      "https://docs.google.com/forms/d/e/1FAIpQLScXnEU0fUd3esXfza4N1jvVoxFZ_SfWHOsewS61r7ywZURYJQ/viewform?usp=sharing",
    "DIGITAL ART":
      "https://docs.google.com/forms/d/e/1FAIpQLSfLbvYluONmCZ__EoUuv0Nc_1USXH5QSte-5TyGOYchBrsKeQ/viewform",
    DUBSMASH:
      "https://docs.google.com/forms/d/e/1FAIpQLSeqF1_Zmpn7JSblNgCAfmSYySp4Vf7tSJJSysR0hxgEirVRbg/viewform",
    PHOTOGRAPHY:
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
  function handleEventClick(categoryName, category) {
    if (category === "PRONITE") return;

    const typeCode = CATEGORY_TYPE_MAP[category];

    let filtered = [];

    if (typeCode) {
      filtered = backendEvents.filter((e) => String(e.event_type) === typeCode);
    }

    if (filtered.length === 0) {
      toast.info("Events will be announced soon");
      return;
    }

    setModalEvents(filtered);
    setSelectedBackendEvent(null);
    setIsModalOpen(true);
  }

  const handleRegister = async () => {
    const token = getAccessToken();

    if (!token) {
      toast.info("Please login to register for events");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    if (!selectedBackendEvent) {
      toast.error("Please select an event");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            event_name: selectedBackendEvent.name,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Backend sends plain strings sometimes
        if (typeof data === "string") {
          toast.error(data);
        } else if (data.Message) {
          toast.error(data.Message);
        } else {
          toast.error("Registration failed");
        }
        return;
      }

      // SUCCESS
      toast.success(data.Message || "Event registered successfully 🎉");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later");
    }
  };

  // Get event data for modal
  function getEventData() {
    if (!selectedEvent) return null;

    if (selectedEvent.category === "INFORMAL") {
      return InformalsArray.find(
        (event) => event.name === selectedEvent.eventName,
      );
    }

    if (selectedEvent.category === "CULTURAL") {
      return CulturalArray.find(
        (event) => event.name === selectedEvent.eventName,
      );
    }

    if (selectedEvent.category === "FLAGSHIP") {
      return FlagshipArray.find(
        (event) => event.name === selectedEvent.eventName,
      );
    }

    return null;
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
    <div className="events-page">
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
          {InformalsArray.map((event) => (
            <button
              key={event.name}
              className="event-item"
              onClick={() => handleEventClick(event.name, "INFORMAL")}
            >
              {event.name}
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
          {["ANTARANG", "NRITYANSH", "CLASH OF BANDS", "AAYYAM"].map(
            (event) => (
              <button
                key={event}
                className="event-item"
                onClick={() => handleEventClick(event, "FLAGSHIP")}
              >
                {event}
              </button>
            ),
          )}
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
        {["CULTURAL", "INFORMAL", "PRONITE", "FLAGSHIP", "ONLINE"].map(
          (tab) => (
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
          ),
        )}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            {!selectedBackendEvent ? (
              <>
                <h2>Select Event</h2>
                <div className="modal-event-list">
                  {modalEvents.map((ev) => (
                    <button
                      key={ev.id}
                      className="event-item"
                      onClick={() => setSelectedBackendEvent(ev)}
                    >
                      {ev.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="modal-content">
                <div className="modal-left">
                  <img
                    src={selectedBackendEvent.cover}
                    alt={selectedBackendEvent.name}
                    className="modal-event-image"
                  />
                </div>

                <div className="modal-right">
                  <h2>{selectedBackendEvent.name}</h2>
                  <p>{selectedBackendEvent.about}</p>

                  <button
                    className="modal-register-btn"
                    onClick={handleRegister}
                  >
                    {isLoggedIn() ? "REGISTER" : "LOGIN TO REGISTER"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
