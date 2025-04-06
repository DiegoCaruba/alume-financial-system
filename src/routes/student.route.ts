import { Router } from 'express';
import { registerStudent, getStudentData } from '../controllers/student.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerStudent);
router.post('/me', authMiddleware, getStudentData);

export default router;