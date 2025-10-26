import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listRouter from '../routes/lists.js'; 

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'https://lista-compras.vercel.app', 
  })
);

app.use(express.json());

app.use('/api/lists', listRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'dev' });
});


export default app;