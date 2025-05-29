import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export class AuthService {
  async register(email: string, password: string): Promise<User> {
    // TODO: Check if user already exists (demo skips DB)
    // Hash the password (salt rounds = 10, can be changed)
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(`passwordHash: ${passwordHash}`);
    // In real app: Save {email, passwordHash} to DB
    // Here: Just return a mock user object
    return {
      id: Date.now().toString(),
      email,
      createdAt: new Date(),
      // Don't return passwordHash to client!
    };
  }
}
