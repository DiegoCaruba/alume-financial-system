import { Router } from 'express';
import { createSimulation, getAllSimulations } from '../controllers/simulation.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/simulations', authMiddleware, createSimulation);
router.get('/simulations', authMiddleware, getAllSimulations);

export default router;
