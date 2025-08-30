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

