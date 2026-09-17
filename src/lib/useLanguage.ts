import { useState, useEffect } from "react";

export function useLanguage() {
  const [languageMode, setLanguageMode] = useState(() => {
    if (typeof window === "undefined") return "Hindi";
    return localStorage.getItem("settings_language_mode") || "Hindi";
  });

  useEffect(() => {
    const handleUpdate = () => {
      setLanguageMode(localStorage.getItem("settings_language_mode") || "Hindi");
    };
    window.addEventListener("language_mode_changed", handleUpdate);
    handleUpdate();
    return () => window.removeEventListener("language_mode_changed", handleUpdate);
  }, []);

  const isEnglish = languageMode === "English";

  return { languageMode, isEnglish };
}
