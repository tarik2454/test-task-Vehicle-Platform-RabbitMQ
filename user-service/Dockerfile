FROM node:20-alpine

WORKDIR /app

# Устанавливаем postgresql-client для pg_isready
RUN apk add --no-cache postgresql-client bash

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# RUN npm run build

EXPOSE 4001
CMD ["./entrypoint.sh"]

