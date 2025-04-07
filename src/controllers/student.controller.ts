import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { studentRegisterSchema, studentUpdateSchema } from '../schemas/student.schema';
import { StudentService } from '../services/student.service';
import { AuthRequest } from '../middlewares/authMiddleware';

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
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateStudentData = async (req: AuthRequest, res: Response) => {
  try {
    const data = studentUpdateSchema.parse(req.body);

    const updateData: any = { ...data };

    if (data.senha) {
      const hashed = await bcrypt.hash(data.senha, 10);
      updateData.senha = hashed;
    }

    const updatedStudent = await prisma.estudante.update({
      where: { id: req.user!.id },
      data: updateData,
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
      },
    });

    return res.json(updatedStudent);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }

    return res.status(500).json({ error: 'Student data update error.' });
  }
};
