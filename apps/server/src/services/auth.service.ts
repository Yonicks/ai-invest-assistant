import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';
import { User } from '../models/user.model';

export class AuthService {
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
}
