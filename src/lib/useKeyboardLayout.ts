import { useEffect, useState, useCallback } from "react";

export function useKeyboardLayout() {
  const [layout, setLayout] = useState<string>("Remington GAIL");

  const updateLayout = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("settings_keyboard_layout");
      setLayout(stored || "Remington GAIL");
    }
  }, []);

  useEffect(() => {
    updateLayout();

    window.addEventListener("settings_keyboard_layout_changed", updateLayout);

    return () => {
      window.removeEventListener("settings_keyboard_layout_changed", updateLayout);
    };
  }, [updateLayout]);

  return { layout };
}
