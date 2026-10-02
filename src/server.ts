import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'FitPulse Backend is Running smoothly!' });
});

// Example 1: Fetch Members/Users from PostgreSQL
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // 'user' කියන්නේ ඔබේ PostgreSQL table name එකයි
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Example 2: POS Items fetch
app.get('/api/pos/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});