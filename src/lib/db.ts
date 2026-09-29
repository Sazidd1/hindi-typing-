import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserRecord extends User {
  passwordHash: string;
  salt: string;
}

export interface Session {
  id: string;
  userId: string;
  createdAt: number;
}

interface DatabaseSchema {
  users: UserRecord[];
  sessions: Session[];
}

const DB_PATH = path.resolve(process.cwd(), "db.json");

// Helper to hash passwords securely using PBKDF2
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

class JSONDatabase {
  private async readDB(): Promise<DatabaseSchema> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        const defaultDB: DatabaseSchema = { users: [], sessions: [] };
        await this.writeDB(defaultDB);
        return defaultDB;
      }
      throw error;
    }
  }

  private async writeDB(data: DatabaseSchema): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  async getUsers(): Promise<UserRecord[]> {
    const db = await this.readDB();
    return db.users;
  }

  async saveUser(user: UserRecord): Promise<void> {
    const db = await this.readDB();
    db.users.push(user);
    await this.writeDB(db);
  }

  async getSession(sessionId: string): Promise<Session | undefined> {
    const db = await this.readDB();
    return db.sessions.find((s) => s.id === sessionId);
  }

  async saveSession(session: Session): Promise<void> {
    const db = await this.readDB();
    db.sessions.push(session);
    await this.writeDB(db);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const db = await this.readDB();
    db.sessions = db.sessions.filter((s) => s.id !== sessionId);
    await this.writeDB(db);
  }
}

export const db = new JSONDatabase();
