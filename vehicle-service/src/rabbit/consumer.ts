import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { ConsumeMessage, Channel } from 'amqplib';
import { db } from '../db';
import { vehicles } from '../db/schema';

// Событие, которое приходит из RabbitMQ при создании пользователя
interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: {
    id: number;
    email: string;
  };
}

// Настройки RabbitMQ
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const QUEUE_NAME = process.env.RABBIT_QUEUE || 'vehicle.user.created';
const ROUTING_KEY = 'user.created';

let channel: Channel; // глобальный канал для повторного использования

// Функция для создания и получения канала
async function getChannel(): Promise<Channel> {
  if (!channel) {
    // Подключаемся к RabbitMQ
    const conn = await amqp.connect(RABBIT_URL);

    // Создаём канал
    channel = await conn.createChannel();

    // Создаём exchange типа topic
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    // Создаём очередь (durable = true, чтобы сообщения не терялись)
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Привязываем очередь к exchange с ключом маршрутизации
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  }
  return channel;
}

// Сервис-консьюмер для NestJS
@Injectable()
export class RabbitConsumerService implements OnModuleInit {
  // Вызывается автоматически при старте модуля
  async onModuleInit() {
    await this.startConsumer();
  }

  // Запуск подписки на очередь
  private async startConsumer(): Promise<void> {
    const ch = await getChannel();

    console.log('✅ Vehicle Service is listening for user.created events...');

    // Подписка на очередь
    await ch.consume(
      QUEUE_NAME,
      (msg: ConsumeMessage | null) => {
        if (!msg) return;

        // Обработка сообщения
        void this.handleMessage(msg); // используем void, чтобы ESLint не ругался на "плавающий промис"
      },
      { noAck: false }, // сообщения нужно подтверждать вручную
    );
  }

  // Обработка каждого сообщения
  private async handleMessage(msg: ConsumeMessage) {
    // Преобразуем тело сообщения в объект
    const content = msg.content.toString();
    const event = JSON.parse(content) as UserCreatedEvent;

    // Если это событие создания пользователя
    if (event?.type === 'USER_CREATED' && event.data?.id) {
      const userId = event.data.id;

      // Создаём "неизвестное" транспортное средство для нового пользователя
      const [vehicle] = await db
        .insert(vehicles)
        .values({
          make: 'Unknown',
          model: 'Unknown',
          year: null,
          userId,
        })
        .returning();

      console.log(
        `🚗 Vehicle created for user ${userId} (vehicle id: ${vehicle.id})`,
      );
    }

    // Подтверждаем обработку сообщения
    channel.ack(msg);
  }
}
