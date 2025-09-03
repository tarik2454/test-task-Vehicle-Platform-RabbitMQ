#!/bin/sh
set -e

# Ждём готовности базы
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  sleep 1
done

# Применяем миграции Drizzle
npx drizzle-kit migrate

# Запускаем NestJS в режиме watch
npm run dev
