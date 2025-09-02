# # Используем Node.js Alpine
# FROM node:20-alpine

# # Рабочая директория
# WORKDIR /app

# # Копируем package.json и package-lock.json
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm install

# # Копируем остальные файлы
# COPY tsconfig.json ./
# COPY src ./src
# COPY drizzle.config.ts ./
# COPY drizzle ./drizzle

# # Сборка TypeScript
# RUN npm run build

# # Открываем порт
# EXPOSE 4001

# # Запуск продакшн сервиса
# COPY entrypoint.sh ./
# RUN chmod +x entrypoint.sh
# CMD ["./entrypoint.sh"]

FROM node:20-alpine

WORKDIR /app

# Устанавливаем postgresql-client для pg_isready
RUN apk add --no-cache postgresql-client bash

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
# COPY drizzle.config.ts ./
# COPY drizzle ./drizzle
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

RUN npm run build

EXPOSE 4002
CMD ["./entrypoint.sh"]