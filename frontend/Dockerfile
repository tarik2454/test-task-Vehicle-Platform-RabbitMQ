FROM node:20-alpine
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код для разработки
COPY . .

# Открываем порт Vite
EXPOSE 5173

# Запуск Vite в режиме dev с live-reload
CMD ["npm", "run", "dev"]
