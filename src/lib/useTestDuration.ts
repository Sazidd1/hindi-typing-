import { useState, useEffect } from "react";

export function useTestDurationDisplay() {
  const [durationStr, setDurationStr] = useState(() => {
    return localStorage.getItem("settings_test_duration") || "60 sec";
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDurationStr(localStorage.getItem("settings_test_duration") || "60 sec");
    };
    window.addEventListener("settings_test_duration_changed", handleUpdate);
    handleUpdate();
    return () => window.removeEventListener("settings_test_duration_changed", handleUpdate);
  }, []);

  if (durationStr === "30 sec") return "30 sec";
  if (durationStr === "60 sec") return "1 min";
  if (durationStr === "120 sec") return "2 min";
  if (durationStr === "180 sec") return "3 min";
  if (durationStr === "300 sec") return "5 min";
  return "1 min";
}
