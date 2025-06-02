import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginSchema, RegisterInput, RegisterSchema } from '../models/user.model';

const authService = new AuthService();

export async function signUp(req: Request, res: Response) {
  try {
    // Validate input
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      // Flatten and join all error messages
      const message = result.error.errors.map(e => e.message).join(', ');
      return res.status(400).json({ error: message });
    }
    const { email, password } = result.data as RegisterInput;

    // Register user (with password hashing)
    const user = await authService.register(email, password);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors.map(e => e.message).join(', ');
      return res.status(400).json({ error: message });
    }
    const { email, password } = result.data;
    // **Updated for JWT**
    const { user, token } = await authService.login(email, password);
    return res.status(200).json({ user, token });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}