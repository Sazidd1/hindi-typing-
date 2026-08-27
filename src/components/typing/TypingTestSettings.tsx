import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const LEGENDS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "अ","आ","इ","ई","उ","ऊ","ऋ","ए","ऐ","ओ","औ",
  "क","ख","ग","घ","च","छ","ज","झ","ट","ठ","ड","ढ","ण",
  "त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह",
  "⏎","⇧","␣","⌫"
];

const KEY_COLORS = {
  c1: "linear-gradient(160deg,#2b52ff,#1b3ad1)",
  c2: "linear-gradient(160deg,#ff8a3d,#e06e22)",
  c3: "linear-gradient(160deg,#12b3a6,#0d8a80)",
  c4: "linear-gradient(160deg,#b8863f,#93692c)",
  c5: "linear-gradient(160deg,#e0457b,#b8305f)",
  c6: "linear-gradient(160deg,#8b5cf6,#6d3fd4)",
};
const COLOR_KEYS = Object.keys(KEY_COLORS) as (keyof typeof KEY_COLORS)[];

const SCHEMES = ["Remington GAIL", "Remington CBI", "Kruti Dev", "Mangal InScript", "English"];

const STORY_SLUG_MAP: Record<string, string> = {
  "1. ईमानदार लकड़हारा": "story-woodcutter",
  "2. प्यासा कौआ": "story-thirsty-crow",
  "3. खरगोश और कछुआ": "story-tortoise-hare",
  "4. चींटी और टिड्डा": "story-ant-grasshopper",
  "5. शेर और चूहा": "story-lion-mouse"
};

export default function TypingTestSettings({ onClose }: { onClose?: () => void }) {
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
    let count = 46;
    if (dims.w && dims.w < 1024) count = 24;
    if (dims.w && dims.w < 768) count = 12;
    if (dims.w && dims.w < 480) count = 6;
    
    const items = [];
    const formMaxWidth = 460;
    const margin = 80;
    const protectedW = formMaxWidth + margin * 2;
    const protectedH = 850;
    
    const minX = dims.w / 2 - protectedW / 2;
    const maxX = dims.w / 2 + protectedW / 2;
    const minY = dims.h / 2 - protectedH / 2;
    const maxY = dims.h / 2 + protectedH / 2;

    for (let i = 0; i < count; i++) {
      const size = 34 + Math.random() * 30;
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
        
        const isInsideX = (left + size > minX) && (left < maxX);
        const isInsideY = (top + size > minY) && (top < maxY);
        const overlapForm = isInsideX && isInsideY;
        
        let tooClose = false;
        for (const item of items) {
          const dx = item.left - left;
          const dy = item.top - top;
          if (Math.sqrt(dx * dx + dy * dy) < 70) {
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
      const colorKey = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)]!;
      const r = Math.random();
      const opacity = r > 0.93 ? 0.26 : r > 0.8 ? 0.5 : 0.9;
      items.push({
        id: i,
        size,
        top,
        left,
        rot,
        colorKey,
        opacity,
        char: LEGENDS[Math.floor(Math.random() * LEGENDS.length)],
      });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dims.w, dims.h]);

  function flashStatus(msg: string) {
    setStatus(msg);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 2200);
  }

  function handlePractice() {
    const slug = STORY_SLUG_MAP[passageType];
    if (slug) {
      navigate({ to: "/practice", search: { story: slug } });
    } else {
      flashStatus(`Practice mode started — ${scheme}`);
    }
  }
  function handleExam() {
    const slug = STORY_SLUG_MAP[passageType];
    if (slug) {
      navigate({ to: "/practice", search: { story: slug } });
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
        background: "radial-gradient(circle at center, #ffffff 20%, #f1f7fe 70%, #e6f0fa 100%)",
        display: "flex",
        padding: "40px 24px",
        fontFamily: "'Inter', sans-serif",
        color: "#161a2b",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .tts-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-height: 600px) {
          .tts-scroll {
            margin-top: -50px;
          }
        }
        .tts-scroll::-webkit-scrollbar {
          display: none;
        }
        .tts-select{
          appearance:none;
          background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path d="M0 0l5 6 5-6z" fill="%237a7f95"/></svg>');
          background-repeat:no-repeat;
          background-position:right 13px center;
        }
        .tts-input::placeholder{ color:#b7bacb; font-weight:400; }
        .tts-input:focus{ border-color:#7a94ff !important; box-shadow:0 0 0 3px rgba(122,148,255,0.15), 0 2px 6px rgba(22, 26, 43, 0.04) !important; }
        .tts-seg-btn{ transition:.15s ease; }
        .tts-chip{ transition: all .12s ease; }
        .tts-chip:not(.tts-chip-active):hover{ background: #ffffff !important; border-color: rgba(22, 26, 43, 0.15) !important; }
        .tts-chip:active { transform: translateY(3px) !important; box-shadow: 0 0 0 transparent !important; }
        .tts-primary { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-primary:hover { background: #0d0f1c !important; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(22, 26, 43, 0.2), 0 2px 4px rgba(22, 26, 43, 0.1) !important; }
        .tts-primary:active { transform: translateY(1px); box-shadow: 0 2px 4px rgba(22, 26, 43, 0.15) !important; }
        .tts-outline { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-outline:hover { background: #fafafa !important; border-color: rgba(22, 26, 43, 0.2) !important; color: #161a2b !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(22, 26, 43, 0.06) !important; }
        .tts-outline:active { transform: translateY(1px); box-shadow: 0 1px 2px rgba(22, 26, 43, 0.03) !important; }
        .tts-back-btn { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-back-btn:hover {
          background: #ffffff !important;
          border-color: rgba(22, 26, 43, 0.15) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 26, 43, 0.08) !important;
        }
        .tts-back-btn:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(22, 26, 43, 0.04) !important;
        }
        .tts-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(22, 26, 43, 0.06);
          gap: 14px;
          flex-wrap: wrap;
        }
        .tts-label {
          font-size: 13px;
          font-weight: 600;
          color: #2a2f45;
          letter-spacing: .01em;
        }
        .tts-input-main {
          width: 190px;
          text-align: right;
        }
        .tts-word-limit {
          width: 70px;
        }
        @media (max-width: 480px) {
          .tts-input-main {
            width: 100% !important;
            text-align: left !important;
          }
          .tts-row {
            padding: 10px 0 !important;
          }
        }
      `}</style>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px 8px 14px",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(22, 26, 43, 0.08)",
            borderRadius: 100,
            color: "#161a2b",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 13.5,
            letterSpacing: ".01em",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(22, 26, 43, 0.03)",
          }}
          className="tts-back-btn"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {/* scattered background keys */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          {floatingKeys.map((k) => (
            <div
              key={k.id}
              style={{
                position: "absolute",
                top: k.top,
                left: k.left,
                width: k.size,
                height: k.size,
                fontSize: k.size * 0.4,
                transform: `rotate(${k.rot}deg)`,
                borderRadius: 9,
                opacity: k.opacity,
                boxShadow: "0 5px 0 rgba(0,0,0,.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: "rgba(255,255,255,.92)",
                background: KEY_COLORS[k.colorKey],
              }}
            >
              {k.char}
            </div>
          ))}
        </div>
      )}


      {/* card */}
      <div
        className="tts-scroll"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 460,
          background: "transparent",
          padding: "20px 24px 16px",
          margin: "auto",
          transform: "translateY(-35px)",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 28,
            textAlign: "center",
            margin: "0 0 2px",
            letterSpacing: "-.02em",
            lineHeight: 1.1,
            color: "#161a2b",
          }}
        >
          Typing Test
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#828899",
            fontSize: 13,
            margin: "0 0 16px",
            letterSpacing: ".02em",
          }}
        >
          Choose your layout &amp; configure the session
        </p>

        <Row label="Name">
          <input
            type="text"
            className="tts-input tts-input-main"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...inputStyle(), textAlign: "left" }}
          />
        </Row>

        <Row label="Test Time">
          <select
            className="tts-input tts-select tts-input-main"
            value={testTime}
            onChange={(e) => setTestTime(e.target.value)}
            style={{ ...inputStyle(), textAlign: "left", cursor: "pointer", paddingRight: 30 }}
          >
            {["1 Minute", "3 Minutes", "5 Minutes", "10 Minutes"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Row>

        <Row label="Paragraph Selection">
          <div className="tts-input-main" style={{ display: "flex", background: "rgba(22, 26, 43, 0.05)", borderRadius: 9, padding: 3, height: 34, boxSizing: "border-box" }}>
            {["Default", "Custom"].map((v) => (
              <button
                key={v}
                className="tts-seg-btn"
                onClick={() => setParaMode(v)}
                style={{
                  flex: 1,
                  border: "none",
                  background: paraMode === v ? "#161a2b" : "transparent",
                  color: paraMode === v ? "#f2e6cd" : "#5a5e73",
                  padding: 0,
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </Row>


        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 5,
            padding: "10px 0 10px",
            borderBottom: "1px solid rgba(22, 26, 43, 0.06)",
          }}
        >
          {SCHEMES.map((s) => {
            const active = scheme === s;
            const isWide = s === "English";
            return (
              <button
                key={s}
                className={`tts-chip ${active ? 'tts-chip-active' : ''}`}
                onClick={() => setScheme(s)}
                style={{
                  gridColumn: isWide ? "1 / -1" : "auto",
                  border: `1.5px solid ${active ? "#b8863f" : "rgba(22, 26, 43, 0.08)"}`,
                  background: active ? "#161a2b" : "#fafafa",
                  borderRadius: 10,
                  padding: 0,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".01em",
                  color: active ? "#f2e6cd" : "#5a5e73",
                  cursor: "pointer",
                  boxShadow: active ? "inset 0 3px 6px rgba(0,0,0,0.5)" : "0 3px 0 rgba(22, 26, 43, 0.06)",
                  transform: active ? "translateY(3px)" : "none",
                  boxSizing: "border-box",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>

        <Row label="Paragraph Passages">
          <select
            className="tts-input tts-select tts-input-main"
            value={passageType}
            onChange={(e) => setPassageType(e.target.value)}
            style={{ ...inputStyle(), textAlign: "left", cursor: "pointer", paddingRight: 30 }}
          >
            {["Random words", "Common sentences", "News excerpts", "1. ईमानदार लकड़हारा", "2. प्यासा कौआ", "3. खरगोश और कछुआ", "4. चींटी और टिड्डा", "5. शेर और चूहा"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Row>

        <Row label="Backspace:">
          <Switch 
            checked={backspace} 
            onChange={(val) => {
              setBackspace(val);
              localStorage.setItem("settings_backspace", String(val));
            }} 
          />
        </Row>

        <Row label="Highlight & Auto Scroll:">
          <Switch checked={highlight} onChange={setHighlight} />
        </Row>

        <Row label={<>Word Limit (<span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#93692c", fontWeight: 700 }}>{wordLimit || 0}</span>):</>}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Switch checked={wordLimitOn} onChange={setWordLimitOn} />
            <input
              type="number"
              className="tts-input tts-word-limit"
              value={wordLimit}
              disabled={!wordLimitOn}
              onChange={(e) => setWordLimit(e.target.value)}
              style={{ ...inputStyle(!wordLimitOn), textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}
            />
          </div>
        </Row>

        <button
          className="tts-primary"
          onClick={handlePractice}
          style={{
            width: "100%",
            height: 46,
            border: "none",
            borderRadius: 11,
            marginTop: 8,
            background: "#161a2b",
            color: "#f2e6cd",
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: ".01em",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(22, 26, 43, 0.15), 0 2px 4px rgba(22, 26, 43, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Start Practice Mode
        </button>

        <button
          className="tts-outline"
          onClick={handleExam}
          style={{
            width: "100%",
            height: 46,
            border: "1px solid rgba(22, 26, 43, 0.12)",
            borderRadius: 11,
            marginTop: 8,
            background: "#ffffff",
            color: "#5a5e73",
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(22, 26, 43, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Start Exam Mode
        </button>

        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#3f7d5c",
            marginTop: status ? 10 : 0,
            height: status ? 14 : 0,
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
  );
}

function Row({ label, children }: { label: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="tts-row">
      <label className="tts-label">
        {label}
      </label>
      {children}
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <label style={{ position: "relative", width: 44, height: 25, flexShrink: 0, display: "inline-block" }}>
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
          background: checked ? "#b8863f" : "rgba(22, 26, 43, 0.12)",
          borderRadius: 20,
          transition: ".2s",
        }}
      >
        <span
          style={{
            content: "''",
            position: "absolute",
            height: 19,
            width: 19,
            left: checked ? 22 : 3,
            top: 3,
            background: "#fff",
            borderRadius: "50%",
            transition: ".2s",
            boxShadow: "0 1px 3px rgba(0,0,0,.3)",
            display: "block",
          }}
        />
      </span>
    </label>
  );
}

function inputStyle(disabled: boolean = false) {
  return {
    border: `1px solid ${disabled ? "rgba(22, 26, 43, 0.05)" : "rgba(22, 26, 43, 0.12)"}`,
    borderRadius: 9,
    padding: "0 10px",
    height: 34,
    background: disabled ? "rgba(255,255,255,0.4)" : "#ffffff",
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
    color: disabled ? "#a1a6b8" : "#161a2b",
    outline: "none",
    boxSizing: "border-box" as const,
    boxShadow: disabled ? "none" : "0 2px 6px rgba(22, 26, 43, 0.03)",
    transition: "all 0.2s ease",
  };
}
