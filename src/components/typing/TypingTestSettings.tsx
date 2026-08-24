import React, { useState, useMemo, useRef, useEffect } from "react";
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

export default function TypingTestSettings({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState("");
  const [testTime, setTestTime] = useState("1 Minute");
  const [paraMode, setParaMode] = useState("Default");
  const [passageType, setPassageType] = useState("Random words");
  const [scheme, setScheme] = useState("Remington GAIL");
  const [backspace, setBackspace] = useState(true);
  const [highlight, setHighlight] = useState(true);
  const [wordLimitOn, setWordLimitOn] = useState(false);
  const [wordLimit, setWordLimit] = useState<number | string>(35);
  const [status, setStatus] = useState("");
  const statusTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 800 });

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
    const count = 46;
    const items = [];
    for (let i = 0; i < count; i++) {
      const size = 34 + Math.random() * 30;
      const top = Math.random() * dims.h;
      const left = Math.random() * dims.w;
      const rot = (Math.random() * 60 - 30).toFixed(1);
      const colorKey = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
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
    flashStatus(`Practice mode started — ${scheme}`);
  }
  function handleExam() {
    flashStatus(`Exam mode started — ${scheme}`);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 24,
        fontFamily: "'Inter', sans-serif",
        color: "#161a2b",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .tts-scroll::-webkit-scrollbar{ width:6px; }
        .tts-scroll::-webkit-scrollbar-thumb{ background:#e8e3d6; border-radius:6px; }
        .tts-select{
          appearance:none;
          background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path d="M0 0l5 6 5-6z" fill="%237a7f95"/></svg>');
          background-repeat:no-repeat;
          background-position:right 13px center;
        }
        .tts-input::placeholder{ color:#b7bacb; font-weight:400; }
        .tts-input:focus{ border-color:#b8863f !important; box-shadow:0 0 0 3px rgba(184,134,63,.14); }
        .tts-seg-btn{ transition:.15s ease; }
        .tts-chip{ transition:.12s ease; }
        .tts-chip:hover{ background:#faf8f2; }
        .tts-primary:hover{ background:#0d0f1c !important; }
        .tts-primary:active{ transform:translateY(3px); box-shadow:0 1px 0 #05060d !important; }
        .tts-outline:hover{ background:#f2e6cd !important; }
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
            gap: 8,
            padding: "8px 16px",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(184,134,63,0.3)",
            borderRadius: 20,
            color: "#161a2b",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease",
          }}
          className="hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)]"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {/* scattered background keys */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
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

      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 55%, transparent 0%, transparent 26%, rgba(255,255,255,.3) 54%, rgba(255,255,255,.66) 78%)",
        }}
      />

      {/* card */}
      <div
        className="tts-scroll"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 460,
          background: "#fbfaf6",
          borderRadius: 22,
          padding: "40px 34px 32px",
          boxShadow:
            "0 50px 90px -30px rgba(15,17,30,.55), 0 0 0 1px rgba(184,134,63,.16), inset 0 1px 0 rgba(255,255,255,.6)",
          maxHeight: "92vh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 29,
            textAlign: "center",
            margin: "0 0 6px",
            letterSpacing: "-.01em",
          }}
        >
          Typing Test
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#7a7f95",
            fontSize: 12.5,
            margin: "0 0 28px",
            letterSpacing: ".03em",
          }}
        >
          Choose your layout &amp; configure the session
        </p>

        <Row label="Name">
          <input
            type="text"
            className="tts-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle()}
          />
        </Row>

        <Row label="Test Time">
          <select
            className="tts-input tts-select"
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
          <div style={{ display: "flex", background: "#f0ede3", borderRadius: 9, padding: 3, width: 190 }}>
            {["Default", "Custom"].map((v) => (
              <button
                key={v}
                className="tts-seg-btn"
                onClick={() => setParaMode(v)}
                style={{
                  flex: 1,
                  border: "none",
                  background: paraMode === v ? "#161a2b" : "transparent",
                  color: paraMode === v ? "#fff" : "#7a7f95",
                  padding: "8px 6px",
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </Row>

        <Row label="Paragraph Passages">
          <select
            className="tts-input tts-select"
            value={passageType}
            onChange={(e) => setPassageType(e.target.value)}
            style={{ ...inputStyle(), textAlign: "left", cursor: "pointer", paddingRight: 30 }}
          >
            {["Random words", "Common sentences", "News excerpts", "Story passages"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Row>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 9,
            padding: "14px 0 15px",
            borderBottom: "1px solid #e8e3d6",
          }}
        >
          {SCHEMES.map((s) => {
            const active = scheme === s;
            const isWide = s === "English";
            return (
              <button
                key={s}
                className="tts-chip"
                onClick={() => setScheme(s)}
                style={{
                  gridColumn: isWide ? "1 / -1" : "auto",
                  border: `1.5px solid ${active ? "#93692c" : "#e8e3d6"}`,
                  background: active ? "linear-gradient(160deg,#b8863f,#93692c)" : "#fff",
                  borderRadius: 10,
                  padding: "13px 8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".01em",
                  color: active ? "#fff" : "#2a2f45",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: active ? "0 3px 0 #93692c" : "0 3px 0 #e8e3d6",
                  transform: active ? "translateY(1px)" : "none",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>

        <Row label="Backspace:">
          <Switch checked={backspace} onChange={setBackspace} />
        </Row>

        <Row label="Highlight & Auto Scroll:">
          <Switch checked={highlight} onChange={setHighlight} />
        </Row>

        <Row label={<>Word Limit (<span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#93692c", fontWeight: 700 }}>{wordLimit || 0}</span>):</>}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Switch checked={wordLimitOn} onChange={setWordLimitOn} />
            <input
              type="number"
              className="tts-input"
              value={wordLimit}
              disabled={!wordLimitOn}
              onChange={(e) => setWordLimit(e.target.value)}
              style={{ ...inputStyle(), width: 70, textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}
            />
          </div>
        </Row>

        <button
          className="tts-primary"
          onClick={handlePractice}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 11,
            padding: 15,
            marginTop: 22,
            background: "#161a2b",
            color: "#f2e6cd",
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: ".01em",
            cursor: "pointer",
            boxShadow: "0 4px 0 #05060d",
          }}
        >
          Start Practice Mode
        </button>

        <button
          className="tts-outline"
          onClick={handleExam}
          style={{
            width: "100%",
            border: "1.5px solid #b8863f",
            borderRadius: 11,
            padding: 13.5,
            marginTop: 11,
            background: "#fff",
            color: "#93692c",
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Start Exam Mode
        </button>

        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#3f7d5c",
            marginTop: 16,
            height: 14,
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 0",
        borderBottom: "1px solid #e8e3d6",
        gap: 14,
      }}
    >
      <label style={{ fontSize: 13.5, fontWeight: 600, color: "#2a2f45", flexShrink: 0, letterSpacing: ".01em" }}>
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
          background: checked ? "#b8863f" : "#e2ded0",
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

function inputStyle() {
  return {
    border: "1.5px solid #e8e3d6",
    borderRadius: 9,
    padding: "9px 13px",
    background: "#fff",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    color: "#161a2b",
    outline: "none",
    width: 190,
    textAlign: "right" as const,
    boxSizing: "border-box" as const,
  };
}
