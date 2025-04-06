import express from 'express';
import studentRoutes from './routes/student.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', studentRoutes);

export default app;
