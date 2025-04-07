import { Router } from 'express';
import { createSimulation } from '../controllers/simulation.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/simulations', authMiddleware, createSimulation);
// router.get('/', authMiddleware, listSimulations);

export default router;
