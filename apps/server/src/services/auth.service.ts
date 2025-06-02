import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';



export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'your-default-secret'; // Use env var for real secret!

  async register(email: string, password: string): Promise<User> {
    // 1. Check if user already exists
    const { data: existing, error: findError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    if (existing) throw new Error('User already exists');
    console.log(`findError: ${findError}`);
    // 2. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Insert into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: passwordHash }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // 4. Return user object (omit password hash)
    return {
      id: data.id,
      email: data.email,
      createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    };
  }


  async login(email: string, password: string): Promise<{ user: User, token: string }> {



    // 1. Lookup user by email
    const { data: userRow, error } = await supabase
      .from('users')
      .select('id, email, password_hash, created_at')
      .eq('email', email)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!userRow) throw new Error('User not found');

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, userRow.password_hash);
    if (!isMatch) throw new Error('Invalid credentials');

    const user = {
      id: userRow.id,
      email: userRow.email,
      createdAt: userRow.created_at ? new Date(userRow.created_at) : new Date(),
    };
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '2h' }
    );


    // 3. Return user info (no password hash!)
    return { user, token };

  }
}

