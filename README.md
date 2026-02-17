# Vehicle Platform with RabbitMQ

Микросервисная платформа для управления пользователями и транспортными средствами с использованием RabbitMQ для межсервисной коммуникации.

## Архитектура проекта

Проект состоит из следующих компонентов:

- **Frontend** (React + TypeScript + Vite) - порт 5173
- **User Service** (NestJS) - порт 4001
- **Vehicle Service** (NestJS) - порт 4002
- **PostgreSQL для пользователей** - порт 5432
- **PostgreSQL для транспортных средств** - порт 5434
- **RabbitMQ** - порты 5672 (AMQP) и 15672 (Management UI)

## Требования

- Docker и Docker Compose
- Node.js 18+ (если запускаете локально без Docker)

## Запуск проекта

### Вариант 1: Запуск через Docker Compose (рекомендуется)

Самый простой способ запустить весь проект:

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes (удалит данные БД)
docker-compose down -v
```

После запуска сервисы будут доступны по следующим адресам:

- **Frontend**: http://localhost:5173
- **User Service API**: http://localhost:4001
- **Vehicle Service API**: http://localhost:4002
- **RabbitMQ Management UI**: http://localhost:15672 (guest/guest)
- **PostgreSQL Users**: localhost:5432
- **PostgreSQL Vehicles**: localhost:5434

### Вариант 2: Локальный запуск (без Docker)

Если вы хотите запустить сервисы локально:

#### 1. Запуск баз данных и RabbitMQ через Docker

```bash
# Запуск только инфраструктуры (БД и RabbitMQ)
docker-compose up -d postgres_users postgres_vehicles rabbitmq
```

#### 2. Настройка переменных окружения

**User Service** (`user-service/.env`):

```
USER_SERVICE_PORT=4001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/users_db
RABBIT_URL=amqp://guest:guest@localhost:5672
RABBIT_EXCHANGE=user.events
```

**Vehicle Service** (`vehicle-service/.env`):

```
VEHICLE_SERVICE_PORT=4002
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/vehicles_db
RABBIT_URL=amqp://guest:guest@localhost:5672
RABBIT_EXCHANGE=user.events
RABBIT_QUEUE=vehicle.user.created
```

**Frontend** (`frontend/.env`):

```
VITE_API_USER_SERVICE=http://localhost:4001
VITE_API_VEHICLE_SERVICE=http://localhost:4002
```

#### 3. Установка зависимостей и запуск

**User Service:**

```bash
cd user-service
npm install
npx drizzle-kit migrate
npm run start:dev
```

**Vehicle Service:**

```bash
cd vehicle-service
npm install
npx drizzle-kit migrate
npm run start:dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## Проверка работы

1. Откройте браузер и перейдите на http://localhost:5173
2. Проверьте API endpoints:
   - User Service: http://localhost:4001/users
   - Vehicle Service: http://localhost:4002/vehicles
3. Проверьте RabbitMQ Management: http://localhost:15672 (логин: guest, пароль: guest)

## Структура проекта

```
.
├── docker-compose.yml          # Конфигурация Docker Compose
├── frontend/                   # React фронтенд приложение
├── user-service/              # Сервис управления пользователями
└── vehicle-service/           # Сервис управления транспортными средствами
```

## Миграции базы данных

Миграции выполняются автоматически при запуске через Docker Compose. При локальном запуске выполните:

```bash
# User Service
cd user-service
npx drizzle-kit migrate

# Vehicle Service
cd vehicle-service
npx drizzle-kit migrate
```

## Устранение проблем

### Порт уже занят

Если порт занят, измените его в `docker-compose.yml` или остановите конфликтующий сервис.

### Проблемы с подключением к БД

Убедитесь, что контейнеры PostgreSQL запущены и здоровы:

```bash
docker-compose ps
```

### Очистка и перезапуск

```bash
# Остановка и удаление контейнеров и volumes
docker-compose down -v

# Пересборка образов
docker-compose build --no-cache

# Запуск заново
docker-compose up -d
```
