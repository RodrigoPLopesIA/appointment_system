FROM node:18-alpine AS builder


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .


RUN yarn build

# =========================
# Etapa de produção
# =========================
FROM node:18-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 4000


CMD ["node", "dist/server.js"]
