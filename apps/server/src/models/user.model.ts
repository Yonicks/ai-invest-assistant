import { z } from 'zod';

// Zod schema for validation (frontend/backend)
export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  // Do NOT include password here
}


export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

