-- CreateTable
CREATE TABLE "Estudante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Estudante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulacao" (
    "id" TEXT NOT NULL,
    "estudanteId" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "quantidade_parcelas" INTEGER NOT NULL,
    "juros_ao_mes" DOUBLE PRECISION NOT NULL,
    "valor_parcela_mensal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Simulacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_email_key" ON "Estudante"("email");

-- AddForeignKey
ALTER TABLE "Simulacao" ADD CONSTRAINT "Simulacao_estudanteId_fkey" FOREIGN KEY ("estudanteId") REFERENCES "Estudante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
