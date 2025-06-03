// src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import investingRoutes from './routes/investing.routes';

const app: Express = express();
app.use(cors({
  origin: [
    'http://localhost:4200',     // Angular dev server
    'http://localhost:3000',     // (Optional: your API, if you want to call from itself)
    'https://your-cloud-url.com' // TODO: add your prod frontend URL
  ],
  credentials: true,             // Needed if you use cookies/auth
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/investing', investingRoutes);


export default app;
