// src/routes/auth.routes.ts
import { Router } from 'express';
import { signUp } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/register', signUp);

export default router;
