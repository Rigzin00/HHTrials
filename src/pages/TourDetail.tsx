import { useState } from "react";
import { MapPin, CalendarDays, Mountain, Sun,Send,Bookmark,Check, Download} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOUR DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const tour = {
  title: "Silk Route Trails & Tales",
  tags: ["Cultural", "Heritage", "Photography"],
  location: "Ladakh",
  duration: "9N / 10D",
  difficulty: "Moderate",
  bestSeason: "Summer",
  heroImage: "/T_detail.svg", // Hero image path

  overview:
    "Silk Route Trails & Tales is a cultural journey through Ladakh's ancient trade routes that once connected Central Asia, Tibet, and the Indian subcontinent. This experience goes beyond sightseeing, allowing travelers to explore monasteries, villages, rock art sites, and living traditions shaped by centuries of movement, exchange, and belief. The journey is slow, immersive, and deeply connected to the people and landscapes of the Himalayas.",

  highlights: [
    "Walk along ancient Silk Route paths",
    "Visit historic monasteries and sacred sites",
    "Interact with local village communities",
    "Experience Ladakhi culture, food, and traditions",
    "Learn about trade history and Himalayan heritage",
    "Photograph dramatic Himalayan vistas and desert valleys",
  ],

  inclusions: [
    "Accommodation during the journey",
    "Local cultural guide",
    "Transportation during the tour",
    "Guided monastery and village visits",
    "Cultural interactions and heritage walks",
  ],

  exclusions: [
    "Personal expenses",
    "Travel insurance",
    "Flights to and from Leh",
    "Anything not mentioned under inclusions",
  ],

  accommodation: {
    title: "Accommodation",
    description:
      "Stay in a mix of locally run guesthouses and traditional homestays. These accommodations offer basic comfort while allowing meaningful interaction with hosts and insight into everyday Ladakhi life.",
    image: null,
  },

  videoSection: {
    title: "Glimpse of Nomadic Life",
    description:
      "The Nomadic Festival aims to celebrate the distinct culture of the Changpa tribe by highlighting their unique heritage including traditional lifestyle, dresses, foods, songs, dances, music and sports.",
    videoUrl: "",
  },

  mapSection: {
    title: "Route & Region Map",
    description:
      "The route follows sections of the ancient Silk Route through Leh, Sham Valley, Lamayuru, Nubra Valley, and surrounding regions, highlighting historically important trade and cultural corridors.",
    googleMapsEmbedUrl: "",
    centerLat: 34.1526,
    centerLng: 77.5771,
  },

  recommendedTours: [
    {
      id: 1,
      title: "Bon & Balti – Back to Roots",
      location: "Ladakh",
      tags: ["Cultural", "Indigenous"],
      duration: "5N / 6D",
      image: null,
    },
    {
      id: 2,
      title: "Glimpse of Ladakh",
      location: "Ladakh",
      tags: ["Cultural", "Introductory"],
      duration: "5N / 6D",
      image: null,
    },
    {
      id: 3,
      title: "Cultural & Heritage Tour",
      location: "Ladakh",
      tags: ["Cultural", "Heritage"],
      duration: "Custom / Flexible",
      image: null,
    },
  ],

  reviews: [
    {
      name: "Aditi Sharma",
      origin: "India",
      date: "March 2024",
      rating: 5,
      review:
        "The Silk Route journey felt like walking through history. Every village, monastery, and story shared by the guide added meaning to the landscapes we saw. It wasn't rushed or touristy — just deeply immersive and thoughtful.",
      avatar: null,
    },
    {
      name: "Lucas Meyer",
      origin: "Germany",
      date: "October 2023",
      rating: 5,
      review:
        "This tour showed me Ladakh beyond the usual routes. The cultural explanations, local interactions, and slow pace made the experience truly special. I returned with a much deeper respect for Himalayan life and heritage.",
      avatar: null,
    },
    {
      name: "Neha Kulkarni",
      origin: "India",
      date: "September 2024",
      rating: 5,
      review:
        "What stood out was the storytelling. From ancient trade routes to everyday village life, everything felt authentic. This wasn't just a trip — it felt like learning Ladakh from the inside.",
      avatar: null,
    },
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ITINERARY DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const defaultItinerary = [
  {
    day: 1,
    title: "Arrival in Leh",
    description:
      "Arrive in Leh and rest for acclimatization. Evening orientation and introduction to Ladakhi culture.",
    image: null,
  },
  {
    day: 2,
    title: "Leh to Sham Valley",
    description:
      "Explore old forts, local markets, old palaces, and Indus riverline. Learn about Ladakh's role as a caravan crossroads.",
    image: null,
  },
  {
    day: 3,
    title: "Trek Along the Lakes",
    description:
      "Travel through villages along the lakes today. Visit ancient monasteries and interact with local families.",
    image: null,
  },
  {
    day: 4,
    title: "Sham's Valley to Lamayuru",
    description:
      "Visit Lamayuru monastery and nearby heritage sites. Learn about monastic life and sacred landscapes.",
    image: null,
  },
  {
    day: 5,
    title: "Nubra Valley Exploration",
    description:
      "Journey across high mountain passes. Explore Nubra's villages and historical Silk Route traces.",
    image: null,
  },
  {
    day: 6,
    title: "Visit Monasteries",
    description:
      "Visit monasteries, interact with local communities, and understand the preserved Silk Route's history.",
    image: null,
  },
  {
    day: 7,
    title: "Nubra to Pangong Region",
    description:
      "Travel through high-terrain terrain with stops at cultural and scenic points.",
    image: null,
  },
  {
    day: 8,
    title: "Pangong Lake",
    description:
      "Follow your journey with reflective stops. Witness the surreal shades of the ancient lake landscape.",
    image: null,
  },
  {
    day: 9,
    title: "Heritage Activities",
    description:
      "Take local interactions, photography trips, or explore heritage activities.",
    image: null,
  },
  {
    day: 10,
    title: "Departure",
    description:
      "Departure from Leh with a deeper understanding of Ladakh's living heritage.",
    image: null,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DESIGN TOKENS  (single source of truth for colors/spacing)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const COLOR = {
  dark:        "#1a0e04",
  darkBrown:   "#2a1a0e",
  brand:       "#3b1408",
  brandHover:  "#5c2010",
  amber:       "#f59e0b",
  amberHover:  "#d97706",
  green:       "#22c55e",
  red:         "#ef4444",
  textPrimary: "#1a1a1a",
  textMuted:   "#6b7280",
  textFaint:   "#9ca3af",
  bgLight:     "#f9f7f4",
  bgMid:       "#f2f0eb",
  border:      "#ece8e2",
};

const FONT = {
  body: "'Inter',sans,sans-serif"
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL STYLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Hero ── */
  .hero-overlay {
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.80) 0%,
      rgba(0,0,0,0.40) 0%,
      rgba(0,0,0,0.10) 00%
    );
  }

  /* ── Tags ── */
  .tag-pill {
    background: ${COLOR.amber};
    transition: background 0.3s, transform 0.2s;
  }
  .tag-pill:hover { background: ${COLOR.amberHover}; transform: translateY(-1px); }

  /* ── Hero buttons ── */
  .btn-primary {
    background: ${COLOR.brand};
    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
  }
  .btn-primary:hover {
    background: ${COLOR.brandHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59,20,8,0.45);
  }
  .btn-secondary {
    border: 1.5px solid rgba(255,255,255,0.75);
    background: transparent;
    transition: background 0.3s, border-color 0.3s, transform 0.2s;
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.12);
    border-color: white;
    transform: translateY(-2px);
  }
  .bookmark-btn { transition: transform 0.2s; }
  .bookmark-btn:hover { transform: scale(1.12); }

  /* ── Fixed CTA bar buttons ── */
  .btn-cta-white {
    background: white;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-cta-white:hover { background: #f0ebe5; transform: translateY(-1px); }
  .btn-cta-outline {
    border: 1.5px solid rgba(255,255,255,0.65);
    background: transparent;
    transition: background 0.3s, border-color 0.3s, transform 0.2s;
  }
  .btn-cta-outline:hover {
    background: rgba(255,255,255,0.08);
    border-color: white;
    transform: translateY(-1px);
  }

  /* ── Highlight row hover ── */
  .highlight-item { transition: transform 0.2s; }
  .highlight-item:hover { transform: translateX(4px); }

  /* ── Itinerary action buttons ── */
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 6px;
    border: 1.2px solid #c8c0b8;
    background: transparent;
    color: #555;
    font-size: 0.73rem;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.25s, color 0.25s, border-color 0.25s;
    font-family: 'Source Serif 4', serif;
  }
  .action-btn:hover { background: ${COLOR.textPrimary}; color: white; border-color: ${COLOR.textPrimary}; }

  /* ── Timeline image zoom ── */
  .timeline-img-wrap { overflow: hidden; border-radius: 8px; }
  .timeline-img-wrap:hover > * { transform: scale(1.06); }

  /* ── Recommended tour cards ── */
  .rec-card { transition: box-shadow 0.3s ease, transform 0.2s ease; }
  .rec-card:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
    transform: translateY(-3px);
  }
  .rec-card:hover .rec-card-img { transform: scale(1.05); }
  .rec-view-btn:hover { background: #333 !important; }
  .rec-nav-btn:hover  { background: #d1d5db !important; }
  .rec-see-all:hover  { background: #f9fafb !important; }

  /* ── Responsive breakpoints ── */
  @media (max-width: 640px) {
    .timeline-desktop   { display: none !important; }
    .timeline-mobile    { display: flex !important; }
    .hero-title         { font-size: 1.55rem !important; }
    .hero-btns          { flex-direction: column; align-items: flex-start; }
    .highlights-grid    { grid-template-columns: 1fr !important; }
    .inc-exc-grid       { grid-template-columns: 1fr !important; }
    .accom-grid         { grid-template-columns: 1fr !important; }
    .video-grid         { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 641px) {
    .timeline-desktop { display: block !important; }
    .timeline-mobile  { display: none !important; }
  }
  @media (min-width: 768px)  { #rec-grid { grid-template-columns: repeat(2, 1fr) !important; } }
  @media (min-width: 1024px) { #rec-grid { grid-template-columns: repeat(3, 1fr) !important; } }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SMALL REUSABLE COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** One meta-info chip in the hero bar */
const InfoItem = ({ icon: Icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "rgba(255,255,255,0.9)",
      fontSize: "0.875rem",
    }}
  >
    <Icon size={15} strokeWidth={1.6} color="rgba(255,255,255,0.9)" />
    <span>{label}</span>
  </div>
);

/** Green check circle used in Highlights & Inclusions */
const GreenCheck = () => (
  <div
    style={{
      flexShrink:0,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: COLOR.green,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
    }}
  >
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/** Fallback when heroImage is not provided */
const HeroPlaceholder = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, #b0bec5 0%, #78909c 40%, #546e7a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    }}
  >
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" opacity="0.45">
      <rect x="4" y="12" width="48" height="34" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="19" cy="26" r="5" stroke="white" strokeWidth="2.2" fill="none" />
      <path d="M4 38l13-10 9 8 8-7 18 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
      Hero Image Placeholder
    </span>
  </div>
);

/** Fallback tile inside timeline cards */
const TimelineImgPlaceholder = ({ day }) => (
  <div
    style={{
      width: "100%",
      aspectRatio: "16/10",
      borderRadius: 8,
      background: "linear-gradient(135deg, #d6cfc8 0%, #b0a89e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      transition: "transform 0.35s ease",
    }}
  >
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" opacity="0.45">
      <rect x="2" y="5" width="24" height="18" rx="2.5" stroke="#3b2a1a" strokeWidth="1.8" fill="none" />
      <circle cx="9" cy="12" r="2.5" stroke="#3b2a1a" strokeWidth="1.6" fill="none" />
      <path d="M2 20l7-6 5 5 4-4 8 7" stroke="#3b2a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    <span style={{ fontSize: "0.58rem", color: "#3b2a1a", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      Day {day}
    </span>
  </div>
);

/** Single itinerary card (image + day label + title + description) */
const TimelineCard = ({ item }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
    <div className="timeline-img-wrap">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: 8, display: "block", transition: "transform 0.35s ease" }}
        />
      ) : (
        <TimelineImgPlaceholder day={item.day} />
      )}
    </div>
    <div style={{ paddingTop: 4 }}>
      <p style={{ fontSize: "0.67rem", fontWeight: 700, color: "#3b1408", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
        Day {item.day}
      </p>
      <p style={{ fontSize: "0.83rem", fontWeight: 600, color: COLOR.textPrimary, marginBottom: 5, lineHeight: 1.35 }}>
        {item.title}
      </p>
      <p style={{ fontSize: "0.75rem", color: COLOR.textMuted, lineHeight: 1.7, fontWeight: 400 }}>
        {item.description}
      </p>
    </div>
  </div>
);

/** Generic image placeholder used in Accommodation & Recommended cards */
const ImgPlaceholder = ({ aspectRatio = "4/3", size = 40 }) => (
  <div
    style={{
      width: "100%",
      aspectRatio,
      borderRadius: 8,
      background: "linear-gradient(135deg, #d6cfc8 0%, #b0a89e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" opacity="0.4">
      <rect x="3" y="8" width="34" height="24" rx="3" stroke="#3b2a1a" strokeWidth="2" fill="none" />
      <circle cx="13" cy="18" r="3.5" stroke="#3b2a1a" strokeWidth="1.8" fill="none" />
      <path d="M3 28l9-8 7 7 5-5 13 9" stroke="#3b2a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    <span style={{ fontSize: "0.63rem", color: "#3b2a1a", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Source Serif 4, serif" }}>
      Image Placeholder
    </span>
  </div>
);

/** Download / send SVG icon */
const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1v8M3 6l3.5 3.5L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/* ── 1. HERO ──────────────────────────────────────────── */
const HeroSection = ({ tourData, bookmarked, onBookmark }) => {
  const { title, tags, location, duration, difficulty, bestSeason, heroImage } = tourData;
  return (
    <section style={{ position: "relative", width: "100%", height: "82vh", minHeight: 480, display: "flex", alignItems: "flex-end" }}>
      {/* Background */}
      {heroImage ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <HeroPlaceholder />
      )}
      <div className="hero-overlay" style={{ position: "absolute", inset: 0 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 70px 52px" }}>
        <h1
          className="hero-title"
          style={{
            color: "white",
            fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
            fontWeight: 400,
            fontFamily: FONT.body,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {title}
        </h1>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-pill"
              style={{ color: "white", fontSize: "0.70rem", fontWeight:500, padding: "4px 13px", borderRadius: 999, cursor: "default", letterSpacing: "0.03em" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta info */}
       <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 22px",
    marginBottom: 28,
  }}
>
  <InfoItem icon={MapPin} label={location} />
  <InfoItem icon={CalendarDays} label={duration} />
  <InfoItem icon={Mountain} label={difficulty} />
  <InfoItem icon={Sun} label={`Best Season: ${bestSeason}`} />
</div>
        {/* CTA buttons */}
        <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
          <button
              className="
                flex items-center gap-2
                px-6 py-2
                rounded-xl
                bg-[#1a0903]
                text-white
                font-sans
                text-md
                transition-all duration-300
                hover:bg-yellow-500
                hover:text-black
              "
            >
              <Send
                size={16}
                strokeWidth={2}
                className="transition-colors duration-300"
              />
              Enquire Now
            </button>
          <button
              className="
                px-6 py-2
                rounded-xl
                border border-white/70
                text-white
                font-sans
                text-[15px]
                tracking-tight
                transition-all duration-300
                hover:bg-yellow-500
                hover:text-black
                hover:border-yellow-500
              "
            >
              Customize Tour
            </button>

          <button
            onClick={onBookmark}
            title={bookmarked ? "Saved" : "Save tour"}
            className={`
              w-10 h-9
              flex items-center justify-center
              rounded-lg
              border border-white/40
              backdrop-blur-sm
              transition-all duration-300
              ${
                bookmarked
                  ? "bg-yellow-500 border-yellow-500"
                  : "bg-white/10 hover:bg-yellow-500 hover:border-yellow-500"
              }
              hover:scale-105 active:scale-95
            `}
          >
            <Bookmark
              size={18}
              strokeWidth={1.8}
              className={`
                transition-colors duration-300
                ${
                  bookmarked
                    ? "fill-black text-black"
                    : "text-white group-hover:text-black"
                }
              `}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── 2. OVERVIEW ──────────────────────────────────────── */
const OverviewSection = ({ overview }) => (
  <section className="bg-white py-[50px]">
  <div className="max-w-[900px] mx-auto px-1">

    <h2
      className="
        font-display
        font-bold
        text-[clamp(1.6rem,2.5vw,2rem)]
        text-[#1a1a1a]
        mb-3
        tracking-tight
      "
    >
      Overview
    </h2>

    <p
      className="
        max-w-[850px]
        text-[0.95rem]
        text-gray-500
        leading-[1.95]
        font-body
      "
    >
      {overview}
    </p>

  </div>
</section>
);

/* ── 3. HIGHLIGHTS ────────────────────────────────────── */
const HighlightsSection = ({ highlights }) => (
  <section className="bg-[#f5f2ee] py-[56px]">
  <div className="max-w-[980px] mx-auto px-10">

    {/* Heading */}
    <h2
      className="
        font-display
        font-semibold
        text-[clamp(0.5rem,2.5vw,2.9rem)]
        text-[#1a1a1a]
        mb-8
        tracking-tight
      "
    >
      Highlights
    </h2>

    {/* Grid */}
    <div className="grid grid-cols-2 gap-y-6 gap-x-16">

      {highlights.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#140804] shrink-0 mt-0.5">
            <Check size={14} strokeWidth={3} className="text-white" />
          </div>

          <span
            className="
              font-body
              text-[0.9rem]
              text-[#4a5565]
              leading-[1.65]
            "
          >
            {item}
          </span>
        </div>
      ))}

    </div>

  </div>
</section>
);

/* ── 4. ITINERARY ─────────────────────────────────────── */
const ItinerarySection = ({ itinerary }) => (
  <section className="bg-[#fffdfb] py-[76px] border-t border-[#ece8e3] font-sans">
  <div className="max-w-[900px] mx-auto px-10">

    {/* Display Heading */}
              <h2
                className="
                  text-center
                  font-display
                  font-bold
                  text-[clamp(1.8rem,2vw,2.3rem)]
                  text-[#2a0f06]
                  mb-14
                  tracking-[-0.01em]
                "
              >
                Walk Through the Experience
              </h2>

              {/* Action buttons */}
              <div className="flex justify-center gap-3 mb-14 font-sans">
            
            
            <button
              className="
                group
                flex items-center gap-2
                font-semibold
                px-4 py-2
                text-[13px]
                border border-gray-300
                rounded-md
                text-gray-700
                bg-white
                transition-all duration-300
                hover:bg-[#2a0f06]
                hover:text-white
                hover:border-[#2a0f06]
              "
            >
              <FaWhatsapp
                size={14}
                className="transition-colors duration-300 group-hover:text-white"
              />
              Send Itinerary
            </button>

            {/* Download Button */}
            <button
              className="
                group
                flex items-center gap-2
                px-4 py-2
                text-[13px]
                font-semibold
                border border-gray-300
                rounded-md
                text-gray-700
                bg-white
                transition-all duration-300
                hover:bg-[#2a0f06]
                hover:text-white
                hover:border-[#2a0f06]
              "
            >
              <Download
                size={14}
                strokeWidth={1.8}
                className="transition-colors duration-300 group-hover:text-white"
              />
              Download Itinerary
            </button>

          </div>
      {/* ── Desktop zigzag timeline ── */}
      <div className="timeline-desktop relative">

  {/* Spine */}
  <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#2a0f06] -translate-x-1/2 z-0" />

  <div className="flex flex-col">

    {itinerary.map((item, idx) => {
      const isLeft = idx % 2 === 0;
      const TimelineImage = ({ item }) => (
        <div className="rounded-md overflow-hidden shadow-md bg-[#2a0f06]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[130px] object-cover"
          />
          <div className="text-[11px] text-white text-center py-1">
            {item.title}
          </div>
        </div>
      );
      const TimelineText = ({ item }) => (
        <div className="font-sans">
          <p className="text-[16px] font-semibold text-[#2a0f06] mb-1">
            Day {item.day}
          </p>
          <p className="text-[13px] text-gray-600 leading-[1.6]">
            {item.description}
          </p>
        </div>
      );
      return (
        <div
          key={item.day}
          className="grid grid-cols-[1fr_40px_1fr] items-start relative z-10 mb-14"
        >

          {/* LEFT COLUMN */}
          <div className="flex justify-end pr-7">
            {isLeft ? (
              <div className="w-[200px]">
                <TimelineImage item={item} />
              </div>
            ) : (
              <div className="w-[220px] text-right">
                <TimelineText item={item} />
              </div>
            )}
          </div>

          {/* CENTER DOT */}
          <div className="flex justify-center pt-2">
            <div className="w-[14px] h-[14px] rounded-full bg-[#2a0f06] border-[3px] border-[#f5f2ee] outline outline-[2px] outline-[#2a0f06]" />
          </div>

          {/* RIGHT COLUMN */}
          <div className="pl-7">
            {!isLeft ? (
              <div className="w-[200px]">
                <TimelineImage item={item} />
              </div>
            ) : (
              <div className="w-[220px]">
                <TimelineText item={item} />
              </div>
            )}
          </div>

        </div>
      );
    })}

  </div>
</div>

      {/* ── Mobile single-column timeline ── */}
      <div className="timeline-mobile" style={{ display: "none", flexDirection: "column", position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: COLOR.darkBrown }} />
        {itinerary.map((item, idx) => (
          <div key={item.day} style={{ display: "flex", marginBottom: idx < itinerary.length - 1 ? 42 : 0, position: "relative" }}>
            <div style={{ position: "absolute", left: -28, top: 10, width: 12, height: 12, borderRadius: "50%", background: COLOR.darkBrown, border: `2px solid ${COLOR.bgLight}`, outline: `1.5px solid ${COLOR.darkBrown}` }} />
            <div style={{ width: 160 }}>
              <TimelineCard item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── 5. INCLUSIONS & EXCLUSIONS ───────────────────────── */
const InclusionsSection = ({ inclusions, exclusions }) => (
  <section style={{ background: COLOR.bgMid, padding: "68px 0" }}>
    <div
      style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 64px" }}
      className="inc-exc-grid"
    >
      {/* Inclusions */}
      <div>
        <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 26, fontFamily: FONT.body }}>
          Inclusions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {inclusions.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9.5l4 4 8-8" stroke={COLOR.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div>
        <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 26, fontFamily: FONT.body }}>
          Exclusions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {exclusions.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke={COLOR.red} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── 6. ACCOMMODATION ─────────────────────────────────── */
const AccommodationSection = ({ accommodation }) => (
  <section style={{ background: "white", padding: "68px 0" }}>
    <div
      style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px", alignItems: "center" }}
      className="accom-grid"
    >
      {/* Image */}
      <div style={{ overflow: "hidden", borderRadius: 10 }}>
        {accommodation.image ? (
          <img
            src={accommodation.image}
            alt={accommodation.title || "Accommodation"}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 10, display: "block" }}
          />
        ) : (
          <ImgPlaceholder aspectRatio="4/3" size={40} />
        )}
      </div>

      {/* Text */}
      <div>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 20, fontFamily: FONT.body }}>
          {accommodation.title || "Accommodation"}
        </h2>
        <p style={{ fontSize: "0.91rem", color: COLOR.textMuted, lineHeight: 1.9, maxWidth: 420 }}>
          {accommodation.description}
        </p>
      </div>
    </div>
  </section>
);

/* ── 7. VIDEO ─────────────────────────────────────────── */
const VideoSection = ({ videoSection }) => (
  <section style={{ background: "#111", padding: "68px 0" }}>
    <div
      style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px", alignItems: "center" }}
      className="video-grid"
    >
      {/* Video embed or placeholder */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 10, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.1)" }}>
        {videoSection.videoUrl ? (
          <iframe
            src={videoSection.videoUrl}
            title={videoSection.title || "Tour Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(192,57,43,0.55)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 4l12 6-12 6V4z" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: "0.64rem", color: "rgba(255,255,255,0.32)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Paste video URL to embed
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div>
        <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "white", marginBottom: 20, fontFamily: FONT.body, lineHeight: 1.25 }}>
          {videoSection.title || "Glimpse of Nomadic Life"}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.9, fontWeight: 300, maxWidth: 380 }}>
          {videoSection.description}
        </p>
        {!videoSection.videoUrl && (
          <p style={{ marginTop: 20, fontSize: "0.71rem", color: "rgba(255,255,255,0.22)", fontStyle: "italic" }}>
            Set{" "}
            <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontStyle: "normal" }}>
              videoSection.videoUrl
            </code>{" "}
            in tour data to embed a video.
          </p>
        )}
      </div>
    </div>
  </section>
);

/* ── 8. MAP ───────────────────────────────────────────── */
const MapSection = ({ mapSection }) => (
  <section style={{ background: COLOR.bgLight, padding: "76px 0" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
      <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 14, fontFamily: FONT.body }}>
        {mapSection.title || "Route & Region Map"}
      </h2>
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: COLOR.textMuted, lineHeight: 1.8, maxWidth: 620, margin: "0 auto 34px" }}>
        {mapSection.description}
      </p>

      {/* Map container */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid #e5e0d8`, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
        {mapSection.googleMapsEmbedUrl ? (
          <iframe
            src={mapSection.googleMapsEmbedUrl}
            title="Route & Region Map"
            width="100%"
            height="430"
            style={{ border: "none", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div style={{ width: "100%", height: 430, background: "linear-gradient(135deg, #ddd8ce 0%, #c8c0b4 50%, #b8b0a4 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            {/* Map pin SVG */}
            <div style={{ width: 48, height: 48, borderRadius: "50% 50% 50% 0", background: "#e53e3e", transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(229,62,62,0.45)" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", transform: "rotate(45deg)" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.78rem", color: "#3b2a1a", opacity: 0.6, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
                Google Map Placeholder
              </p>
              <p style={{ fontSize: "0.69rem", color: "#3b2a1a", opacity: 0.45, maxWidth: 300, lineHeight: 1.65 }}>
                Set{" "}
                <code style={{ background: "rgba(0,0,0,0.08)", padding: "1px 5px", borderRadius: 3 }}>
                  mapSection.googleMapsEmbedUrl
                </code>{" "}
                in tour data to embed your Google Map.
              </p>
              <p style={{ fontSize: "0.63rem", color: "#3b2a1a", opacity: 0.35, marginTop: 8, lineHeight: 1.6 }}>
                Google Maps → Share → Embed a map → Copy iframe src
              </p>
            </div>
          </div>
        )}
      </div>

      {!mapSection.googleMapsEmbedUrl && (
        <p style={{ textAlign: "center", marginTop: 14, fontSize: "0.71rem", color: "#aaa", fontStyle: "italic" }}>
          Centered on Leh, Ladakh ({mapSection.centerLat}°N, {mapSection.centerLng}°E)
        </p>
      )}
    </div>
  </section>
);

/* ── 9. REVIEWS ───────────────────────────────────────── */
const ReviewsSection = ({ reviews }) => (
  <section style={{ background: COLOR.bgMid, padding: "76px 0" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: "1.2rem", color: "#bbb", letterSpacing: "0.18em", marginBottom: 6 }}>···</p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: COLOR.textPrimary, fontFamily: FONT.body }}>
          Traveler Stories
        </h2>
      </div>

      {/* Review cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 14,
              padding: "26px 30px",
              border: `1px solid ${COLOR.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Avatar */}
                {r.avatar ? (
                  <img src={r.avatar} alt={r.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `hsl(${(i * 73 + 200) % 360}, 35%, 60%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      fontFamily: FONT.body,
                    }}
                  >
                    {r.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 3, fontFamily: FONT.body }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: "0.74rem", color: COLOR.textFaint }}>
                    {r.origin} · {r.date}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div style={{ display: "flex", gap: 3, flexShrink: 0, paddingTop: 3 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="16" height="16" viewBox="0 0 16 16" fill={si < r.rating ? COLOR.amber : "#e5e7eb"}>
                    <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Review body */}
            <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.8 }}>
              {r.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── 10. RECOMMENDED TOURS ────────────────────────────── */
const RecommendedSection = ({ recommendedTours, currentTitle }) => (
  <section style={{ background: "#f5f5f5", padding: "72px 0" }}>
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px" }}>

      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 14l4-5 3 3 3-4 4 5" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#2b2b2b", fontFamily: FONT.body }}>
            Recommended for You
          </h2>
        </div>
        <p style={{ fontSize: "0.84rem", color: "#4A5565" }}>
          Because you viewed{" "}
          <span style={{ color: "#2b2b2b", fontWeight: 600 }}>{currentTitle}</span>
        </p>
      </div>

      {/* Card grid */}
      <div
        id="rec-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 32 }}
      >
        <style>{`
          @media (min-width: 768px)  { #rec-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (min-width: 1024px) { #rec-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        `}</style>

        {recommendedTours.map((t) => (
          <div
            key={t.id}
            className="rec-card"
            style={{ background: "white", borderRadius: 14, overflow: "hidden", border: `1px solid #e5e7eb`, display: "flex", flexDirection: "column" }}
          >
            {/* Card image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#2d2d2d", flexShrink: 0 }}>
              {t.image ? (
                <img
                  className="rec-card-img"
                  src={t.image}
                  alt={t.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                />
              ) : (
                <div className="rec-card-img" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.4s ease" }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity="0.25">
                    <rect x="2" y="6" width="32" height="23" rx="3" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="11" cy="15" r="3.5" stroke="white" strokeWidth="1.8" fill="none" />
                    <path d="M2 27l9-8 7 7 5-5 11 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              )}
              {/* Badge */}
              <div style={{ position: "absolute", top: 12, left: 12, background: COLOR.amber, color: "white", fontSize: "0.67rem", fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
                Recommended
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "18px 18px 0", flex: 1 }}>
              <h3 style={{ fontSize: "0.96rem", fontWeight: 700, color: COLOR.textPrimary, marginBottom: 8, lineHeight: 1.35, fontFamily: FONT.body }}>
                {t.title}
              </h3>

              {/* Location */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke={COLOR.textFaint} strokeWidth="1.2" fill="none" />
                  <circle cx="6" cy="4.5" r="1.2" fill={COLOR.textFaint} />
                </svg>
                <span style={{ fontSize: "0.78rem", color: COLOR.textFaint }}>{t.location}</span>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {t.tags.map((tag) => (
                  <span key={tag} style={{ background: COLOR.amber, color: "white", fontSize: "0.64rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Duration */}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="2" width="10" height="9" rx="1.5" stroke={COLOR.textFaint} strokeWidth="1.2" fill="none" />
                  <path d="M1 5h10M4 1v2M8 1v2" stroke={COLOR.textFaint} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: "0.78rem", color: COLOR.textMuted }}>{t.duration}</span>
              </div>
            </div>

            {/* View Details button */}
            <div style={{ padding: 18 }}>
              <button
                className="rec-view-btn"
                style={{ width: "100%", background: COLOR.textPrimary, color: "white", border: "none", borderRadius: 8, padding: "12px 16px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.3s ease", fontFamily: FONT.body }}
              >
                View Details
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 44 }}>
        <button className="rec-nav-btn" style={{ background: "#e5e7eb", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s ease" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="rec-nav-btn" style={{ background: "#e5e7eb", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s ease" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button className="rec-see-all" style={{ background: "white", border: "1px solid #d1d5db", borderRadius: 8, padding: "9px 18px", fontSize: "0.875rem", color: "#374151", cursor: "pointer", transition: "background 0.3s ease", fontFamily: FONT.body }}>
          See All Tours →
        </button>
      </div>
    </div>
  </section>
);

/* ── 11. FIXED BOTTOM CTA BAR ─────────────────────────── */
const FixedCTABar = () => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: COLOR.dark,
      padding: "14px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      boxShadow: "0 -2px 18px rgba(0,0,0,0.4)",
      fontFamily: FONT.body,
    }}
  >
    <div>
      <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>
        Ready to explore the Silk Route?
      </p>
      <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.74rem", fontWeight: 300, margin: "3px 0 0" }}>
        Connect with us to plan your journey
      </p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
      <button
        className="btn-cta-white"
        style={{ color: "#1a1a1a", fontSize: "0.85rem", fontWeight: 600, padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, background: "white", fontFamily: FONT.body }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 6-12 6V8.5l8-1.5-8-1.5V1z" fill="#1a1a1a" />
        </svg>
        Enquire Now
      </button>
      <button
        className="btn-cta-outline"
        style={{ color: "white", fontSize: "0.85rem", fontWeight: 600, padding: "10px 22px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.6)", background: "transparent", cursor: "pointer", fontFamily: FONT.body }}
      >
        Customize Tour
      </button>
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function TourPage({ tourData = tour, itinerary = defaultItinerary }) {
  const [bookmarked, setBookmarked] = useState(false);

  const {
    title,
    overview,
    highlights,
    inclusions = [],
    exclusions = [],
    accommodation = {},
    videoSection = {},
    mapSection = {},
    reviews = [],
    recommendedTours = [],
  } = tourData;

  return (
    <div
      style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        minHeight: "100vh",
        paddingBottom: 72,
        color: COLOR.textPrimary,
      }}
    >
      {/* Inject global styles */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Sections ────────────────────────────────── */}
      <HeroSection
        tourData={tourData}
        bookmarked={bookmarked}
        onBookmark={() => setBookmarked((b) => !b)}
      />
      <OverviewSection overview={overview} />
      <HighlightsSection highlights={highlights} />
      <ItinerarySection itinerary={itinerary} />
      <InclusionsSection inclusions={inclusions} exclusions={exclusions} />
      <AccommodationSection accommodation={accommodation} />
      <VideoSection videoSection={videoSection} />
      <MapSection mapSection={mapSection} />
      <ReviewsSection reviews={reviews} />
      <RecommendedSection recommendedTours={recommendedTours} currentTitle={title} />

      {/* ── Fixed bottom CTA ────────────────────────── */}
      <FixedCTABar />
    </div>
  );
}