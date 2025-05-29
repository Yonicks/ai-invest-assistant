// src/services/auth.service.ts
import { User } from '../models/user.model';

export class AuthService {
  async register(email: string, password: string): Promise<User> {
    // TODO: Add real logic (check if exists, hash password, save to DB)
    // For now, return a fake user object:
    if (!email || !password) throw new Error('Email and password required');
    // Imagine: Check if user exists, hash password, save user...
    return {
      id: Date.now().toString(),
      email,
      createdAt: new Date(),
    };
  }
}
