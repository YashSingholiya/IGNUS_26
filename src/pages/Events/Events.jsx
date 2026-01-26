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

const EVENT_IMAGE_MAP = {
  // Categories / Main Types
  DANCE: dance,
  MUSIC: music,
  QUIZ: "https://thebges.edu.in/wp-content/uploads/2024/04/Intra-college-Quiz-competition-organized-by-RICE-Education-2.jpg",
  ART: art,
  LITERATURE: lit,
  FILMMAKING: "https://rsace.edu.in/wp-content/uploads/2025/01/1d2e74e09ff27f72a1c97f462e8f79e9.png",
  LIFESTYLE: LifeStyle,
  DRAMA: drama,

  // Flagship
  ANTARANG: antarang,
  NRITYANSH: nritya,
  CLASHOFBANDS: clash,
  THUNDERBEATS: clash,
  AAYAAM: aayam,

  // Sub-events (Examples)
  STAGMOVES: dance,
  ANYBODYCANDUET: dance,
  RAWWAR: dance,

  // Art Sub-events
  FUNKYFACES: art,
  ARTEES: tshirt,
  CHARCOALART: art,
  GRAFFITIWALLS: art,
  DOODLING: art,
  RAPIDO: art,
  DIGITALART: art,
  PHOTOSHOPBATTLE: art,
  // New Arts/Music Events
  ARIA: "https://media-hosting.imagekit.io//f75e9f9d37b34d05/Untitled%20design%20(39).webp?Expires=1831193364&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=vXpbNFGy4P8Ctcr2Xa8g1J8TGkTfJmjmDjZ2UxN8cfra-cA1Z4Jb~hTuu76nACritgvUPWF1SJQNU4MOzFEoAGa4IbCyrEIjpaX~~aQ3pMHjmCaZcEzP1mP15P6S-OddEBusGqs7LxZDLWl5g53JK7MoPjJUxca8WCoyE7djdN8ulmL5PbOQVvbNUyMabE1COQIpfQNnUy43G6AOcHLHHDak1iOHqJe3SAgHQwCrRjzL6Hkf~~E-jRUsQDWiY6TxKekWn69ZhgAFAhH2-TCiV9zK5ocjvSjIhOPDz14deXh9oh~q6gKibMRxXSn2dTpiL8wwk2fkRyM4LQJnKShYYQ__",
  DUETTO: "https://media-hosting.imagekit.io//ee81e33d04184f1b/Untitled%20design%20(38).webp?Expires=1831193320&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=twGSgjY47AF9jID0hN7NPhrRBeZLW-T5gg8aRE6JrugMRplz4maYjVccnnpRnrxnrupd70LA2qHfiMrg0ABTLZHl9f8codG1vVV22HAoseLGwjPou2iVQ3OK~7hMFM51wbQnSljU-l5d0zGvo4B5cwIBGKUVuuw-Wez~hpmsQNOz9WWJCw2vCkrmQ~LggvLAbKqIV4kb0youlUZdz9lj6iVUlOOM17YSvvJnPtG6N3CNZe7~fZY6CBJvBFc~JT6Aclp~CCFwhOBR7UWJcWbb~2cHbFuF3kow9siN41omZtfPj5W0TJ9euqfMqRsJVnFPZBxFkHzA-A-X1VOQVBuiSw__",
  BEATNICKS: "https://media-hosting.imagekit.io//4e92af9b2637414b/Untitled%20design%20(41).webp?Expires=1831193714&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OAZV-1SB2eeBpwKw9Pt6ket9jOg414q9lVBsOAZ~h~WT5lZtPeKZHUSOXVKVsL-G6I2feRCmxafaXtPcueYwged2gAYIbhd8yR4kYR0pCIuPyJxWfW1Iax2VfJWTZrr4uvmuoUbOGS0S0Tx6klZUIdnMMi9GMYspo8A-9H78EV-T8e2h7a30cuwtSFuFujbpO13mrUBYa~qB2ieyIZGHjPt7hFaY0BQvWEf1d9Q3~Fg6uqDR~pzDOb1wCbW9mlk5G~eUD6IH0TiisU~jG372vcpbGlCXOEfbKSDADQ~XiB0t38FD35gx0BLY5ccEtK-WkZtw8W23T5DRkVoSsV6H9Q__",
  DJBATTLE: "https://media-hosting.imagekit.io//4004f39d48344a60/Untitled%20design%20(40).png?Expires=1831197297&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=YFQINhaVEzhT~qSaarA~Oy0a~pS-MBDEDVu9IOFBNyi9Bpy-iCVdxinXBW6GMkEHlZAN88fzkdyeRHeHSx5BfTLk~x64qLUpuMcM42mPqhZA42Kj~Q6B4JcBIgCj9L3z1I~nKIxqGcj9poMC59nB4bFDRbBZRTwwbYgld8veqvGtTLBnxha5AuOvCgRiaPoAHTGHxX8U~OgybtgJttxjsGUoliZIUS0iSkSX1-HqQIz09DF2ns3-SlvzZF61IF8azZTQtjc9m8ube76qaWwfTX723nGdH6UCzOin~xrrgI7dUL1Uz61vgecAFFDwT~f7fsuvTf4J8K8Q0i1adoYutw__",

  // Literature Events
  WORDZEE: "https://media-hosting.imagekit.io//a6a689921e9742cc/IMG-20250204-WA0002.jpg?Expires=1833267655&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JAMZ0dofVFn5Zc08cQqsI878hWx9Cv15Xbd6d8jlM20AigdyLLwuSrcdAIxh91Cj6D5h2pQBjS3tEb-UK-CWu3ih9tdT0tpCwEHFKnu5NfJmOFT2DB5EdFvbdkCX7~LXAlSUjt~iAUf363Qjc9VI-mCDiwRhnFZX82ob1TJ0PqjGMnD6sdVScqn3buZwFJxeCgrCWViPBTiLAKKEA8B7Cn6WqYMlmORjPwT1AbQ31qqUqGb~7qjkEqtiv1rgNdx1uIHhnl6Z01wbrETnH6lM75XL9ouEbFhJo0cJl00jjRD1NjQqqOZxQfUWCqYza0zmlZsG4k~Qqm0ay7OGNs5r6Q__",
  SLAMPOETRY: "https://media-hosting.imagekit.io//49a4ec4abe3f45d7/Untitled%20design%20(61).webp?Expires=1831194357&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=E7h~T813c2UcxEHR5fiUdwCmXZ-SoOgT5C0lLMD7wPLvLGqZQ959Epdvfddbom-Dzl4k3-T2Fz4WjEy~SuTBRip9usvG3dVp1XH9K3CerTZ3k1gt2qnye-4LGDo~8Uloxt2zdMsL1B9Nn3Qh8HlBsOS8kiJDYlL-u0ZJCUiOwdWT1~xzmL4vzIFrmZnr2GKgXyya7zdd~~WR43doflPJiiEnjuwmOVDyg~78FDptky-qCWLmXT7rn5Jg9j4IsMZ3Ns0wjODH4oVPzot5cPgKh7nnCRVztViiVyOlp0z~--DjEPTK0Zo0BQu5dzlN6V8cvqLdEH4qscjXdMCxL8Xysw__",
  PUNWARS: "https://media-hosting.imagekit.io//0419c69f36484f7b/IMG-20250204-WA0006.jpg?Expires=1833267655&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EBDbCFqSjXf6AgiOiyggZhOoi2dFcsM2uZLu9S7Au2aZaFnrhwVh2mGsjjuo22VEAyyfoEra2BMCxe71Bv-Bvg2I7eMllgOsWmdxeKEg~4-dRidC1WG3tkYm--VaoueQ8XlNgpfoSQnmaNFkStSgbwF~1PC6th~BxEUx-8cOISBdJZxcEMS1VBb7v03AVoS4SCzl0lWM3LaGHZsCTpV1FpeNjOuPqKmRa2BHupNUGRnxRu-hFF87PLmhqRP5YBN5xN9tv-PwD5rv2HsfHdA8FvixTOU2Yz0snB41DDaa1duw4Ly3vrAAheezzral0xF5xFINRjTyxRlJoKslpTQKuA__",
  "3VS3DEBATE": "https://media-hosting.imagekit.io//617d424016c64063/Untitled%20design%20(59).webp?Expires=1831194309&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EAzFqIWdOOYO3R5oYaqtSbtJYzb~FJpAVPhcEG~6HijWj8lgeigEGK-nf7XBbkSF9QhGESvRrnFCgwoQIWxPOQsHATbbS9KDrqkid3FCpQyg0myG9xdXFvq4IaCJ2ty85mnVkrAc01UibEgqb71YkSE5bs4KNWd9lYYOplY~aLKMLoK9v6cr7JdYDFAUUdG0VupHVPILxr2ZImAdOYDYXOBzesu7e8gS-hzOC7bd6fduXLo0yMxLhBsqqYtB4eCpg9ZLsmNxqkjTKmobZZWcsXAW6l~-0cK~14HgRWLS0RZoHBl1H22NYtwH76tpqz-WevpvPu2SY8OrJ8YW8s1m6A__",
  STEW: "https://media-hosting.imagekit.io//f4191449bac6480b/IMG-20250204-WA0003.jpg?Expires=1833267655&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WQIB3Wm4~RpNmEKLYkTFLpZjC4D~k7kD~~M0LUue4WuUhzeB~ODx~OpIjatKQcblslheHSGNEDOzvq16YxcSt~UxVWD6bfBda9VyAJ4hCOCjeVeDFLasM9o4O4kIACVY3KWofSNVbc2twUwszpYPKNrt-THi4qbnD0yJdboEzMbz-dJknO9crYj4uReBaFVj2n8rOA4QC1-8imJ7C-ZgZO3Ct0dGcsPtGn4SNEciZiiVEOmHyJOc~mScOcdEl9oZmAkxSFLAA-2Du19YuTvzgR49zmQDoEiS0h4X34qMrUg1TMYGWusjkAW3keyqDwsoX3FnAiguW-duudlLna-xFA__",
  // Quiz Events
  MELA: art,
  LONEWOLFQUIZ: "https://media-hosting.imagekit.io//b1016152bb05489a/IMG-20250204-WA0005.jpg?Expires=1833267638&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ky4g6DPGuq-XSX3NCL915LnWjc~JO7Q70ogM~Zs2SqZvLR0ZxUtIpNg34Ju-a6izXdQ-qEnBf5nv6GbUtc73jflSBXR4VU2Pf~dxtOWyDT3DDicZiU9hQww8mHOfnf5uPEdVRU4a6UuMYpBQJN6-95iy04RficW~H0ScPJ5Niw2scmzuMZA31mrB9tvtlcm0Aolg3OK6SkEvDEtM7d3WzxlED7qUpciEm08Muy80GcD9XUihsfsDCHoczRuQfgmlFMK6s8fVUWtxBVR~bJB~1RuUOc74B3N3jZzfvT5tePeXh8GFpHsZpBBvOiS1HLQi2aCRQm1qMnQpj3fEq6dsZQ__",
  BOLLYWOODQUIZ: "https://media-hosting.imagekit.io//f38998d0102a4358/IMG-20250204-WA0004.jpg?Expires=1833267655&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=otAXlBqmNZoaU3IYvRGpVBQIDwygx3wOoJ5g7ZGyfHGEmsrHOzs4uEyk4IJmBMVQL92kkZpJwb8Hsr~wftsJZlykIZj~1y3T15x1aS2Tr~0XS7i3gL9ICRPNDelfnSaTdx5TrnE1saxb~N2EHrQLCSZh7ax8FlTWdPVeG0KX9bT-AG2RorbdfdUSk0gjwpA6wbDqLtZPGDIvqG7wLLUQduxwyD5tJJd7kagfZcYUW2nePPiZ9AI3vS4dvhGUC~5lTQvwLpekbfFjYAP3WcGZD-EAmCPe-jzgOChOpSn2WrDRsyDCCy1-HLTlRXakvc55JJMTn6B9ZQBKWk6maThu4Q__",

  // Film Events
  "IGNUS.JPG": "https://media-hosting.imagekit.io//302f4d57f5124512/Untitled%20design%20(54).webp?Expires=1831194176&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=oD-IuJcekQ2SgmgB8Z0pN8ZZ1a5eaBBlnRtXsHPk7Oiujy~zL3kK2-97rBHWRASW2iwvJrTkZbrwA2S~asqndcoPwffFu~IX1DhYYA-xmDi3B7tRS9HFt0kuXxfzq8UFeEGkgARC5kZ2If6NlKv2tK6hl2Ng8oMFRbCg~s73mGXbXvnnGMFTeVzLokVVRKNXIEbV~vCwRrXmL~QFFSZ7zu7hAMyHzOkaGCDrC8TqrDcnlTdhAy0xM0FEQZHcNUzSfPOgOtn2f68GKO~rMJ1~C0jkdfVYXo0eOZ1PHuIO1bMkLMM02l4M3HqwbPh6eoQVsWyu2jZohRiInrzdnFES0Q__",
  IGNIGY: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",
  SHORTMOVIEMAKING: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",

  // Lifestyle Events
  COSPLAY: "https://media-hosting.imagekit.io//50012084ac5749f7/Untitled%20design%20(52).webp?Expires=1831194061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2fn3Ib9qb8jEPI3qNQVPWzRRaDPUjtwpLmsQuvJ7nDcMlLtWrbuJRcrAWXrg4ffdu7I1SjGVjOtTmjSsAP46seB8r4qyWoc4hRUouyBXdoyWdf-FUEv0BlTCG7NTH9g98Q275N1fYdQXQIgxiq71bmuMT-HwpxqArDHSakhQNmCgyR4dVuky~xaiiSMcg6UohKeJoAJhybuXitK5D9tJo9ClKqzj78w0CEzAEteAuDRNxVtQW6JrCPSHbD1ETetPOGFuF8Nkr3yveRe~LlDDcXNzpQEPBHybfiThM-9uEDSOzrPPBr-NDtLmHc1MYLEjymTAJq6WSJlVXS2WP0cpyg__",
  DIGITALARENA: "https://media-hosting.imagekit.io//bb70bf7e065b4985/Untitled%20design%20(51).webp?Expires=1831194035&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DuGZ838-p-3j3x-i~W0OwGi8JM2JaVVz~lOXQ8C0K5N6jAUBMIneqNieopRazwptFpi2CVuXm96tcQbSAJNxpFpc0B077WAOf7nta0wBSZRyk-OOvTf9rgEhEa5peCYMEmcjguKR4p4GzwLPFzHup-4nEGytAqlWA0z2rql76UYRW6CPg~R3HpJ-lFLRu-QpnzzKgqNjTwycW6SvVNH~EMJ6JFdemewUl6Go~UuOmnapKXZHGv8S72Kz8dn-KsBa3NAV-xZOGqti8Kf0jusq9Zkj7-iONKiALSUEY94fHtsRIMwa9LwmrB0A438TyAiuV-c4fgjTJqg6RvFOZW5rHQ__",
  LOLLAPALOOZA: "https://media-hosting.imagekit.io//a81e7bdef93f47f1/Untitled%20design%20(55).webp?Expires=1831194205&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xzy3ZKgowsX5Jd7uU5c4Zqm1rYHV-YZwlIF9bHEG-9HsDk0WrooBBYIudAHLVMcxNMEz0MMXu1PYce1cbjlUkAbvwifj29uZl85E0eKFriV96X3dHJWqaGEbmwN7ue2hvp6410-B3Qyy6QWWtm3Gp2LG26VGdbV~KH4sO84nSpXpsxD4-vo3PmvIfrrq-gHC2RwdO7BQE0mlQdXEfMvmalGKYoQKDJi5F5iB9BQKK2Hl5CPBLe08ZZvuqxE7A6RqR2mVnOMxcwpXurIlCq7WCTmMbYzKKGk00AS8oCcGdJ8TIWcddfxF5oU7mDmZPjke7Ln446M2sWcLK~iUvPV1xw__",
  COSTUMEDESIGNING: "https://media-hosting.imagekit.io//33e48c50109846bc/Untitled%20design%20(50).webp?Expires=1831193998&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=t32SM5QqH-I3pNzHwMOBGUV0T6IUUBV2lBajfaol6j2OZMXmlpyjBxokF92xp~wp7gJ-gSrtnzgWbREMUgD3yL9aQECyjWHOIAaBnMwuvaVK3bc7sWGqAZCtWXpWBR9ecjrSlDChfPMGV-qsEBeFHLgKLAB1GybjKFd45133YkyIGCya1rvtkdtnFhWezrV5za4k~4PQilxY-dC4w5nP1c7sRsoWr8ev5Q~eT1QrYCtmcjbLXW5OBFb7rS4kyzbmE7hvGp63WEAk0brEk7Ut-O9TIfMMBJW2T5E4S~nGMvisfQM3rypxvfZDag7w6dvT8spEhMZV34jRnDJaWEWrsQ__",
  "MR.ANDMRS.IGNUS": "https://media-hosting.imagekit.io//b95ce6adfac24bfc/Untitled%20design%20(49).webp?Expires=1831193969&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=KhoQ8ndgP~qmT93~wV5QGeZxE8q4ffq-cyDzJNMeNAhg-ZkwOuxPT6rNuhNLhd48vR-H8SYhPcOOYO8KdTDh~V9MHDeqSQlxL2E3JwwaBiJmDIGycjnYELOikyYg3ts3Sh0Bone-7jStZcnaFIT0jkXMkT2LG55KVrUVStZAIDyYYQNwkOlahHXhAviMFONL0JIJ7MI13FNklaztZvaAydMd91wFWEeQmqY23j7tRK86yGMRIuYaYROM3WSUecT~8njBo1oVQKPOU1ekUOs--KKrjfCXPyZrvLMr2JyY~CvatZeP4nRoWcogG3mB~9bf-chPqmTmvE-qNPa4OTYaKA__",
  // Add more sub-event mappings here as needed
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