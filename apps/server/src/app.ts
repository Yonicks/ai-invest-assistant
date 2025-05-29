// src/app.ts
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';

const app: Express = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

export default app;
