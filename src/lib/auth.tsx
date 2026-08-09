import React, { createContext, useContext, useState, useEffect } from "react";
import { mockBackend, User } from "./mock-backend";

interface AuthContextType {
  userObject: User | null;
  currentUser: string | null; // For backward compatibility with XP system (this is the user's name/ID)
  isLoaded: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfileName: (newName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userObject, setUserObject] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Note: For full backward compatibility with previous mock implementation and XP records,
  // currentUser must be the string name/ID of the user.
  const currentUser = userObject?.id || null;

  useEffect(() => {
    let mounted = true;
    
    const initSession = async () => {
      const sessionUser = await mockBackend.getSessionUser();
      if (mounted) {
        setUserObject(sessionUser);
        setIsLoaded(true);
      }
    };
    
    initSession();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { user, error } = await mockBackend.login(email, password);
    if (user) {
      setUserObject(user);
      window.dispatchEvent(new Event("auth-change")); // Notify legacy listeners if any
    }
    return { error };
  };

  const signup = async (name: string, email: string, password: string) => {
    const { user, error } = await mockBackend.register(name, email, password);
    if (user) {
      setUserObject(user);
      window.dispatchEvent(new Event("auth-change")); // Notify legacy listeners
    }
    return { error };
  };

  const logout = async () => {
    await mockBackend.logout();
    setUserObject(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  const resetPassword = async (email: string) => {
    const { error } = await mockBackend.resetPassword(email);
    return { error };
  };

  // Keep this for profile rename functionality
  const updateProfileName = (newName: string) => {
    // In a real app we'd update the DB. For this local mock, we just update local state slightly
    // to preserve the profile.tsx rename logic visually, though ideally they shouldn't rename 
    // the ID that XP is tied to. We'll leave it as a visual update for now.
    if (userObject) {
      setUserObject({ ...userObject, id: newName, name: newName });
      window.dispatchEvent(new Event("auth-change"));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userObject,
        currentUser,
        isLoaded,
        login,
        signup,
        logout,
        resetPassword,
        updateProfileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
