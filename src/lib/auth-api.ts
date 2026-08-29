import { createServerFn } from '@tanstack/react-start';
import { db, hashPassword, generateSalt, generateSessionToken } from './db';
import type { User } from './db';

// Delay helper to simulate realistic network/db latency slightly
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const registerUserFn = createServerFn({ method: 'POST' })
  .validator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    await delay(300);
    const users = await db.getUsers();
    
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { user: null, sessionToken: null, error: "An account with this email already exists." };
    }
    
    const salt = generateSalt();
    const passwordHash = hashPassword(data.password, salt);
    
    const internalId = data.name.trim();
    
    const newUser = {
      id: internalId,
      name: data.name.trim(),
      email: data.email.trim(),
      passwordHash,
      salt,
      createdAt: new Date().toISOString()
    };
    
    await db.saveUser(newUser);
    
    const sessionToken = generateSessionToken();
    await db.saveSession({
      id: sessionToken,
      userId: newUser.id,
      createdAt: Date.now()
    });
    
    const { passwordHash: _ph, salt: _s, ...user } = newUser;
    return { user, sessionToken, error: null };
  });

export const loginUserFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    await delay(300);
    const users = await db.getUsers();
    
    const userRecord = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (!userRecord) {
      return { user: null, sessionToken: null, error: "Invalid email or password." };
    }
    
    const inputHash = hashPassword(data.password, userRecord.salt);
    if (inputHash !== userRecord.passwordHash) {
      return { user: null, sessionToken: null, error: "Invalid email or password." };
    }
    
    const sessionToken = generateSessionToken();
    await db.saveSession({
      id: sessionToken,
      userId: userRecord.id,
      createdAt: Date.now()
    });
    
    const { passwordHash: _ph, salt: _s, ...user } = userRecord;
    return { user, sessionToken, error: null };
  });

export const getSessionUserFn = createServerFn({ method: 'POST' })
  .validator((data: { sessionToken: string }) => data)
  .handler(async ({ data }) => {
    const session = await db.getSession(data.sessionToken);
    if (!session) return { user: null };
    
    const users = await db.getUsers();
    const userRecord = users.find(u => u.id === session.userId);
    
    if (userRecord) {
      const { passwordHash: _ph, salt: _s, ...user } = userRecord;
      return { user };
    }
    return { user: null };
  });

export const logoutUserFn = createServerFn({ method: 'POST' })
  .validator((data: { sessionToken: string }) => data)
  .handler(async ({ data }) => {
    await db.deleteSession(data.sessionToken);
    return { success: true };
  });

export const resetPasswordFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    await delay(300);
    const users = await db.getUsers();
    if (!users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "No account found with that email address." };
    }
    // Mock implementation for development
    return { success: true, error: null };
  });
