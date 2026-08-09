/**
 * Mock Backend Service
 * 
 * This service simulates a real backend (e.g. Supabase, Firebase).
 * It stores users and session tokens in localStorage.
 * Passwords are very lightly hashed (btoa) to demonstrate we are not storing plain-text passwords,
 * but this is purely for local development simulation.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserRecord extends User {
  passwordHash: string;
}

const USERS_KEY = "mock_db_users";
const SESSION_KEY = "mock_session_token";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Simple mock hash (Base64 encoding - NOT secure for production, just for dev simulation)
const mockHash = (str: string) => btoa(str).split('').reverse().join('');

const getUsers = (): UserRecord[] => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: UserRecord[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const mockBackend = {
  async register(name: string, email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    await delay(600); // Simulate network latency
    const users = getUsers();
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { user: null, error: "An account with this email already exists." };
    }
    
    // We use the user's name as their internal ID to maintain backward compatibility 
    // with existing XP and lesson records which are keyed by the user's name.
    // In a real app, this would be a UUID.
    const internalId = name.trim();
    
    const newUser: UserRecord = {
      id: internalId,
      name: name.trim(),
      email: email.trim(),
      passwordHash: mockHash(password),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto login
    const sessionToken = btoa(newUser.id + ":" + Date.now());
    localStorage.setItem(SESSION_KEY, sessionToken);
    
    const { passwordHash, ...user } = newUser;
    return { user, error: null };
  },

  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    await delay(500); // Simulate network latency
    const users = getUsers();
    
    const userRecord = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!userRecord || userRecord.passwordHash !== mockHash(password)) {
      return { user: null, error: "Invalid email or password." };
    }
    
    const sessionToken = btoa(userRecord.id + ":" + Date.now());
    localStorage.setItem(SESSION_KEY, sessionToken);
    
    const { passwordHash, ...user } = userRecord;
    return { user, error: null };
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
  },

  async getSessionUser(): Promise<User | null> {
    await delay(200);
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return null;
    
    try {
      const decoded = atob(token);
      const [userId] = decoded.split(":");
      const users = getUsers();
      const userRecord = users.find(u => u.id === userId);
      
      if (userRecord) {
        const { passwordHash, ...user } = userRecord;
        return user;
      }
    } catch {
      return null;
    }
    
    return null;
  },
  
  async resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    await delay(600);
    const users = getUsers();
    if (!users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "No account found with that email address." };
    }
    
    // In a real system, send an email. For mock, just return success.
    return { success: true, error: null };
  }
};
