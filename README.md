# Alume - Sistema de Financiamento Estudantil

Este projeto é uma RESTful API desenvolvida com Node.js + TypeScript para simular um sistema de financiamento estudantil para estudantes de medicina.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express
- Prisma (ORM)
- PostgreSQL (via Docker)
- JWT para autenticação
- Zod para validação
- Swagger para documentação da API

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker + Docker Compose](https://www.docker.com/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---
## ⚙️ Instalação

### 1. Clone o repositório

```bash
https://github.com/DiegoCaruba/alume-financial-system.git
```

### 2. Instalação de Dependências

```bash
npm install
# ou
yarn install
```
### 3. Crie um arquivo .env baseado no .env.example

- Verifique se o .env está configurado com as mesmas credenciais do docker-compose.yml. Exemplo:

```ini
DATABASE_URL="postgresql://user:password@localhost:5432/alume"
JWT_SECRET="suaChaveSecretaJWT"
```

---
## 🐘 Banco de Dados (Docker + PostgreSQL)

### 4. Suba o container com PostgreSQL

```bash
docker-compose up -d
```

---
## 🧩 Prisma

### 5. Inicialize o banco de dados com Prisma

```bash
npx prisma migrate dev --name init
```

---
## 🚀 Iniciar a aplicação

### 6. Rodar a aplicação em modo desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

---
## 📘 Documentação da API (Swagger)

Após iniciar o servidor, acesse:

```bash
http://localhost:3000/api-docs
```

Lá você poderá:
- Ver todas as rotas disponíveis
- Testar as requisições
- Inserir um Bearer Token no botão "Authorize 🔒" para testar rotas protegidas
