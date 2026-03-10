FROM node:20-alpine

WORKDIR /app

# Устанавливаем postgresql-client для pg_isready и очищаем кэш apk
RUN apk add --no-cache postgresql-client bash && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund && npm cache clean --force

COPY tsconfig.json ./
COPY src ./src
COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# RUN npm run build

EXPOSE 4001
CMD ["./entrypoint.sh"]

