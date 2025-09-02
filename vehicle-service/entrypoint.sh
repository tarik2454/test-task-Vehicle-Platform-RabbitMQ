#!/bin/sh
set -e

# Ждём готовности базы
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  sleep 1
done

echo "Skipping migrations in vehicle-service"

node dist/main.js
