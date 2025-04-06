import express from 'express';
import studentRoutes from './routes/student.route';
import authRoutes from './routes/auth.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', studentRoutes);
app.use('/api', authRoutes);

export default app;
