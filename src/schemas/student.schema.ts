import { z } from 'zod';

export const studentRegisterSchema = z.object({
  nome: z.string().min(1),
  sobrenome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(6),
});

export type StudentRegisterDTO = z.infer<typeof studentRegisterSchema>;
