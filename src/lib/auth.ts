import { useState, useEffect } from "react";

const CURRENT_USER_KEY = "currentUser";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Read initial state
    const user = localStorage.getItem(CURRENT_USER_KEY);
    setCurrentUser(user);
    setIsLoaded(true);

    // Listen to changes (from other tabs or same window via custom event)
    const handleStorageChange = () => {
      setCurrentUser(localStorage.getItem(CURRENT_USER_KEY));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const login = (username: string) => {
    if (!username.trim()) return;
    localStorage.setItem(CURRENT_USER_KEY, username.trim());
    window.dispatchEvent(new Event("auth-change"));
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event("auth-change"));
  };

  return { currentUser, login, logout, isLoaded };
}
