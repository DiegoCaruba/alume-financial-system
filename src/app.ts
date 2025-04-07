import dotenv from 'dotenv';
import express from 'express';

import studentRoutes from './routes/student.route';
import authRoutes from './routes/auth.route';
import simulationRoutes from './routes/simulation.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', simulationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
