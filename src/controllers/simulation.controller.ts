import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { createSimulationSchema } from '../schemas/simulation.schema';
import { AuthRequest } from '../middlewares/authMiddleware';
// import { calculateMonthlyInstallment } from '../utils/util';

const prisma = new PrismaClient();

function calculateMonthlyInstallment(value: number, rate: number, installment: number): number {
  const i = rate;
  const n = installment;

  const pmt = value * (i / (1 - Math.pow(1 + i, -n)));
  return parseFloat(pmt.toFixed(2));
}

export const createSimulation = async (req: AuthRequest, res: Response) => {
  try {
    const data = createSimulationSchema.parse(req.body);

    const valor_parcela_mensal = calculateMonthlyInstallment(
      data.valor_total,
      data.juros_ao_mes,
      data.quantidade_parcelas
    );

    const simulation = await prisma.simulacao.create({
      data: {
        estudanteId: req.user!.id,
        valor_total: data.valor_total,
        quantidade_parcelas: data.quantidade_parcelas,
        juros_ao_mes: data.juros_ao_mes,
        valor_parcela_mensal: valor_parcela_mensal,
      },
    });

    return res.status(201).json(simulation);

  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }

    return res.status(500).json({ error: 'Error during simulation creation.' });
  }
};
