FROM node:20-alpine
WORKDIR /app

# Устанавливаем зависимости и сразу очищаем кэш npm для экономии места
COPY package*.json ./
RUN npm install && npm cache clean --force

# Копируем весь код для разработки
COPY . .

# Открываем порт Vite
EXPOSE 5173

# Запуск Vite в режиме dev с live-reload
CMD ["npm", "run", "dev"]
