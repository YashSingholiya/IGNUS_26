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
import stag from "./images/stag.jpg";
import duet from "./images/duet.jpg";
import war from "./images/war.jpg";
import ekalnatya from "./images/ekalnatya.jpg";
import Stagplay from "./images/Stagplay.jpg";
import aria from "./images/aria.jpg";
import duetto from "./images/duetto.jpg";
import beat from "./images/beat.jpg";
import dj from "./images/dj.jpg";
import artees from "./images/artees.jpg";
import pun from "./images/pun.jpg";
import stew from "./images/stew.jpg";
import "./Events.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getAccessToken = () => {
  return localStorage.getItem("access");
};

const isLoggedIn = () => {
  return !!getAccessToken();
};

const EVENT_IMAGE_MAP = {
  // Categories / Main Types
  DANCE: dance,
  MUSIC: music,
  QUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  ART: art,
  LITERATURE: lit,
  FILM: "https://rsace.edu.in/wp-content/uploads/2025/01/1d2e74e09ff27f72a1c97f462e8f79e9.png",
  LIFESTYLE: LifeStyle,
  DRAMA: drama,

  // Flagship
  ANTARANG: antarang,
  NRITYANSH: nritya,
  CLASHOFBANDS: clash,
  THUNDERBEATS: clash,
  AAYAAM: aayam,

  // Dance Sub-events
  STAGMOVES: stag,
  ANYBODYCANDUET: duet,
  RAWWAR: war,

  // Drama Sub-events
  EKALNATYA: ekalnatya,
  STAGEPLAY: Stagplay,

  // Art Sub-events
  FUNKYFACES: "https://scontent.fdel27-7.fna.fbcdn.net/v/t39.30808-6/480694281_1145653750351494_9015891246071082618_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EDQkNcproQUQ7kNvwHb7giO&_nc_oc=AdnbHB7kovReB6_eX1q9Yw-0-Vp098C1xVwfaa1PbKos6k-RApZE5bolU5g5RPgdxfA&_nc_zt=23&_nc_ht=scontent.fdel27-7.fna&_nc_gid=fSuB3_rY94F8SZHrnEMVyA&oh=00_Afp6nmIpHezTBcvRKvkxnnm2hWe6NEIGGd82N9UyFSLdgQ&oe=697D7BE3",
  ARTEES: artees,
  CHARCOALART: "https://www.cbcity.nsw.gov.au/m/DMbsAblx0XpRPAB5JtjMnzcyviiMDPyPlAFPgmLk7FY/resize:fill:412:412:1:1/g:fp:0.5:0.5/sm:1/dpr:2.625/L3NpdGVzL2RlZmF1bHQvZmlsZXMvMjAyNS0xMi9hZG9iZXN0b2NrXzE0NDA5NzY5MzQuanBn",
  GRAFFITIWALLS: "https://graffiti-artist.net/wp-content/uploads/2023/07/DSC03800.jpg",
  DOODLING: "https://www.carandache.com/ch/en/content_images/01_CdA_SEO_Doodling_041.jpg",
  RAPIDO: "https://primary.jwwb.nl/public/s/z/k/temp-valgczriyakksipnfhlt/6r7ia0/whitehighlighterpens4.webp",
  DIGITALART: "https://static.skillshare.com/uploads/discussion/tmp/5619e779.jpg",
  PHOTOSHOPBATTLE: "https://img-c.udemycdn.com/course/480x270/5346430_f677.jpg",

  // Music Events
  ARIA: aria,
  DUETTO: duetto,
  BEATNICKS: beat,
  DJBATTLE: dj,

  // Literature Events
  WORDZEE: "https://mb.cision.com/Public/16579/2943123/8e44b9b5c4968475_800x800ar.png",
  SCRABBLE: "https://images.hindustantimes.com/img/2022/11/03/550x309/_380b84aa-f042-11e5-ac5f-8ebef762d494_1667457238330_1667457238330.jpg",
  SLAMPOETRY: "https://www.kulturfabrikkrawatte.de/wp-content/uploads/2022/04/PoetrySlamLogo-e1655074794832.jpeg",
  PUNWARS: pun,
  "3VS3DEBATE": "https://observatory.tec.mx/wp-content/uploads/2022/08/debate-escolar.jpg",
  STEW: stew,
  JAM: "https://static.wixstatic.com/media/7e8803_aa8af0dfa2314bef89cf40ddc4453ad4~mv2.jpg/v1/fill/w_850,h_750,fp_0.50_0.50,lg_2,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e8803_aa8af0dfa2314bef89cf40ddc4453ad4~mv2.jpg",
  CREATIVEWRITING: "https://www.edynamiclearning.com/wp-content/uploads/2019/04/Creative-Writing-I-HIGH-RES.jpg",
  CRYPTICCROSSWORD: "https://events.mosman.nsw.gov.au/sites/default/files/styles/large/public/img/cryptic_crossword_club_eventsmosman.jpg?itok=UxoULuC7",

  // Quiz Events
  MELA: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  LONEWOLFQUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  BOLLYWOODQUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",

  // Film Events
  "IGNUS.JPG": "https://media-hosting.imagekit.io//302f4d57f5124512/Untitled%20design%20(54).webp?Expires=1831194176&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=oD-IuJcekQ2SgmgB8Z0pN8ZZ1a5eaBBlnRtXsHPk7Oiujy~zL3kK2-97rBHWRASW2iwvJrTkZbrwA2S~asqndcoPwffFu~IX1DhYYA-xmDi3B7tRS9HFt0kuXxfzq8UFeEGkgARC5kZ2If6NlKv2tK6hl2Ng8oMFRbCg~s73mGXbXvnnGMFTeVzLokVVRKNXIEbV~vCwRrXmL~QFFSZ7zu7hAMyHzOkaGCDrC8TqrDcnlTdhAy0xM0FEQZHcNUzSfPOgOtn2f68GKO~rMJ1~C0jkdfVYXo0eOZ1PHuIO1bMkLMM02l4M3HqwbPh6eoQVsWyu2jZohRiInrzdnFES0Q__",
  IGNIGY: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",
  SHORTMOVIEMAKING: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",

  // Lifestyle Events
  COSPLAY: "https://media-hosting.imagekit.io//50012084ac5749f7/Untitled%20design%20(52).webp?Expires=1831194061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2fn3Ib9qb8jEPI3qNQVPWzRRaDPUjtwpLmsQuvJ7nDcMlLtWrbuJRcrAWXrg4ffdu7I1SjGVjOtTmjSsAP46seB8r4qyWoc4hRUouyBXdoyWdf-FUEv0BlTCG7NTH9g98Q275N1fYdQXQIgxiq71bmuMT-HwpxqArDHSakhQNmCgyR4dVuky~xaiiSMcg6UohKeJoAJhybuXitK5D9tJo9ClKqzj78w0CEzAEteAuDRNxVtQW6JrCPSHbD1ETetPOGFuF8Nkr3yveRe~LlDDcXNzpQEPBHybfiThM-9uEDSOzrPPBr-NDtLmHc1MYLEjymTAJq6WSJlVXS2WP0cpyg__",
  DIGITALARENA: "https://media-hosting.imagekit.io//bb70bf7e065b4985/Untitled%20design%20(51).webp?Expires=1831194035&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DuGZ838-p-3j3x-i~W0OwGi8JM2JaVVz~lOXQ8C0K5N6jAUBMIneqNieopRazwptFpi2CVuXm96tcQbSAJNxpFpc0B077WAOf7nta0wBSZRyk-OOvTf9rgEhEa5peCYMEmcjguKR4p4GzwLPFzHup-4nEGytAqlWA0z2rql76UYRW6CPg~R3HpJ-lFLRu-QpnzzKgqNjTwycW6SvVNH~EMJ6JFdemewUl6Go~UuOmnapKXZHGv8S72Kz8dn-KsBa3NAV-xZOGqti8Kf0jusq9Zkj7-iONKiALSUEY94fHtsRIMwa9LwmrB0A438TyAiuV-c4fgjTJqg6RvFOZW5rHQ__",
  DUBSMASH: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",
  LOLLAPALOOZA: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",
  COSTUMEDESIGNING: "https://media-hosting.imagekit.io//33e48c50109846bc/Untitled%20design%20(50).webp?Expires=1831193998&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=t32SM5QqH-I3pNzHwMOBGUV0T6IUUBV2lBajfaol6j2OZMXmlpyjBxokF92xp~wp7gJ-gSrtnzgWbREMUgD3yL9aQECyjWHOIAaBnMwuvaVK3bc7sWGqAZCtWXpWBR9ecjrSlDChfPMGV-qsEBeFHLgKLAB1GybjKFd45133YkyIGCya1rvtkdtnFhWezrV5za4k~4PQilxY-dC4w5nP1c7sRsoWr8ev5Q~eT1QrYCtmcjbLXW5OBFb7rS4kyzbmE7hvGp63WEAk0brEk7Ut-O9TIfMMBJW2T5E4S~nGMvisfQM3rypxvfZDag7w6dvT8spEhMZV34jRnDJaWEWrsQ__",
  "MR.ANDMRS.IGNUS": "https://media-hosting.imagekit.io//b95ce6adfac24bfc/Untitled%20design%20(49).webp?Expires=1831193969&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KhoQ8ndgP~qmT93~wV5QGeZxE8q4ffq-cyDzJNMeNAhg-ZkwOuxPT6rNuhNLhd48vR-H8SYhPcOOYO8KdTDh~V9MHDeqSQlxL2E3JwwaBiJmDIGycjnYELOikyYg3ts3Sh0Bone-7jStZcnaFIT0jkXMkT2LG55KVrUVStZAIDyYYQNwkOlahHXhAviMFONL0JIJ7MI13FNklaztZvaAydMd91wFWEeQmqY23j7tRK86yGMRIuYaYROM3WSUecT~8njBo1oVQKPOU1ekUOs--KKrjfCXPyZrvLMr2JyY~CvatZeP4nRoWcogG3mB~9bf-chPqmTmvE-qNPa4OTYaKA__",
};

function Events() {
  const normalizeKey = (str = "") =>
    str.replace(/\s+/g, "").toUpperCase();

  const getEventDisplayName = (name) => {
    if (!name) return "";
    const normalized = normalizeKey(name);
    if (normalized === "THUNDERBEATS") return "CLASH OF BANDS";
    return name;
  };

  const navigate = useNavigate();
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [modalCategory, setModalCategory] = useState(null);
  const CATEGORY_TYPE_MAP = {
    CULTURAL: "Cultural Event",
    FLAGSHIP: "Flagship Event",
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

    // Set modal category early to avoid flicker
    setModalCategory(category);

    const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

    const matchedType = backendEvents.find((type) => {
      console.log("🔍 CHECKING TYPE:", type.reference_name);
      return normalize(type.reference_name) === normalize(eventName);
    });

    console.log("✅ MATCHED TYPE:", matchedType);

    if (!matchedType || !matchedType.events || matchedType.events.length === 0) {
      toast.info("Events will be announced soon");
      setIsModalOpen(false);
      setModalEvents([]);
      setSelectedBackendEvent(null);
      return;
    }

    console.log("🎯 EVENTS TO SHOW IN MODAL:", matchedType.events);

    setModalEvents(matchedType.events);
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
        if (typeof data === "string") {
          toast.error(data);
        } else if (data.Message) {
          toast.error(data.Message);
        } else {
          toast.error("Registration failed");
        }
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
            {backendEvents
              .filter((type) => type.name === "Cultural Event")
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
            .filter((type) => type.name === "Flagship Event")
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

                    <div className="modal-event-list">
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
                    <h2>
                      {getEventDisplayName(selectedBackendEvent?.name)}
                    </h2>

                    <p>
                      <strong>Venue:</strong>{" "}
                      {selectedBackendEvent.venue || "TBA"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {selectedBackendEvent.date || "TBA"}
                    </p>

                    <button
                      className="modal-register-btn"
                      onClick={handleRegister}
                    >
                      {isLoggedIn() ? "REGISTER" : "LOGIN TO REGISTER"}
                    </button>
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