// src/routes/auth.routes.ts
import { Router } from 'express';
import { login, signUp } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/register', signUp);
router.post('/login', login);


export default router;
