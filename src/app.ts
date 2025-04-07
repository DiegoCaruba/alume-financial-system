import express from 'express';
import studentRoutes from './routes/student.route';
import authRoutes from './routes/auth.route';
import simulationRoutes from './routes/simulation.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', studentRoutes);
app.use('/api', authRoutes);
app.use('/api', simulationRoutes);

export default app;
