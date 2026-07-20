# ------------------------------------------------------
# 1. Base image
# ------------------------------------------------------
FROM node:20-alpine AS base

RUN corepack enable
RUN corepack prepare pnpm@8.15.5 --activate
WORKDIR /app

# ------------------------------------------------------
# 2. Install dependencies
# ------------------------------------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ------------------------------------------------------
# 3. Build the application
# ------------------------------------------------------
FROM deps AS build

COPY . .
RUN pnpm run build

# ------------------------------------------------------
# 4. Production image
# ------------------------------------------------------
FROM node:20-alpine AS prod

RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

COPY prisma ./prisma
RUN pnpm prisma generate

CMD ["node", "dist/main.js"]