import React, { useRef, useState, useEffect } from "react";
import nritya from "./images/dance.webp";
import music from "./images/music.webp";
import art from "./images/art.webp";
import lit from "./images/lit.webp";
import lifestyle from "./images/lifestyle.webp";
import drama from "./images/drama.webp";
import flash_drama from "./images/flash_drama_img.webp";
import antarang from "./images/antarang.webp";
import dance from "./images/nritya.webp";
import clash from "./images/clash.webp";
import aayam from "./images/aayam.webp";
import tshirt from "./images/tshirt.webp";
import stag from "./images/stag.webp";
import duet from "./images/duet.webp";
import war from "./images/war.webp";
import ekalnatya from "./images/ekalnatya.webp";
import stagplay from "./images/stagplay.webp";
import aria from "./images/aria.webp";
import duetto from "./images/duetto.webp";
import beat from "./images/beat.webp";
import dj from "./images/dj.webp";
import artees from "./images/artees.webp";
import pun from "./images/pun.webp";
import ignus from "./images/ignus.webp";
import dub from "./images/dub.webp";
import cos from "./images/cos.webp";
import themePhoto from "./images/theme_photograph.webp";
import photostory from "./images/photostory.webp";
import "./Events.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, isProfileComplete } from "../../utils/cookies";
import usePageTitle from "../../hooks/usePageTitle";

const DIRECT_FORM_EVENTS = {
  "MR.ANDMS.IGNUS":
    "https://docs.google.com/forms/d/e/1FAIpQLSfPOuMC3Fmrutpx89OcarkkAYA8r5wnov0QVlMyVkZYj7j2mQ/viewform?usp=publish-editor",
};


const EVENT_IMAGE_MAP = {
  // Categories / Main Types
  DANCE: dance,
  MUSIC: music,
  QUIZZES: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  FINEARTS: art,
  LITERATURE: lit,
  DIGITALMEDIA: "https://rsace.edu.in/wp-content/uploads/2025/01/1d2e74e09ff27f72a1c97f462e8f79e9.png",
  "FASHION&LIFESTYLE": lifestyle,
  DRAMA: drama,

  // Flagship
  ANTARANG: antarang,
  NRITYANSH: nritya,
  CLASHOFBANDS: clash,
  THUNDERBEATS: clash,
  AAYAAM: aayam,

  "FASHIONSHOW-ANTARANG": antarang,
  BANDCOMPETITION: clash,
  "STREETPLAY-AAYAAM": aayam,

  // Dance Sub-events
  SOLODANCE: stag,
  DUETDANCE: duet,
  STREETBATTLE: war,

  // Drama Sub-events
  MONOACT: ekalnatya,
  MIME: "https://images.deccanchronicle.com/dc-Cover-o6peov88vmchmno1a3nh8f0693-20161203232050.Medi.jpeg",
  STAGEPLAY: stagplay,

  // Art Sub-events
  FACEPAINTING:
    "https://scontent.fdel27-7.fna.fbcdn.net/v/t39.30808-6/480694281_1145653750351494_9015891246071082618_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EDQkNcproQUQ7kNvwHb7giO&_nc_oc=AdnbHB7kovReB6_eX1q9Yw-0-Vp098C1xVwfaa1PbKos6k-RApZE5bolU5g5RPgdxfA&_nc_zt=23&_nc_ht=scontent.fdel27-7.fna&_nc_gid=fSuB3_rY94F8SZHrnEMVyA&oh=00_Afp6nmIpHezTBcvRKvkxnnm2hWe6NEIGGd82N9UyFSLdgQ&oe=697D7BE3",
  "T-SHIRTPAINTING": artees,
  CHARCOALPAINTING:
    "https://www.cbcity.nsw.gov.au/m/DMbsAblx0XpRPAB5JtjMnzcyviiMDPyPlAFPgmLk7FY/resize:fill:412:412:1:1/g:fp:0.5:0.5/sm:1/dpr:2.625/L3NpdGVzL2RlZmF1bHQvZmlsZXMvMjAyNS0xMi9hZG9iZXN0b2NrXzE0NDA5NzY5MzQuanBn",
  GRAFFITIWALLS:
    "https://graffiti-artist.net/wp-content/uploads/2023/07/DSC03800.jpg",
  DOODLING:
    "https://www.carandache.com/ch/en/content_images/01_CdA_SEO_Doodling_041.jpg",
  RAPIDO:
    "https://primary.jwwb.nl/public/s/z/k/temp-valgczriyakksipnfhlt/6r7ia0/whitehighlighterpens4.webp",
  DIGITALART:
    "https://static.skillshare.com/uploads/discussion/tmp/5619e779.jpg",
  PHOTOSHOPBATTLE: "https://img-c.udemycdn.com/course/480x270/5346430_f677.jpg",

  // Music Events
  SOLOSINGING: aria,
  PAIRONSTAGE: duetto,
  RAPBATTLE: beat,
  DJBATTLE: dj,

  // Literature Events
  STANDUPCOMEDY:
    "https://img.freepik.com/free-vector/stand-up-comedy-logo-with-microphone_1308-95780.jpg?semt=ais_hybrid&w=740&q=80",
  SCRABBLE:
    "https://images.hindustantimes.com/img/2022/11/03/550x309/_380b84aa-f042-11e5-ac5f-8ebef762d494_1667457238330_1667457238330.jpg",
  "SLAMPOETRY-ENGLISH":
    "https://www.kulturfabrikkrawatte.de/wp-content/uploads/2022/04/PoetrySlamLogo-e1655074794832.jpeg",
  "SLAMPOETRY-HINDI/URDU":
    "https://www.kulturfabrikkrawatte.de/wp-content/uploads/2022/04/PoetrySlamLogo-e1655074794832.jpeg",
  PUNWARS: pun,
  "3VS3DEBATE":
    "https://observatory.tec.mx/wp-content/uploads/2022/08/debate-escolar.jpg",
  JAM: "https://static.wixstatic.com/media/7e8803_aa8af0dfa2314bef89cf40ddc4453ad4~mv2.jpg/v1/fill/w_850,h_750,fp_0.50_0.50,lg_2,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e8803_aa8af0dfa2314bef89cf40ddc4453ad4~mv2.jpg",
  CREATIVEWRITING:
    "https://www.edynamiclearning.com/wp-content/uploads/2019/04/Creative-Writing-I-HIGH-RES.jpg",
  CRYPTICCROSSWORD:
    "https://events.mosman.nsw.gov.au/sites/default/files/styles/large/public/img/cryptic_crossword_club_eventsmosman.jpg?itok=UxoULuC7",

  // Quiz Events
  GENERALQUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  TLCQUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  MEMEQUIZ:
    "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  BOLLYWOODQUIZ:
    "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",

  // Film Events
  IGNIGY:
    "https://www.sparksarts.co.uk/wp-content/uploads/2022/03/Top-10-Easy-Filmmaking-Tips-for-Beginners-2-1024x683.jpg",
  SHORTFILMMAKINGCOMPETITION:
    "https://miro.medium.com/v2/resize:fit:1400/1*CHNXavYcG3iSKZfd0oEwzQ.jpeg",

  // Lifestyle Events
  COSPLAY: cos,
  DIGITALARENA:
    "https://dancehubtv.uk/wp-content/uploads/2020/11/header-4-1024x424.jpg",
  DUBSMASHCOMPETITION: dub,
  LOLLAPALOOZA:
    "https://i.pinimg.com/736x/ac/b7/e2/acb7e24c756e765d16e46f8de451c2f9.jpg",
  COSTUMEDESIGN:
    "https://jdinstituteoffashiontechnology.b-cdn.net/wp-content/uploads/2021/07/Costume-Designing-As-A-Profession-What-Should-You-Expect-Thumbnail.jpg",
  "MR.ANDMS.IGNUS":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56haMI-IROURtyA_edjuHQf5hl5N2GOGGDg&s",
};

function Events() {
  usePageTitle("Events");
  const normalizeKey = (str = "") =>
  str.replace(/[\s&.-]/g, "").toUpperCase();

  const getEventDisplayName = (name) => {
    if (!name) return "";
    const normalized = normalizeKey(name);
    if (normalized === "THUNDERBEATS") return "CLASH OF BANDS";
    return name;
  };

  const isDirectFormEvent = (eventName = "") =>
    normalizeKey(eventName) === "MR.ANDMS.IGNUS";


  const navigate = useNavigate();
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [modalCategory, setModalCategory] = useState(null);
  const CATEGORY_TYPE_MAP = {
    CULTURAL: "Cultural Event",
    FLAGSHIP: "Flagship Event",
    INFORMAL: null, // handled separately
  };

  // Map cultural categories to their flagship events (using exact backend reference_name values)
  const CULTURAL_FLAGSHIP_MAP = {
    "DANCE": "Nrityansh",
    "DRAMA": "Aayaam",
    "FASHION&LIFESTYLE": "Antarang",
    "MUSIC": "Clash of Bands",
  };
  // ---------- MODAL STATE ----------
  const [backendEvents, setBackendEvents] = useState([]);
  const [modalEvents, setModalEvents] = useState([]);
  const [selectedBackendEvent, setSelectedBackendEvent] = useState(null);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_URL)
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

  const isModalReady =
    modalCategory === "INFORMAL"
      ? !!selectedCategoryImage
      : modalEvents.length > 0 || !!selectedBackendEvent;

  useEffect(() => {
    if (isModalOpen && !isModalReady) {
      setIsModalOpen(false);
    }
  }, [isModalOpen, isModalReady]);

  const InformalsArray = [
    {
      name: "PROM NIGHT",
      venue: "110, Computer Centre",
      date: "6th February",
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
      venue: "Informal Ground",
      date: "Everyday",
      image: "https://m.media-amazon.com/images/I/61hV8lwDOsL.jpg",
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

  const OnlineEventsArray = [
    {
      name: "DUBSMASH",
      venue: "Online",
      date: "TBA",
      image: dub,
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeqF1_Zmpn7JSblNgCAfmSYySp4Vf7tSJJSysR0hxgEirVRbg/viewform",
    },
    {
      name: "MEME MAKING",
      venue: "Online",
      date: "TBA",
      image: "https://i.imgflip.com/1bij.jpg",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdyfPp2n4az6gJp1AaDlfHWmF_exMeC0G0Njz6KK12ujSSx8A/viewform",
    },
    {
      name: "REEL MAKING",
      venue: "Online",
      date: "TBA",
      image: "",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfJ_ZPtMYeDVouqL2WHU4Sz2BLKcgtujCrgOKSzXK4wR2r8Yg/viewform",
    },
    {
      name: "FLASHDRAMA",
      venue: "Online",
      date: "18 Feb",
      image: flash_drama,
      link: "https://docs.google.com/forms/d/e/1FAIpQLSf-0qkv3vvsYqYZlcQyhB2AXbXQSwkWeEtz-80FvSyrCR4h2A/viewform?usp=send_form",
      sponsor: {
        name: "KUKUTV",
        logo: "/images/logo_kuku.png",
      },
    },
    {
      name: "PHOTOSTORY",
      venue: "Online",
      date: "8 Feb",
      image: photostory,
      link: "",
    },
    {
      name: "THEME PHOTOGRAPHY",
      venue: "Online",
      date: "8 Feb",
      image: themePhoto,
      link: "",
    },
  ];

  function openModal(eventName, category) {
    if (category === "INFORMAL") {
      const informalEvent = InformalsArray.find((e) => e.name === eventName);

      setSelectedCategoryImage(informalEvent?.image || null);

      setSelectedBackendEvent({
        name: informalEvent.name,
        venue: informalEvent.venue,
        date: informalEvent.date,
      });

      setModalCategory("INFORMAL");
      setIsModalOpen(true);
      return;
    }

    setModalCategory(category);
    setSelectedEvent({ eventName, category });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }

  function handleEventClick(eventName, category) {
    console.log("🟡 CLICKED:", { eventName, category });

    if (category === "PRONITE") return;

    // Handle ONLINE events with frontend data
    if (category === "ONLINE") {
      const onlineEvent = OnlineEventsArray.find((e) => e.name === eventName);

      if (onlineEvent) {
        setSelectedCategoryImage(onlineEvent.image || null);
        setSelectedBackendEvent({
          name: onlineEvent.name,
          venue: onlineEvent.venue,
          date: onlineEvent.date,
          link: onlineEvent.link,
          sponsor: onlineEvent.sponsor || null,
        });
        setModalCategory("ONLINE");
        setIsModalOpen(true);
      } else {
        toast.info("Event details coming soon");
      }
      return;
    }

    // Set modal category early to avoid flicker
    setModalCategory(category);

    const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

    const matchedType = backendEvents.find((type) => {
      console.log("🔍 CHECKING TYPE:", type.reference_name);
      return normalize(type.reference_name) === normalize(eventName);
    });

    console.log("✅ MATCHED TYPE:", matchedType);

    if (
      !matchedType ||
      !matchedType.events ||
      matchedType.events.length === 0
    ) {
      toast.info("Events will be announced soon");
      setIsModalOpen(false);
      setModalEvents([]);
      setSelectedBackendEvent(null);
      return;
    }

    console.log("🎯 EVENTS TO SHOW IN MODAL:", matchedType.events);

    let eventsToShow = [...matchedType.events].filter(
      (event) => normalizeKey(event.name) !== "IGMUN"
    );

    // For cultural categories, add the corresponding flagship event
    if (category === "CULTURAL") {
      const normalizedEventName = normalizeKey(eventName);
      const flagshipEventName = CULTURAL_FLAGSHIP_MAP[normalizedEventName];

      if (flagshipEventName) {
        // Find the flagship event type
        const flagshipType = backendEvents.find((type) =>
          normalize(type.reference_name) === normalize(flagshipEventName)
        );

        if (flagshipType && flagshipType.events && flagshipType.events.length > 0) {
          // Add flagship event(s) to the beginning of the list
          eventsToShow = [...flagshipType.events, ...eventsToShow];
          console.log("🚀 Added flagship event:", flagshipEventName);
        }
      }
    }

    setModalEvents(eventsToShow);

    // For FLAGSHIP events, automatically select the first (and only) event
    if (category === "FLAGSHIP" && matchedType.events.length > 0) {
      setSelectedBackendEvent(matchedType.events[0]);
    } else {
      setSelectedBackendEvent(null);
    }

    setIsModalOpen(true);
  }

  const handleRegister = async () => {
    // 🔐 Auth guards
    if (!isLoggedIn()) {
      toast.info("Please login to register for events");
      setTimeout(() => navigate("/login"), 1200);
      return;
    }

    if (!isProfileComplete()) {
      toast.info("Please complete your profile first");
      setTimeout(() => navigate("/login"), 1200);
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
          credentials: "include", // 🔥 REQUIRED
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name: selectedBackendEvent.name,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.Message || data || "Registration failed");
        return;
      }

      toast.success(data.Message || "Event registered successfully 🎉");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later");
    }
  };

  const [activeTab, setActiveTab] = useState("CULTURAL");

  const culturalRef = useRef(null);
  const informalRef = useRef(null);
  const proniteRef = useRef(null);
  const flagshipRef = useRef(null);
  const onlineRef = useRef(null);

  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: flagshipRef, name: "FLAGSHIP" },
        { ref: culturalRef, name: "CULTURAL" },
        { ref: informalRef, name: "INFORMAL" },
        { ref: proniteRef, name: "PRONITE" },

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
          {backendEvents
            .filter((type) => normalizeKey(type.name || type.event_type) === "FLAGSHIPEVENT")
            .filter((type) => normalizeKey(type.reference_name) !== "IGMUN")
            .map((type) => (
              <button
                key={type.id}
                className="event-item"
                onClick={() => {
                  const normalizedName = normalizeKey(type.reference_name);
                  setSelectedCategoryImage(
                    EVENT_IMAGE_MAP[normalizedName] || antarang,
                  );
                  handleEventClick(type.reference_name, "FLAGSHIP");
                }}
              >
                {getEventDisplayName(type.reference_name)}
              </button>
            ))}
        </div>
      </div>
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
            {backendEvents
              .filter((type) => normalizeKey(type.name || type.event_type) === "CULTURALEVENT")
              .filter((type) => normalizeKey(type.reference_name) !== "IGMUN")
              .map((type) => (
                <button
                  key={type.id}
                  className="event-item"
                  onClick={() => {
                    const normalizedName = normalizeKey(type.reference_name);
                    setSelectedCategoryImage(
                      EVENT_IMAGE_MAP[normalizedName] || dance,
                    );
                    handleEventClick(type.reference_name, "CULTURAL");
                  }}
                >
                  {type.reference_name}
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
              onClick={() => openModal(event.name, "INFORMAL")}
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
          {OnlineEventsArray.map((event) => (
            <button
              key={event.name}
              className="event-item"
              onClick={() => handleEventClick(event.name, "ONLINE")}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>

      {/* ================= FOOTER TABS ================= */}
      <div className="events-footer">
        {["FLAGSHIP", "CULTURAL", "INFORMAL", "PRONITE", "ONLINE"].map(
          (tab) => (
            <button
              key={tab}
              className={`footer-btn ${tab.toLowerCase()} ${activeTab === tab ? "active" : ""
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
      {isModalOpen && isModalReady && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-content">
              {/* LEFT SIDE — IMAGE */}
              <div className="modal-left">
                {selectedCategoryImage && (
                  <img
                    src={
                      EVENT_IMAGE_MAP[
                      normalizeKey(selectedBackendEvent?.name)
                      ] ||
                      selectedBackendEvent?.cover ||
                      selectedCategoryImage
                    }
                    alt="Event"
                    className="modal-event-image"
                  />
                )}
              </div>
              {/* RIGHT SIDE — CONTENT */}
              <div className="modal-right">
                {modalCategory !== "INFORMAL" && !selectedBackendEvent ? (
                  <>
                    <h2>Select Event</h2>

                    <div className={`modal-event-list ${selectedEvent?.eventName && normalizeKey(selectedEvent.eventName) === "FILM" ? "modal-event-list-vertical" : ""}`}>
                      {modalEvents.map((ev) => (
                        <button
                          key={ev.id}
                          className="event-item"
                          onClick={() => setSelectedBackendEvent(ev)}
                        >
                          {getEventDisplayName(ev.name)}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2>{getEventDisplayName(selectedBackendEvent?.name)}</h2>

                    <p>
                      <strong>Venue:</strong>{" "}
                      {selectedBackendEvent.venue || "TBA"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {selectedBackendEvent.date || "TBA"}
                    </p>
                    {modalCategory !== "INFORMAL" && (
                      <button
                        className="modal-register-btn"
                        onClick={() => {
                          // ✅ SPECIAL CASE: Mr. and Ms. Ignus
                          if (isDirectFormEvent(selectedBackendEvent?.name)) {
                            window.open(
                              DIRECT_FORM_EVENTS[normalizeKey(selectedBackendEvent?.name)],
                              "_blank"
                            );
                            return;
                          }

                          // ✅ ONLINE events: redirect to form link
                          if (modalCategory === "ONLINE" && selectedBackendEvent?.link) {
                            window.open(selectedBackendEvent.link, "_blank");
                            return;
                          }

                          // default behavior (all other events)
                          handleRegister();
                        }}
                      >
                        {isDirectFormEvent(selectedBackendEvent?.name) || modalCategory === "ONLINE"
                          ? "REGISTER"
                          : !isLoggedIn()
                            ? "LOGIN TO REGISTER"
                            : !isProfileComplete()
                              ? "COMPLETE PROFILE"
                              : "REGISTER"}
                      </button>
                    )}

                    {/* Sponsor section - only show if event has sponsor */}
                    {selectedBackendEvent?.sponsor && (
                      <div className="modal-sponsor">
                        <span className="sponsor-text">Powered by</span>
                        <img
                          src={selectedBackendEvent.sponsor.logo}
                          alt={selectedBackendEvent.sponsor.name}
                          className="sponsor-logo"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;