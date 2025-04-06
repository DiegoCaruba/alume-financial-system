export function calcularParcelaMensal(PV: number, i: number, n: number): number {
    const parcela = PV * (i / (1 - Math.pow(1 + i, -n)));
    return Number(parcela.toFixed(2));
  }
  