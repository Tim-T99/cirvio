import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
app.use(express.json());
const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

pgPool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the backend server!');
});

app.post('/api/signup', async (req: Request, res: Response) => {
  const { formData } = req.body;
  try {
    const result = await pgPool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
      [formData.email, formData.username, formData.password]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
