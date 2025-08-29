# Stage 1: build
# FROM node:20-alpine as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# # Stage 2: run
# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# CMD ["node", "dist/main.js"]

# Используем Node.js Alpine
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY tsconfig.json ./
COPY src ./src

# Сборка TypeScript
RUN npm run build

# Открываем порт
EXPOSE 4001

# Запуск продакшн сервиса
CMD ["node", "dist/main.js"]

