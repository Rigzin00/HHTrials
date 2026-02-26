import { useState } from "react";

// ─── Tour Data ────────────────────────────────────────────────────────────────
const tour = {
  title: "Silk Route Trails & Tales",
  tags: ["Cultural", "Heritage", "Photography"],
  location: "Ladakh",
  duration: "9N / 10D",
  difficulty: "Moderate",
  bestSeason: "Summer",
  heroImage: null, // Set to an image URL to replace the placeholder
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
    description: "Stay in a mix of locally run guesthouses and traditional homestays. These accommodations offer basic comfort while allowing meaningful interaction with hosts and insight into everyday Ladakhi life.",
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
      duration: "5N/6D",
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
        "The Silk Route journey felt like walking through history. Every village, monastery, and story shared by the guide added meaning to the landscapes we saw. It wasn't rushed or touristy just deeply immersive and thoughtful.",
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
        "What stood out was the storytelling. From ancient trade routes to everyday village life, everything felt authentic. This wasn't just a trip it felt like learning Ladakh from the inside.",
      avatar: null,
    },
  ],
};

// ─── Itinerary Data ───────────────────────────────────────────────────────────
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

// ─── Shared small components ──────────────────────────────────────────────────
const InfoItem = ({ icon, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: "0.875rem" }}>
    <span style={{ fontSize: "0.875rem", opacity: 0.85 }}>{icon}</span>
    <span>{label}</span>
  </div>
);

const CheckIcon = () => (
  <div
    style={{
      flexShrink: 0,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#22c55e",
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
    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
      Hero Image Placeholder
    </span>
  </div>
);

const TimelineImagePlaceholder = ({ day }) => (
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

const TimelineItem = ({ item }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
    <div className="timeline-img-hover" style={{ overflow: "hidden", borderRadius: 8 }}>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: 8, display: "block", transition: "transform 0.35s ease" }}
        />
      ) : (
        <TimelineImagePlaceholder day={item.day} />
      )}
    </div>
    <div style={{ paddingTop: 4 }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "#3b1408", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
        Day {item.day}
      </p>
      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1a1a", marginBottom: 4, lineHeight: 1.35 }}>
        {item.title}
      </p>
      <p style={{ fontSize: "0.75rem", color: "#888", lineHeight: 1.65, fontWeight: 400 }}>
        {item.description}
      </p>
    </div>
  </div>
);

// ─── Main combined page ───────────────────────────────────────────────────────
export default function TourPage({ tourData = tour, itinerary = defaultItinerary }) {
  const { title, tags, location, duration, difficulty, bestSeason, heroImage, overview, highlights, inclusions = [], exclusions = [], accommodation = {}, videoSection = {}, mapSection = {}, reviews = [], recommendedTours = [] } = tourData;
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", paddingBottom: 72 }}>
      {/* ════ FIXED BOTTOM CTA BAR ════ */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#1e0c04",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          boxShadow: "0 -2px 16px rgba(0,0,0,0.35)",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}
        className="fixed-cta-bar"
      >
        <div>
          <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>
            Ready to explore the Silk Route?
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 300, margin: "2px 0 0" }}>
            Connect with us to plan your journey
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button
            className="btn-cta-white"
            style={{
              color: "#1a1a1a",
              fontSize: "0.85rem",
              fontWeight: 500,
              padding: "9px 22px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "white",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 6-12 6V8.5l8-1.5-8-1.5V1z" fill="#1a1a1a"/>
            </svg>
            Enquire Now
          </button>
          <button
            className="btn-cta-outline"
            style={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 500,
              padding: "9px 22px",
              borderRadius: 8,
              border: "1.5px solid rgba(255,255,255,0.6)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Customize Tour
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Hero ── */
        .hero-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%);
        }
        .tag-pill { background: #f59e0b; transition: background 0.3s, transform 0.2s; }
        .tag-pill:hover { background: #d97706; transform: translateY(-1px); }

        .btn-primary { background: #3b1408; transition: background 0.3s, transform 0.2s, box-shadow 0.3s; }
        .btn-primary:hover { background: #5c2010; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,20,8,0.4); }

        .btn-secondary { border: 1.5px solid rgba(255,255,255,0.75); background: transparent; transition: background 0.3s, border-color 0.3s, transform 0.2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.12); border-color: white; transform: translateY(-2px); }

        .btn-cta-white { background: white; transition: background 0.3s, transform 0.2s; }
        .btn-cta-white:hover { background: #f0ebe5; transform: translateY(-1px); }

        .btn-cta-outline { border: 1.5px solid rgba(255,255,255,0.65); background: transparent; transition: background 0.3s, border-color 0.3s, transform 0.2s; }
        .btn-cta-outline:hover { background: rgba(255,255,255,0.08); border-color: white; transform: translateY(-1px); }

        .highlight-item { transition: transform 0.2s; }
        .highlight-item:hover { transform: translateX(3px); }

        .bookmark-btn { transition: transform 0.2s; }
        .bookmark-btn:hover { transform: scale(1.1); }

        /* ── Timeline ── */
        .action-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 6px; border: 1.2px solid #c8c0b8;
          background: transparent; color: #555; font-size: 0.72rem; font-weight: 500;
          cursor: pointer; letter-spacing: 0.01em;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .action-btn:hover { background: #1a1a1a; color: white; border-color: #1a1a1a; }

        .timeline-img-hover:hover > * { transform: scale(1.05); }

        @media (max-width: 640px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile  { display: flex !important; }
          .hero-title { font-size: 1.6rem !important; }
          .hero-btns { flex-direction: column; align-items: flex-start; }
          .cta-strip { flex-direction: column; text-align: center; }
          .highlights-grid { grid-template-columns: 1fr !important; }
          .inc-exc-grid { grid-template-columns: 1fr !important; }
          .accom-grid { grid-template-columns: 1fr !important; }
          .video-grid { grid-template-columns: 1fr !important; }
          .rec-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) {
          .timeline-desktop { display: block !important; }
          .timeline-mobile  { display: none !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════ */}
      <section style={{ position: "relative", width: "100%", height: "80vh", minHeight: 460, display: "flex", alignItems: "flex-end" }}>
        {heroImage ? (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ) : (
          <HeroPlaceholder />
        )}
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }} />

        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 40px 48px" }}>
          <h1
            className="hero-title"
            style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}
          >
            {title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {tags.map((tag) => (
              <span key={tag} className="tag-pill" style={{ color: "white", fontSize: "0.72rem", fontWeight: 500, padding: "4px 12px", borderRadius: 999, cursor: "default" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", marginBottom: 24 }}>
            <InfoItem icon="📍" label={location} />
            <InfoItem icon="🗓" label={duration} />
            <InfoItem icon="🏔" label={difficulty} />
            <InfoItem icon="☀️" label={`Best Season: ${bestSeason}`} />
          </div>

          <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <button className="btn-primary" style={{ color: "white", fontSize: "0.875rem", fontWeight: 500, padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 6-12 6V8.5l8-1.5-8-1.5V1z" fill="white" />
              </svg>
              Enquire Now
            </button>
            <button className="btn-secondary" style={{ color: "white", fontSize: "0.875rem", fontWeight: 500, padding: "10px 20px", borderRadius: 12, cursor: "pointer" }}>
              Customize Tour
            </button>
            <button
              className="bookmark-btn"
              onClick={() => setBookmarked((b) => !b)}
              title="Save tour"
              style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill={bookmarked ? "white" : "none"} stroke="white" strokeWidth="1.5">
                <path d="M3 2h9a1 1 0 011 1v10l-5-2.5L3 13V3a1 1 0 011-1z" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. OVERVIEW
      ════════════════════════════════════════════════ */}
      <section style={{ background: "white", padding: "56px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 20 }}>
            Overview
          </h2>
          <p style={{ maxWidth: 680, fontSize: "0.925rem", color: "#6b7280", lineHeight: 1.9, fontWeight: 400 }}>
            {overview}
          </p>
        </div>
      </section>

      {/* CTA STRIP — now fixed at bottom, rendered below */}

      {/* ════════════════════════════════════════════════
          4. HIGHLIGHTS
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f9f7f4", padding: "56px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 28 }}>
            Highlights
          </h2>
          <div className="highlights-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 60px" }}>
            {highlights.map((item, i) => (
              <div key={i} className="highlight-item" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <CheckIcon />
                <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. ITINERARY TIMELINE
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f9f7f4", padding: "72px 0 80px", borderTop: "1px solid #ece8e3" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>

          {/* Section title */}
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 14, letterSpacing: "-0.01em" }}>
            Walk Through the Experience
          </h2>

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 56 }}>
            <button className="action-btn">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v8M3 6l3.5 3.5L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Send Itinerary
            </button>
            <button className="action-btn">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v8M3 6l3.5 3.5L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Download Itinerary
            </button>
          </div>

          {/* ── DESKTOP timeline ── */}
          <div className="timeline-desktop" style={{ position: "relative" }}>
            {/* Center spine */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "#2a1a0e", transform: "translateX(-50%)", zIndex: 0 }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {itinerary.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={item.day}
                    style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "start", marginBottom: idx < itinerary.length - 1 ? 52 : 0, position: "relative", zIndex: 1 }}
                  >
                    {/* Left col */}
                    <div style={{ paddingRight: 28, display: "flex", justifyContent: "flex-end" }}>
                      {isLeft && (
                        <div style={{ width: 185 }}>
                          <TimelineItem item={item} />
                        </div>
                      )}
                    </div>

                    {/* Dot */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 10 }}>
                      <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#2a1a0e", border: "2.5px solid #f9f7f4", outline: "1.5px solid #2a1a0e", flexShrink: 0 }} />
                    </div>

                    {/* Right col */}
                    <div style={{ paddingLeft: 28 }}>
                      {!isLeft && (
                        <div style={{ width: 185 }}>
                          <TimelineItem item={item} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE timeline ── */}
          <div className="timeline-mobile" style={{ display: "none", flexDirection: "column", position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: "#2a1a0e" }} />
            {itinerary.map((item, idx) => (
              <div key={item.day} style={{ display: "flex", marginBottom: idx < itinerary.length - 1 ? 40 : 0, position: "relative" }}>
                <div style={{ position: "absolute", left: -28, top: 10, width: 12, height: 12, borderRadius: "50%", background: "#2a1a0e", border: "2px solid #f9f7f4", outline: "1.5px solid #2a1a0e" }} />
                <div style={{ width: 160 }}>
                  <TimelineItem item={item} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6. INCLUSIONS & EXCLUSIONS
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f2f0eb", padding: "64px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 60px" }} className="inc-exc-grid">
          {/* Inclusions */}
          <div>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 24, letterSpacing: "-0.01em" }}>
              Inclusions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {inclusions.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9.5l4 4 8-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 24, letterSpacing: "-0.01em" }}>
              Exclusions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {exclusions.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 3l10 10M13 3L3 13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          7. ACCOMMODATION
      ════════════════════════════════════════════════ */}
      <section style={{ background: "white", padding: "64px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px", alignItems: "center" }} className="accom-grid">
          {/* Image / Placeholder */}
          <div style={{ overflow: "hidden", borderRadius: 8 }}>
            {accommodation.image ? (
              <img
                src={accommodation.image}
                alt={accommodation.title || "Accommodation"}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, display: "block" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #d6cfc8 0%, #b0a89e 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.4">
                  <rect x="3" y="8" width="34" height="24" rx="3" stroke="#3b2a1a" strokeWidth="2" fill="none" />
                  <circle cx="13" cy="18" r="3.5" stroke="#3b2a1a" strokeWidth="1.8" fill="none" />
                  <path d="M3 28l9-8 7 7 5-5 13 9" stroke="#3b2a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span style={{ fontSize: "0.65rem", color: "#3b2a1a", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
                  Image Placeholder
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 20, letterSpacing: "-0.01em" }}>
              {accommodation.title || "Accommodation"}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.85, fontWeight: 400, maxWidth: 400 }}>
              {accommodation.description}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          8. VIDEO SECTION
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#1a1a1a", padding: "64px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px", alignItems: "center" }} className="video-grid">
          {/* Video embed / placeholder */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 10, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            {videoSection.videoUrl ? (
              <iframe
                src={videoSection.videoUrl}
                title={videoSection.title || "Tour Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            ) : (
              /* Placeholder */
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, cursor: "default" }}>
                {/* Play button */}
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(192,57,43,0.5)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 4l12 6-12 6V4z" fill="white" />
                  </svg>
                </div>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
                  Paste video URL to embed
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "white", marginBottom: 20, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
              {videoSection.title || "Glimpse of Nomadic Life"}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, fontWeight: 300, maxWidth: 380 }}>
              {videoSection.description}
            </p>
            {!videoSection.videoUrl && (
              <p style={{ marginTop: 20, fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
                Set <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontStyle: "normal" }}>videoSection.videoUrl</code> in tour data to embed a video.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          9. ROUTE & REGION MAP
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f9f7f4", padding: "72px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>

          {/* Title */}
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: "#1a1a1a", marginBottom: 16, letterSpacing: "-0.01em" }}>
            {mapSection.title || "Route & Region Map"}
          </h2>

          {/* Description */}
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 32px" }}>
            {mapSection.description}
          </p>

          {/* Map container */}
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e5e0d8", background: "#e8e3da", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {mapSection.googleMapsEmbedUrl ? (
              <iframe
                src={mapSection.googleMapsEmbedUrl}
                title="Route & Region Map"
                width="100%"
                height="420"
                style={{ border: "none", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* Placeholder with instructions */
              <div style={{ width: "100%", height: 420, background: "linear-gradient(135deg, #ddd8ce 0%, #c8c0b4 50%, #b8b0a4 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, position: "relative" }}>
                {/* Map pin icon */}
                <div style={{ width: 48, height: 48, borderRadius: "50% 50% 50% 0", background: "#e53e3e", transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(229,62,62,0.4)" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", transform: "rotate(45deg)" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "0.8rem", color: "#3b2a1a", opacity: 0.6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    Google Map Placeholder
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "#3b2a1a", opacity: 0.45, maxWidth: 300, lineHeight: 1.6 }}>
                    Set <code style={{ background: "rgba(0,0,0,0.08)", padding: "1px 5px", borderRadius: 3, fontStyle: "normal" }}>mapSection.googleMapsEmbedUrl</code> in tour data to embed your Google Map.
                  </p>
                  <p style={{ fontSize: "0.65rem", color: "#3b2a1a", opacity: 0.35, marginTop: 8, lineHeight: 1.6 }}>
                    Google Maps → Share → Embed a map → Copy iframe src
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Helper note when no URL is set */}
          {!mapSection.googleMapsEmbedUrl && (
            <p style={{ textAlign: "center", marginTop: 14, fontSize: "0.72rem", color: "#aaa", fontStyle: "italic" }}>
              Centered on Leh, Ladakh ({mapSection.centerLat}°N, {mapSection.centerLng}°E)
            </p>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          10. TRAVELER STORIES
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f2f0eb", padding: "72px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>

          {/* Title with decorative dots */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: "1.2rem", color: "#bbb", letterSpacing: "0.15em", marginBottom: 4 }}>···</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
              Traveler Stories
            </h2>
          </div>

          {/* Review cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: "24px 28px",
                  border: "1px solid #ece8e2",
                }}
              >
                {/* Top row: avatar + name + stars */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                          fontWeight: 600,
                        }}
                      >
                        {r.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>{r.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{r.origin} · {r.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, flexShrink: 0, paddingTop: 2 }}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="16" height="16" viewBox="0 0 16 16" fill={si < r.rating ? "#f59e0b" : "#e5e7eb"}>
                        <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.75, fontWeight: 400 }}>
                  {r.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          11. RECOMMENDED FOR YOU
      ════════════════════════════════════════════════ */}
      <section className="w-full py-16" style={{ background: "#f5f5f5" }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Section Header */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 14l4-5 3 3 3-4 4 5" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className="text-3xl font-bold" style={{ color: "#2b2b2b", fontFamily: "Inter, sans-serif" }}>
                Recommended for You
              </h2>
            </div>
            <p className="text-sm" style={{ color: "#4A5565", fontFamily: "Inter, sans-serif" }}>
              Because you viewed{" "}
              <span style={{ color: "#2b2b2b", fontWeight: 500 }}>{title}</span>
            </p>
          </div>

          {/* Card Grid — matches ExperiencesSection grid exactly */}
          <div className="grid grid-cols-1 gap-6 mt-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }} id="rec-grid-desktop">
            <style>{`
              @media (min-width: 768px) { #rec-grid-desktop { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (min-width: 1024px) { #rec-grid-desktop { grid-template-columns: repeat(3, 1fr) !important; } }
              .rec-card:hover .rec-card-img { transform: scale(1.04); }
              .rec-view-btn:hover { background: #333 !important; }
              .rec-nav-btn:hover { background: #d1d5db !important; }
              .rec-see-all:hover { background: #f9fafb !important; }
            `}</style>

            {recommendedTours.map((t) => (
              <div
                key={t.id}
                className="rec-card"
                style={{
                  background: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)", flexShrink: 0 }}>
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
                        <rect x="2" y="6" width="32" height="23" rx="3" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="11" cy="15" r="3.5" stroke="white" strokeWidth="1.8" fill="none"/>
                        <path d="M2 27l9-8 7 7 5-5 11 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                  )}
                  {/* Recommended badge */}
                  <div style={{ position: "absolute", top: 12, left: 12, background: "#f59e0b", color: "white", fontSize: "0.68rem", fontWeight: 600, padding: "4px 12px", borderRadius: 999, letterSpacing: "0.01em" }}>
                    Recommended
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "16px 16px 0", flex: 1 }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.35, fontFamily: "Inter, sans-serif" }}>
                    {t.title}
                  </h3>

                  {/* Location */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
                      <circle cx="6" cy="4.5" r="1.2" fill="#9ca3af"/>
                    </svg>
                    <span style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "Inter, sans-serif" }}>{t.location}</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {t.tags.map((tag) => (
                      <span key={tag} style={{ background: "#f59e0b", color: "white", fontSize: "0.65rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, fontFamily: "Inter, sans-serif" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Duration */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
                      <path d="M1 5h10M4 1v2M8 1v2" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: "0.78rem", color: "#6b7280", fontFamily: "Inter, sans-serif" }}>{t.duration}</span>
                  </div>
                </div>

                {/* View Details button */}
                <div style={{ padding: 16 }}>
                  <button
                    className="rec-view-btn"
                    style={{
                      width: "100%",
                      background: "#1a1a1a",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "11px 16px",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "background 0.3s ease",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    View Details
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls — left arrow, right arrow, See All Tours */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 40 }}>
            {/* Left arrow */}
            <button
              className="rec-nav-btn"
              style={{ background: "#e5e7eb", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s ease" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Right arrow */}
            <button
              className="rec-nav-btn"
              style={{ background: "#e5e7eb", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s ease" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* See All Tours */}
            <button
              className="rec-see-all"
              style={{ background: "white", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 16px", fontSize: "0.875rem", color: "#374151", cursor: "pointer", transition: "background 0.3s ease", fontFamily: "Inter, sans-serif" }}
            >
              See All Tours →
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}