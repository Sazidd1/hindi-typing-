/**
 * Backend Service (Migrated to real backend logic)
 * 
 * This service connects the frontend to the backend server functions.
 * The session token is stored temporarily in localStorage for the active session,
 * but all account validation and database persistence happens on the server.
 */

import { registerUserFn, loginUserFn, getSessionUserFn, logoutUserFn, resetPasswordFn } from '../server/auth-api';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const SESSION_KEY = "mock_session_token";

export const mockBackend = {
  async register(name: string, email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const result = await registerUserFn({ data: { name, email, password } });
      if (result.user && result.sessionToken) {
        localStorage.setItem(SESSION_KEY, result.sessionToken);
      }
      return { user: result.user, error: result.error };
    } catch (error) {
      console.error("Registration failed:", error);
      return { user: null, error: "An unexpected error occurred during registration." };
    }
  },

  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const result = await loginUserFn({ data: { email, password } });
      if (result.user && result.sessionToken) {
        localStorage.setItem(SESSION_KEY, result.sessionToken);
      }
      return { user: result.user, error: result.error };
    } catch (error) {
      console.error("Login failed:", error);
      return { user: null, error: "An unexpected error occurred during login." };
    }
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem(SESSION_KEY);
    if (token) {
      try {
        await logoutUserFn({ data: { sessionToken: token } });
      } catch (error) {
        console.error("Logout failed on server:", error);
      }
    }
    localStorage.removeItem(SESSION_KEY);
  },

  async getSessionUser(): Promise<User | null> {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return null;
    
    try {
      const result = await getSessionUserFn({ data: { sessionToken: token } });
      if (!result.user) {
        // Token is invalid or expired according to the backend
        localStorage.removeItem(SESSION_KEY);
      }
      return result.user;
    } catch (error) {
      console.error("Failed to fetch session user:", error);
      return null;
    }
  },
  
  async resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const result = await resetPasswordFn({ data: { email } });
      return result;
    } catch (error) {
      console.error("Reset password failed:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
};
