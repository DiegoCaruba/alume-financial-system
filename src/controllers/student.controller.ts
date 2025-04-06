import { Request, Response } from 'express';

import { studentRegisterSchema } from '../schemas/student.schema';
import { StudentService } from '../services/student.service';
import { AuthRequest } from '../middlewares/authMiddleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const data = studentRegisterSchema.parse(req.body);
    const student = await StudentService.register(data);
    res.status(201).json(student);

  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }

    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    res.status(500).json({ error: 'Internal Error.' });
  }
};

export const getStudentData = async (req: AuthRequest, res: Response) => {
  try {
    const student = await prisma.estudante.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
      },
    });

    return res.json(student);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar estudante.' });
  }
};
