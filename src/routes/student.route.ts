import { Router } from 'express';
import { registerStudent, getStudentData, updateStudentData } from '../controllers/student.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerStudent);
router.post('/me', authMiddleware, getStudentData);
router.put('/me', authMiddleware, updateStudentData);

export default router;