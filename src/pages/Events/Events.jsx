import React, { useRef, useState, useEffect } from "react";
import "./Events.css";

function Events() {
  // ---------- MODAL STATE ----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ---------- INFORMAL EVENTS DATA ----------
  const CulturalArray = [
  {
    name: "DANCE",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/dance.jpg",
  },
  {
    name: "MUSIC",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/music.jpg",
  },
  {
    name: "QUIZ",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  },
  {
    name: "ART",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  },
  {
    name: "LITERATURE",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  },
  {
    name: "FILM MAKING",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  },
  {
    name: "LIFESTYLE",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  },
  {
    name: "DRAMA",
    venue: "TBA",
    date: "TBA",
    image: "/images/cultural/quiz.jpg",
  }
];

  const FlagshipArray = [
  {
    name: "ANTARANG",
    venue: "TBA",
    date: "TBA",
    image: "/images/flagship/antarang.jpg",
  },
  {
    name: "NRITYANSH",
    venue: "TBA",
    date: "TBA",
    image: "/images/flagship/nrityansh.jpg",
  },
  {
    name: "THUNDERBEATS",
    venue: "TBA",
    date: "TBA",
    image: "/images/flagship/thunderbeats.jpg",
  },
  {
    name: "AAYYAM",
    venue: "TBA",
    date: "TBA",
    image: "/images/flagship/aayyam.jpg",
  },
];

  const InformalsArray = [
    {
      name: "PROM NIGHT",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//178c297152454617/prom%20night.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=svRNxyrW~LXIoHX6rPY29ua7hsIwOBXSjbNVBn4DToRT4BN2L9de5CkNsRqQu90JJlHDScGbxxpCVO~O7tdFFHTLvNQ5JXvIe0tfm42IFCMgSp35RuMxRJvIPOYhulcJMeuEJF3UgxHdPMBWQczE-BhFxOf68GlGgL6GTyzKLk7O-1hzxfYMTkXdcEeDQe3hkZIqV-e8z2YGxWv-htezrtwSjwOT~WAKsOJ5M~RJ3o3ZQZW8-UA7dl2sM6vMyuYupTSR6thf3KX2LEGdnsIcjpMNc86UfeP~OtQOOh-nA-1jqLeNxXij~8g4S~bUUdeQHjq9iqPYydaRILon2qHhjA__",
    },
    {
      name: "CUSTOMIZED T-SHIRT",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//518e550e33a747d4/customized%20tshirt.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sRgJZD7kU6ilHtsmcjY6JJlb1P9BGC2lvd4wXDIA7leTHXtC3yyuHDIVTrGEA15gkGNeQEa1pOT1HBx1VNymBbzpQeekRoDoE-HX2bA379IF4XeM1CKQvanUZnaCad9gvLnDAjUwLJQvhrACXkh8mdoQuFhX6-PlHeE7nzXcvoZKEDHWTNj-OsJi~Ff2WCZ3SETHgbgYPY4wCYrOCMrKAKWW~vbOYs4FAgEOTsRg5W2JQiYU5~9QppTtcKM1WM6FhnL4wrZ8w6Cry8m3yUVZsNAz51mME0Byk1Hg2vXRuTM78MgRSA9Pqy8KkwiahkhEtrV7P1VNfAnpFhsjkeDhkQ__"
    },
    {
      name: "CARICATURE",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//a9ed22cfa03947f1/caricature.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WEgOmLMl~NYy-XQE5-KvhpkJ2Lvr00JP65HLarEv51Fg8zvcCAtzfDYjo6dTStR852Z6yMgJe5C~N65GqkkhWwz0L8CzC2unyZJtJE7tTo2h8~Kh284Uvx0jCnws6vMyBmCp8c0JcS78RZ77EYX7cC6AhWyK~WcL~pvnpz4M2AlwQ5ZDkVBvci57BxtgsehnpmVh50NuUrJPWk7pxYcRxfEGQIvoXH4Frmr5vwoycQGgnOm1RK2WQI63rObxj-jwr3VLN9n~DbSR9hfhj1L1dyG4u~n3gTzduqz9z2yVGZhgQ5M4wUS60xHWtkTmVapO6xeF5EO99z0CS9oDhJamCQ__"
    },
    {
      name: "BONFIRE & MOVIE NIGHT",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//efa3e58efbcd439d/bonfire.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=R0ezil7JV6rIml2J7cNSEXWtv5MN3DeHQfimPkmiJrxzHoKpiDniTBPOChytz0W5mCwstjnGVoYob8gKUrqlGMmkg6xIG4Ku0KkolGvKFP3MVYjx4em8hil6ZdLAA1JnXid~-5E1pro8j46IZhnqFvWhpdVyW9s8IGOpzEPkoEiJsJJSixiHz0Vv479jJ-mV6qOu5mATJOEPJD0gVAW1QdttQzTx4DwFW7gOxeb6Muaogk8rjx9sDbM~13UValDD~8zngnN0FKBe1pq1OOMeHMp6K37relJVzFsSjvfjBUpliU~v2gOQvCszqAOvY7-O8TtazoIycdIJqn1SGe6k-A__"
    },
    {
      name: "POTTERY",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//7f3e0d95f4f44956/pottery.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=T1Wxm60WeSazTZI8sEb-cKKA2qVpf0g4hDxdXbzdl9kScRB8MT2ihHGsVaC6~hvTumM3KNsgr0C4JNNjvj2hP9r~kot2Du83b59x5epZpx1UX3x1fTn3vlz7aXKcRuGWhQJisF5u5ZQ05NzmrcRrrUyoz~0kNnmPVAChlJAqvVC4E2sNQPkrgFvYJxKNTWfjJbuzLVWz78VFe3kTskmhtf2v3pRyaXPpkFhnau8pjzE4jsnPItDgFbP73piZWer7waq1Oa85As93eBnZBR8MKPmGhljXSJ~Qcan2WLgSOnVyhaX9RJfApoIvYlEjSJ29eC1rFHi6K-4Mujgw5mFvgg__",
    },
    {
      name: "TAROT CARD",
      venue: "TBA",
      date: "TBA",
      image: "https://media-hosting.imagekit.io//b9cf6e7081da413b/tarot-card.jpg?Expires=1832074175&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JK5~NxBWK3j9O7w~oUW7LwI1ZthOTUEz9JmI0cmExziad8EMjjtRf40afUvm6qS-r~dHC-6dCLeezMrxfJFh0Y1ZAY2jMoMviLbY6z3WuI-LuewfMsE1SVYctT0OP~e3FBZHigosVjtBQRfYYnhJyBOZE13hgIWE-SsVLGx5gJrfCxVmhQjEvXbxPW1mwSqysKijw6WdItQJ-H6anYgfcE4lV0jmhNQ11N~mD~HFb0Zq0GafZkAuYX0DumpUJSEpo4PEbyYPlpWdqOX0uMK5W5ZOe5zEYuIEOPf28agSmbuuAM5oZEcIz3WF~RcatQ~QLb8wREa0a0OQbmKjGw1J3A__",
    },
    {
      name: "KARAOKE",
      venue: "TBA",
      date: "TBA",
      image: "https://wallpapercave.com/wp/wp12329107.jpg"
    },
    {
      name: "DANCE WORKSHOP",
      venue: "TBA",
      date: "TBA",
      image: "https://w0.peakpx.com/wallpaper/943/50/HD-wallpaper-music-and-dance-and-dance-music.jpg"
    },
    {
      name: "FOOD EATING COMPETITION",
      venue: "TBA",
      date: "TBA",
      image: "https://c4.wallpaperflare.com/wallpaper/741/599/723/pizza-food-vegetables-fruit-wallpaper-preview.jpg"
    },
    {
      name: "OPEN MIC (KAVI SAMMELAN)",
      venue: "TBA",
      date: "TBA",
      image: "https://www.writespacehouston.org/uploads/2/2/6/9/22691492/open-mics_orig.png"
    }
  ];

  // ---------- GOOGLE FORM LINKS (ONLINE ONLY) ----------
  const onlineEventLinks = {
    "Mr & Miss IGNUS": "https://docs.google.com/forms/d/e/1FAIpQLScXnEU0fUd3esXfza4N1jvVoxFZ_SfWHOsewS61r7ywZURYJQ/viewform?usp=sharing",
    "DIGITAL ART": "https://docs.google.com/forms/d/e/1FAIpQLSfLbvYluONmCZ__EoUuv0Nc_1USXH5QSte-5TyGOYchBrsKeQ/viewform",
    "DUBSMASH": "https://docs.google.com/forms/d/e/1FAIpQLSeqF1_Zmpn7JSblNgCAfmSYySp4Vf7tSJJSysR0hxgEirVRbg/viewform",
    "PHOTOGRAPHY": "https://docs.google.com/forms/d/e/1FAIpQLSfzLbnGBnPWv3bkYQCug_09v_0AiKf3qch7VL-JUTVZjmgqCg/viewform",
    "SHORT MOVIE": "https://docs.google.com/forms/d/e/1FAIpQLSezdNUGZcXi9wXeXGMLNPJsSZ_4zy7ABBvevB8kk-7VWsLW2Q/viewform",
    "MEME MAKING": "https://docs.google.com/forms/d/e/1FAIpQLSdyfPp2n4az6gJp1AaDlfHWmF_exMeC0G0Njz6KK12ujSSx8A/viewform",
    "PHOTOSHOP BATTLE": "https://docs.google.com/forms/d/e/1FAIpQLScNJ3pMvjVLSMD6lDYATTMFtJc_Hx4sIr6Mk6aG9hVOWBDe7w/viewform",
    "CREATIVE WRITING": "https://docs.google.com/forms/d/e/1FAIpQLSc4t6YGLGDQtUKXznmAj5v8jW4iH7kqkb0FPVnak2MaK3_Lvw/viewform",
    "REEL MAKING": "https://docs.google.com/forms/d/e/1FAIpQLSfJ_ZPtMYeDVouqL2WHU4Sz2BLKcgtujCrgOKSzXK4wR2r8Yg/viewform",
    "PHOTOGRAPHY at IITJ": "https://docs.google.com/forms/d/e/1FAIpQLSfzLbnGBnPWv3bkYQCug_09v_0AiKf3qch7VL-JUTVZjmgqCg/viewform",
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
  // ONLINE → open Google Form
  // if (category === "ONLINE" && onlineEventLinks[eventName]) {
  //   window.open(onlineEventLinks[eventName], "_blank");
  //   return;
  // }

  // PRONITE → do nothing (no modal)
  if (category === "PRONITE") {
    return;
  }

  // ALL OTHER EVENTS → open modal
  openModal(eventName, category);
}


  // function handleRegister() {
  //   if (selectedEvent.category === "ONLINE" && onlineEventLinks[selectedEvent.eventName]) {
  //     window.open(onlineEventLinks[selectedEvent.eventName], '_blank');
  //     closeModal();
  //   }
  // }

  // Get event data for modal
  function getEventData() {
  if (!selectedEvent) return null;

  if (selectedEvent.category === "INFORMAL") {
    return InformalsArray.find(
      (event) => event.name === selectedEvent.eventName
    );
  }

  if (selectedEvent.category === "CULTURAL") {
    return CulturalArray.find(
      (event) => event.name === selectedEvent.eventName
    );
  }

  if (selectedEvent.category === "FLAGSHIP") {
    return FlagshipArray.find(
      (event) => event.name === selectedEvent.eventName
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

  const eventData = selectedEvent ? getEventData() : null;


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
            {["DANCE", "MUSIC", "QUIZ", "ART", "LITERATURE", "FILM MAKING", "LIFESTYLE", "DRAMA"].map((event) => (
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
      {isModalOpen && selectedEvent && selectedEvent.category !== "ONLINE" && selectedEvent.category !== "PRONITE" && (
      <div className="event-modal-overlay" onClick={closeModal}>
        <div className="event-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            ✕
          </button>

          {eventData ? (
            <div className="modal-content">
              {/* LEFT 50% IMAGE */}
              <div className="modal-left">
                <img
                  src={eventData.image}
                  alt={eventData.name}
                  className="modal-event-image"
                />
              </div>

              {/* RIGHT 50% TEXT */}
              <div className="modal-right">
                <h2>{eventData.name}</h2>
                <p><strong>Venue:</strong> {eventData.venue}</p>
                <p><strong>Date:</strong> {eventData.date}</p>
              </div>
            </div>
          ) : (
          /* FALLBACK (prevents white screen) */
          <>
            <h2>{selectedEvent.eventName}</h2>
            <p>Details will be announced soon.</p>
          </>
        )}
        </div>
      </div>
    )}
    </div>
  );
}

export default Events;