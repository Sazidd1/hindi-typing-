import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

const LEGENDS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ऋ",
  "ए",
  "ऐ",
  "ओ",
  "औ",
  "क",
  "ख",
  "ग",
  "घ",
  "च",
  "छ",
  "ज",
  "झ",
  "ट",
  "ठ",
  "ड",
  "ढ",
  "ण",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "ष",
  "स",
  "ह",
  "⏎",
  "⇧",
  "␣",
  "⌫",
];

const SCHEMES = ["Remington GAIL", "Remington CBI", "Kruti Dev", "Mangal InScript", "English"];

const STORY_SLUG_MAP: Record<string, string> = {
  "1. ईमानदार लकड़हारा": "story-woodcutter",
  "2. प्यासा कौआ": "story-thirsty-crow",
  "3. खरगोश और कछुआ": "story-tortoise-hare",
  "4. चींटी और टिड्डा": "story-ant-grasshopper",
  "5. शेर और चूहा": "story-lion-mouse",
  "6. सच्चा मित्र": "story-true-friend",
  "7. लालची किसान": "story-greedy-farmer",
  "8. बुद्धिमान चरवाहा": "story-smart-shepherd",
  "9. ईमानदार व्यापारी": "story-honest-merchant",
  "10. समझदार राजा": "story-wise-king",
  "11. मेहनती किसान": "story-hardworking-farmer",
  "12. दो मित्र और जंगल": "story-two-friends-jungle",
  "13. चतुर लोमड़ी": "story-clever-fox",
  "14. दयालु राजकुमार": "story-kind-prince",
  "15. साहसी लड़की": "story-brave-girl",
  "16. पुराना कुआँ": "story-old-well",
  "17. गाँव का शिक्षक": "story-village-teacher",
  "18. छोटा दीपक": "story-small-lamp",
  "19. मेहनत का फल": "story-fruit-of-hardwork",
  "20. समय का महत्व": "story-value-of-time",
  "तकनीक और बदलती दुनिया": "expert-technology-changing-world",
  "पर्यावरण और हमारी जिम्मेदारी": "expert-environment-responsibility",
  "समय, अनुशासन और सफलता": "expert-time-discipline-success",
  "शिक्षा का बदलता स्वरूप": "expert-changing-education",
  "भारत की विविधता और एकता": "expert-india-diversity-unity",
  "स्वास्थ्य और स्वस्थ जीवनशैली": "expert-health-healthy-lifestyle",
  "विज्ञान और मानव जीवन": "expert-science-human-life",
  "जल संरक्षण और भविष्य": "expert-water-conservation-future",
  "पुस्तकें और ज्ञान की शक्ति": "expert-books-power-of-knowledge",
  "आत्मनिर्भरता और कौशल विकास": "expert-self-reliance-skill-development",
};

export default function TypingTestSettings({ onClose }: { onClose?: () => void }) {
  const { isEnglish } = useLanguage();
  const [name, setName] = useState("");
  const [testTime, setTestTime] = useState("1 Minute");
  const [paraMode, setParaMode] = useState("Default");
  const [passageType, setPassageType] = useState("Random words");
  const [scheme, setScheme] = useState("Remington GAIL");
  const [backspace, setBackspace] = useState(() => {
    const saved = localStorage.getItem("settings_backspace");
    return saved !== null ? saved === "true" : true;
  });
  const [highlight, setHighlight] = useState(true);
  const [wordLimitOn, setWordLimitOn] = useState(false);
  const [wordLimit, setWordLimit] = useState<number | string>(35);
  const [status, setStatus] = useState("");
  const statusTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 800 });
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const floatingKeys = useMemo(() => {
    let count = 24;
    if (dims.w && dims.w < 1024) count = 14;
    if (dims.w && dims.w < 768) count = 8;
    if (dims.w && dims.w < 480) count = 4;

    const items = [];
    const formMaxWidth = 880;
    const margin = 80;
    const protectedW = formMaxWidth + margin * 2;
    const protectedH = 1050;

    const minX = dims.w / 2 - protectedW / 2;
    const maxX = dims.w / 2 + protectedW / 2;
    const minY = dims.h / 2 - protectedH / 2;
    const maxY = dims.h / 2 + protectedH / 2;

    for (let i = 0; i < count; i++) {
      const size = 48 + Math.random() * 40;
      const isLeft = i % 2 === 0;

      let top = 0;
      let left = 0;
      let valid = false;
      let attempts = 0;

      while (!valid && attempts < 150) {
        top = Math.random() * dims.h;
        left = Math.random() * dims.w;

        let wrongSide = false;
        if (minX > size && maxX < dims.w - size) {
          if (isLeft && left > minX) wrongSide = true;
          if (!isLeft && left < maxX) wrongSide = true;
        }

        const isInsideX = left + size > minX && left < maxX;
        const isInsideY = top + size > minY && top < maxY;
        const overlapForm = isInsideX && isInsideY;

        let tooClose = false;
        for (const item of items) {
          const dx = item.left - left;
          const dy = item.top - top;
          if (Math.sqrt(dx * dx + dy * dy) < 120) {
            tooClose = true;
            break;
          }
        }

        if (wrongSide || overlapForm || tooClose) {
          attempts++;
        } else {
          valid = true;
        }
      }

      if (!valid) {
        if (isLeft) {
          left = Math.random() * Math.max(0, minX - size);
        } else {
          left = Math.max(maxX, maxX + Math.random() * Math.max(0, dims.w - maxX - size));
        }
      }

      const rot = (Math.random() * 60 - 30).toFixed(1);
      const opacity = 0.4 + Math.random() * 0.35;
      items.push({
        id: i,
        size,
        top,
        left,
        rot,
        opacity,
        char: LEGENDS[Math.floor(Math.random() * LEGENDS.length)],
      });
    }
    return items;
  }, [dims.w, dims.h]);

  function flashStatus(msg: string) {
    setStatus(msg);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 2200);
  }

  function buildSearchParams() {
    const search: {
      limit?: number;
      time?: number;
      lesson?: string;
      story?: string;
      mode?: string;
    } = {};
    if (wordLimitOn && wordLimit) {
      search.limit = Number(wordLimit);
    }
    const timeMatch = testTime.match(/(\d+)/);
    if (timeMatch) {
      search.time = Number(timeMatch[1]);
    }
    return search;
  }

  function handlePractice() {
    const search = buildSearchParams();
    if (passageType === "Random words") {
      search.mode = "randomWords";
      navigate({ to: "/practice", search });
      return;
    }
    const slug = STORY_SLUG_MAP[passageType];
    if (slug) {
      search.story = slug;
      navigate({ to: "/practice", search });
    } else {
      flashStatus(`Practice mode started — ${scheme}`);
    }
  }

  function handleExam() {
    const search = buildSearchParams();
    if (passageType === "Random words") {
      search.mode = "randomWords";
      navigate({ to: "/practice", search });
      return;
    }
    const slug = STORY_SLUG_MAP[passageType];
    if (slug) {
      search.story = slug;
      navigate({ to: "/practice", search });
    } else {
      flashStatus(`Exam mode started — ${scheme}`);
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100vh",
        zIndex: 100,
        background: "radial-gradient(ellipse at top, #fffdf8 0%, #f6ecd6 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        color: "#1c1917",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        .tts-input::placeholder { color: #a8a29e; font-weight: 400; }
        .tts-input:focus { border-color: rgba(193, 158, 84, 0.5) !important; box-shadow: 0 0 0 3px rgba(193, 158, 84, 0.15) !important; }
        .tts-select {
          appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path d="M1 1l5 6 5-6" stroke="%23c19e54" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>');
          background-repeat: no-repeat;
          background-position: right 16px center;
        }
        
        .tts-btn-hover:hover {
           transform: translateY(-1px);
           box-shadow: 0 6px 20px rgba(0,0,0,0.06) !important;
        }
        .tts-btn-hover:active {
           transform: translateY(1px);
           box-shadow: 0 2px 10px rgba(0,0,0,0.04) !important;
        }
        
        .tts-primary-btn {
           transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tts-primary-btn:hover {
           filter: brightness(1.05);
           transform: translateY(-2px);
           box-shadow: 0 12px 32px rgba(184,138,68,0.3) !important;
        }
        .tts-primary-btn:active {
           transform: translateY(1px);
           box-shadow: 0 4px 16px rgba(184,138,68,0.2) !important;
        }
      `}</style>

      {/* Floating keys */}
      {mounted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {floatingKeys.map((k) => (
            <div
              key={k.id}
              style={{
                position: "absolute",
                top: k.top,
                left: k.left,
                width: k.size,
                height: k.size,
                fontSize: k.size * 0.45,
                transform: `rotate(${k.rot}deg)`,
                borderRadius: k.size * 0.2,
                opacity: k.opacity,
                boxShadow:
                  "0 12px 32px rgba(184,138,68,0.06), 0 4px 12px rgba(184,138,68,0.04), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(0,0,0,0.02)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                color: "#c19e54",
                background: "linear-gradient(145deg, #ffffff 0%, #fcfaf5 100%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
              }}
            >
              {k.char}
            </div>
          ))}
        </div>
      )}

      {/* Top Header Buttons */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          right: 0,
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {onClose ? (
          <button
            onClick={onClose}
            className="tts-btn-hover"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px 10px 20px",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 1)",
              borderRadius: 100,
              color: "#1c1917",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(184,138,68,0.05)",
              transition: "all 0.2s",
            }}
          >
            <ArrowLeft size={18} />
            {isEnglish ? "Back" : "वापस"}
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "16px 24px 32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <p
            style={{
              color: "#c19e54",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 4,
            }}
          >
            {isEnglish ? "THE ART OF PRECISION" : "सटीकता की कला"}
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              color: "#1c1917",
              margin: 0,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {isEnglish ? "Typing Test" : "टाइपिंग टेस्ट"}
          </h1>
          <p
            style={{
              color: "#78716c",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              margin: 0,
              marginTop: 4,
              fontWeight: 400,
            }}
          >
            {isEnglish ? "Choose your layout & configure the session" : "अपना लेआउट चुनें और सत्र कॉन्फ़िगर करें"}
          </p>
        </div>

        {/* Settings Panel */}
        <div
          style={{
            width: "100%",
            maxWidth: 860,
            margin: "0 auto",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 32,
            padding: "16px clamp(32px, 5vw, 48px) 24px",
            boxShadow: "0 24px 64px rgba(184,138,68,0.06), inset 0 0 0 1px rgba(255,255,255,0.9)",
          }}
        >
          {/* Sections */}
          <div
            style={{
              marginBottom: 12,
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(184, 138, 68, 0.04), inset 0 2px 0 rgba(255,255,255,1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>{isEnglish ? "Name" : "नाम"}</div>
              <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  className="tts-input"
                  placeholder={isEnglish ? "Enter your name" : "अपना नाम दर्ज करें"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ ...inputStyle(), height: 44 }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: 12,
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(184, 138, 68, 0.04), inset 0 2px 0 rgba(255,255,255,1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#a89f91",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {isEnglish ? "TEST MODE" : "टेस्ट मोड"}
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      display: "flex",
                      background: "rgba(240, 235, 225, 0.6)",
                      borderRadius: 100,
                      padding: 4,
                      width: 220,
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                    }}
                  >
                    {["Default", "Custom"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setParaMode(v)}
                        style={{
                          flex: 1,
                          height: 32,
                          borderRadius: 100,
                          border: "none",
                          background: paraMode === v ? "#ffffff" : "transparent",
                          color: paraMode === v ? "#1c1917" : "#78716c",
                          fontWeight: 600,
                          fontSize: 13,
                          boxShadow:
                            paraMode === v
                              ? "0 2px 8px rgba(184,138,68,0.1), 0 1px 2px rgba(184,138,68,0.06)"
                              : "none",
                          cursor: "pointer",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                          fontFamily: "'Inter', sans-serif",
                        }}
                        title={v}
                      >
                        {isEnglish ? v : v === "Default" ? "डिफ़ॉल्ट" : "कस्टम"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>{isEnglish ? "Test Time" : "टेस्ट समय"}</div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <select
                    className="tts-input tts-select"
                    value={testTime}
                    onChange={(e) => setTestTime(e.target.value)}
                    style={{ ...inputStyle(), cursor: "pointer", paddingRight: 40, height: 44 }}
                  >
                    {["1 Minute", "3 Minutes", "5 Minutes", "10 Minutes"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: 12,
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(184, 138, 68, 0.04), inset 0 2px 0 rgba(255,255,255,1)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#a89f91",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {isEnglish ? "KEYBOARD LAYOUT" : "कीबोर्ड लेआउट"}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 8,
              }}
            >
              {SCHEMES.map((s) => {
                const active = scheme === s;
                return (
                  <button
                    key={s}
                    onClick={() => setScheme(s)}
                    style={{
                      height: 48,
                      borderRadius: 16,
                      background: active ? "#ffffff" : "rgba(255,255,255,0.4)",
                      border: active ? "1.5px solid #c19e54" : "1px solid rgba(184,138,68,0.15)",
                      color: active ? "#1c1917" : "#78716c",
                      fontWeight: 600,
                      fontSize: 15,
                      boxShadow: active
                        ? "0 8px 24px rgba(184,138,68,0.1), inset 0 2px 0 rgba(255,255,255,1)"
                        : "inset 0 2px 0 rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              marginBottom: 0,
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(184, 138, 68, 0.04), inset 0 2px 0 rgba(255,255,255,1)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#a89f91",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {isEnglish ? "OPTIONS" : "विकल्प"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>
                  {isEnglish ? "Paragraph Passages" : "पैराग्राफ अभ्यास"}
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <select
                    className="tts-input tts-select"
                    value={passageType}
                    onChange={(e) => setPassageType(e.target.value)}
                    style={{ ...inputStyle(), cursor: "pointer", paddingRight: 40, height: 44 }}
                  >
                    {[
                      "Random words",
                      "Common sentences",
                      "News excerpts",
                      "1. ईमानदार लकड़हारा",
                      "2. प्यासा कौआ",
                      "3. खरगोश और कछुआ",
                      "4. चींटी और टिड्डा",
                      "5. शेर और चूहा",
                      "6. सच्चा मित्र",
                      "7. लालची किसान",
                      "8. बुद्धिमान चरवाहा",
                      "9. ईमानदार व्यापारी",
                      "10. समझदार राजा",
                      "11. मेहनती किसान",
                      "12. दो मित्र और जंगल",
                      "13. चतुर लोमड़ी",
                      "14. दयालु राजकुमार",
                      "15. साहसी लड़की",
                      "16. पुराना कुआँ",
                      "17. गाँव का शिक्षक",
                      "18. छोटा दीपक",
                      "19. मेहनत का फल",
                      "20. समय का महत्व",
                      "तकनीक और बदलती दुनिया",
                      "पर्यावरण और हमारी जिम्मेदारी",
                      "समय, अनुशासन और सफलता",
                      "शिक्षा का बदलता स्वरूप",
                      "भारत की विविधता और एकता",
                      "स्वास्थ्य और स्वस्थ जीवनशैली",
                      "विज्ञान और मानव जीवन",
                      "जल संरक्षण और भविष्य",
                      "पुस्तकें और ज्ञान की शक्ति",
                      "आत्मनिर्भरता और कौशल विकास",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>{isEnglish ? "Backspace" : "बैकस्पेस"}</div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Switch
                    checked={backspace}
                    onChange={(val) => {
                      setBackspace(val);
                      localStorage.setItem("settings_backspace", String(val));
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>
                  {isEnglish ? "Highlight & Auto Scroll" : "हाइलाइट और ऑटो स्क्रॉल"}
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Switch checked={highlight} onChange={setHighlight} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 40,
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#44403c" }}>
                  {isEnglish ? "Word Limit" : "शब्द सीमा"}{" "}
                  <span style={{ color: "#c19e54", marginLeft: 4, fontWeight: 700 }}>
                    ({wordLimit || 0})
                  </span>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Switch checked={wordLimitOn} onChange={setWordLimitOn} />
                    <input
                      type="number"
                      className="tts-input"
                      value={wordLimit}
                      disabled={!wordLimitOn}
                      onChange={(e) => setWordLimit(e.target.value)}
                      style={{
                        ...inputStyle(!wordLimitOn),
                        width: 80,
                        textAlign: "center",
                        height: 44,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <button
              className="tts-primary-btn"
              onClick={handlePractice}
              style={{
                width: "100%",
                height: 56,
                border: "none",
                borderRadius: 100,
                background: "linear-gradient(135deg, #d8b762 0%, #bb8f35 100%)",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "0.01em",
                cursor: "pointer",
                boxShadow:
                  "0 12px 32px rgba(184,138,68,0.25), inset 0 2px 0 rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isEnglish ? "Start Practice Mode" : "अभ्यास मोड प्रारंभ करें"}
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#3f7d5c",
              marginTop: status ? 12 : 0,
              height: status ? 20 : 0,
              opacity: status ? 1 : 0,
              transition: ".2s ease",
              fontWeight: 600,
              letterSpacing: ".02em",
            }}
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      style={{
        position: "relative",
        width: 52,
        height: 32,
        flexShrink: 0,
        display: "inline-block",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          position: "absolute",
          cursor: "pointer",
          inset: 0,
          background: checked ? "#c19e54" : "rgba(184, 138, 68, 0.15)",
          borderRadius: 100,
          transition: "background .2s",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <span
          style={{
            content: "''",
            position: "absolute",
            height: 24,
            width: 24,
            left: checked ? 24 : 4,
            top: 4,
            background: "#fff",
            borderRadius: "50%",
            transition: "left .2s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "block",
          }}
        />
      </span>
    </label>
  );
}

function inputStyle(disabled: boolean = false) {
  return {
    border: `1px solid ${disabled ? "rgba(184, 138, 68, 0.1)" : "rgba(184, 138, 68, 0.2)"}`,
    borderRadius: 16,
    padding: "0 20px",
    height: 48,
    background: disabled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    color: disabled ? "#a8a29e" : "#1c1917",
    outline: "none",
    boxSizing: "border-box" as const,
    boxShadow: disabled ? "none" : "0 2px 8px rgba(184, 138, 68, 0.03)",
    transition: "all 0.2s ease",
    width: "100%",
    maxWidth: 280,
  };
}
