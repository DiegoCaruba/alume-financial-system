import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { StudentRegisterDTO } from '../schemas/student.schema';

const prisma = new PrismaClient();

export class StudentService {
  static async register(data: StudentRegisterDTO) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const student = await prisma.estudante.create({
      data: {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        senha: hashedPassword,
      },
    });

    const { senha, ...studentWithoutPassword } = student;
    return studentWithoutPassword;
  }
}
