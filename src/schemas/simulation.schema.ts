import { z } from 'zod';

export const createSimulationSchema = z.object({
  valor_total: z.number().positive(),
  quantidade_parcelas: z.number().int().positive(),
  juros_ao_mes: z.number().positive(),
});

export type CreateSimulationDTO = z.infer<typeof createSimulationSchema>;
