<P# C47 Backend

A production-ready backend built with **NestJS**, **Prisma**, **pnpm**, **Redis/BullMQ**, and deployed using **Railway**.  
This service powers the validator dashboard, RPC indexers, queue processors, and API endpoints for the C47 ecosystem.

---

## 🚀 Features

- **NestJS Modular Architecture**
- **Prisma ORM** with PostgreSQL
- **BullMQ / Redis** for background jobs and queue processing
- **RPC Indexers** for multiple chains (Solana, Aptos, NEAR, Ethereum, BNB, Polygon, Avalanche)
- **Config-driven environment setup**
- **Production-ready Dockerfile**
- **Railway RAILPACK deployment**
- **pnpm** for fast, clean dependency management

---

## 📁 Project Structure

backend/
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── modules/
│   │   ├── user/
│   │   ├── auth/
│   │   ├── queue/
│   │   ├── rpc/
│   │   └── common/
│   │
│   ├── config/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── test/
│
├── dist/                # build output
├── node_modules/        # dependencies
│
├── .env.example         # safe template
├── .env.production      # production template (ignored)
├── .gitignore
├── .dockerignore
├── Dockerfile
├── railway.json
│
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json

---

## 🔧 Installation

Install dependencies using **pnpm**:


---

## 🛠️ Development

Start the development server:


Run Prisma migrations:


Generate Prisma Client:


---

## 🧪 Testing


---

## 🏗️ Build


Build output is stored in:


---

## 🚀 Production

Start the production server:


This runs:


---

## 🐳 Docker

Build the Docker image:


Run the container:


---

## ☁️ Railway Deployment

This project includes a `railway.json` file that defines:

- Build command  
- Start command  
- Runtime  
- Replica count  
- Restart policy  

Railway automatically reads this file during deployment.

Environment variables must be added in:

**Railway → helpful-prosperity → Variables**

Use `.env.example` as a reference.

---

## 🔐 Environment Variables

Environment variables are **not committed** to the repository.

See:


for the full list of required variables.

Production secrets must be added directly in Railway.

---

## 📜 License

UNLICENSED — internal project.

---

## ✨ Author

Charm_Capsule  
C47 / Heinhtat Professional Services LLC
