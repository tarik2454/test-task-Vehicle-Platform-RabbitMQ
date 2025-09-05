import amqp, { Channel, ConsumeMessage } from 'amqplib';
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

//! Конфигурация RabbitMQ
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = process.env.RABBIT_QUEUE || 'vehicle.user.created'; //! очередь создаётся продюсером

let channel: Channel | null = null;

//! Получение канала (создаётся один раз и используется повторно)
async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();
    console.log(`✅ Подключено к RabbitMQ, очередь: "${QUEUE_NAME}"`);
  }
  return channel;
}

//! Функция запуска консьюмера
export async function startConsumer() {
  const ch = await getChannel();

  console.log('✅ Сервис Vehicle слушает события user.created...');

  //! Подписка на очередь с ручным подтверждением сообщений
  await ch.consume(
    QUEUE_NAME,
    (msg: ConsumeMessage | null) => {
      if (!msg) return;

      console.log(`📥 Получено сообщение: ${msg.content.toString()}`);

      void (async () => {
        try {
          const parsed: unknown = JSON.parse(msg.content.toString());

          if (!isUserCreatedEvent(parsed)) {
            console.warn('⚠️ Сообщение имеет неверный формат:', parsed);
            ch.ack(msg); // подтверждаем, чтобы не застряло
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
          console.log('✅ Сообщение подтверждено (ack)');
        } catch (err) {
          console.error('❌ Ошибка при обработке сообщения:', err);
          try {
            ch.nack(msg, false, false);
            console.error('❌ Сообщение отклонено (nack)');
          } catch (e) {
            console.error('❌ Не удалось выполнить nack:', e);
          }
        }
      })();
    },
    { noAck: false }, // включаем ручное подтверждение сообщений
  );
}

//! Пример запуска консьюмера
// (можно вызвать из отдельного файла bootstrap.ts или main.ts)
startConsumer().catch((err) => {
  console.error('❌ Ошибка запуска RabbitMQ Consumer:', err);
  process.exit(1);
});
