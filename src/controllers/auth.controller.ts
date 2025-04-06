import { Request, Response } from 'express';
import { loginSchema } from '../schemas/auth.schema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = loginSchema.parse(req.body);

    const student = await prisma.estudante.findUnique({ where: { email } });

    if (!student) {
      return res.status(401).json({ error: 'Email or password is invalid.' });
    }

    const isPasswordValid = await bcrypt.compare(senha, student.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email or password is invalid.' });
    }

    const token = jwt.sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET!,
      { expiresIn: '120m' }
    //   { expiresIn: '5m' }
    );

    return res.json({
      token,
      estudante: {
        id: student.id,
        nome: student.nome,
        sobrenome: student.sobrenome,
        email: student.email,
      },
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }

    return res.status(500).json({ error: 'Error during authentication.' });
  }
};
