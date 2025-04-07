export function calculateMonthlyInstallment(value: number, rate: number, installment: number): number {
  const i = rate;
  const n = installment;

  const pmt = value * (i / (1 - Math.pow(1 + i, -n)));
  return parseFloat(pmt.toFixed(2));
}
