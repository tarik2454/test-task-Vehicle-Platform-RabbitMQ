import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { ConsumeMessage, Channel } from 'amqplib';
import { db } from '../db';
import { vehicles } from '../db/schema';

//! Тип события UserCreated
interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: { id: number; email: string };
}

//! Типовые проверки
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

//! Проверяет, что объект соответствует событию USER_CREATED
function isUserCreatedEvent(value: unknown): value is UserCreatedEvent {
  if (!isRecord(value)) return false;
  if (value.type !== 'USER_CREATED') return false;
  const data = value.data;
  if (!isRecord(data)) return false;
  return typeof data.id === 'number' && typeof data.email === 'string';
}

//! Конфигурация
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = process.env.RABBIT_QUEUE || 'vehicle.user.created'; //! очередь уже создаётся продюсером

let channel: Channel;

//! Консюмер подключается к существующей очереди и exchange (не создаёт их)
async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();
    //! Консюмер **не создаёт очередь и не делает bind**
  }
  return channel;
}

@Injectable()
export class RabbitConsumerService implements OnModuleInit {
  async onModuleInit() {
    //! Получаем канал для RabbitMQ
    const ch = await getChannel();

    console.log('✅ Сервис Vehicle слушает события user.created...');

    //! Асинхронная подписка на очередь с ручным подтверждением (ack/nack)
    await ch.consume(
      QUEUE_NAME,
      (msg: ConsumeMessage | null): void => {
        if (!msg) return;

        console.log(`📥 Получено сообщение: ${msg.content.toString()}`);

        void (async () => {
          //! Парсим JSON сообщение
          const parsed: unknown = JSON.parse(msg.content.toString());

          //! Проверка корректности события
          if (!isUserCreatedEvent(parsed)) {
            console.warn('⚠️ Сообщение имеет неверный формат:', parsed);
            //! Подтверждаем сообщение, чтобы оно не зависло
            ch.ack(msg);
            return;
          }

          const userId = parsed.data.id;
          //! Создаём транспорт для пользователя в базе
          const [vehicle] = await db
            .insert(vehicles)
            .values({ make: 'Unknown', model: 'Unknown', year: null, userId })
            .returning();

          console.log(
            `🚗 Vehicle создан для user ${userId} (vehicle id: ${vehicle.id})`,
          );

          //! Подтверждаем успешную обработку сообщения
          ch.ack(msg);
          console.log(`✅ Сообщение подтверждено (ack)`);
        })().catch((err) => {
          //! Лог ошибки обработки сообщения
          console.error('❌ Ошибка при обработке сообщения:', err);
          try {
            //! Отклоняем сообщение при ошибке
            ch.nack(msg, false, false);
            console.error('❌ Сообщение отклонено (nack)');
          } catch (e) {
            // !Лог, если nack не сработал
            console.error('❌ Не удалось выполнить nack:', e);
          }
        });
      },
      //! Включаем ручное подтверждение сообщений
      { noAck: false },
    );
  }
}
