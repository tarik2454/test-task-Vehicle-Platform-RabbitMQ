import amqp, { Channel, ConsumeMessage } from 'amqplib';
import { db } from '../db';
import { vehicles } from '../db/schema';

// Тип события UserCreated
interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: { id: number; email: string };
}

// Типовые проверки
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Проверяет, что объект соответствует событию USER_CREATED
function isUserCreatedEvent(value: unknown): value is UserCreatedEvent {
  if (!isRecord(value)) return false;
  if (value.type !== 'USER_CREATED') return false;
  const data = value.data;
  if (!isRecord(data)) return false;
  return typeof data.id === 'number' && typeof data.email === 'string';
}

// Конфигурация RabbitMQ
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
// Exchange, на который подписываемся
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
// Событие, которое слушаем
const ROUTING_KEY = 'user.created';
// Очередь консьюмера
const QUEUE_NAME = process.env.RABBIT_QUEUE || 'vehicle.user.created';

let channel: Channel | null = null;

// Получение канала (создаётся один раз и повторно используется)
async function getChannel(): Promise<Channel> {
  if (!channel) {
    // Подключение к RabbitMQ
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();

    // Создаём durable exchange (если его ещё нет)
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    // Создаём очередь консьюмера и привязываем её к exchange
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

    console.log(
      `✅ Очередь "${QUEUE_NAME}" готова и привязана к exchange "${EXCHANGE_NAME}" с routingKey "${ROUTING_KEY}"`,
    );
  }
  return channel;
}

// Функция запуска консьюмера
export async function startConsumer() {
  // Получаем канал
  const ch = await getChannel();

  console.log('✅ Сервис Vehicle слушает события user.created...');

  await ch.consume(
    QUEUE_NAME,
    (msg: ConsumeMessage | null) => {
      if (!msg) return;

      console.log(`📥 Получено сообщение: ${msg.content.toString()}`);

      void (async () => {
        try {
          const parsed: unknown = JSON.parse(msg.content.toString());

          // Проверяем формат сообщения
          if (!isUserCreatedEvent(parsed)) {
            console.warn('⚠️ Сообщение имеет неверный формат:', parsed);
            // Подтверждаем, чтобы RabbitMQ не пытался повторно доставить
            ch.ack(msg);
            return;
          }

          const userId = parsed.data.id;

          // Создаём транспорт для пользователя в базе
          const [vehicle] = await db
            .insert(vehicles)
            .values({ make: 'Unknown', model: 'Unknown', year: null, userId })
            .returning();

          console.log(
            `🚗 Vehicle создан для user ${userId} (vehicle id: ${vehicle.id})`,
          );

          // Подтверждаем успешную обработку сообщения
          ch.ack(msg);
          console.log('✅ Сообщение подтверждено (ack)');
        } catch (err) {
          console.error('❌ Ошибка при обработке сообщения:', err);
          try {
            // Если что-то пошло не так, отклоняем сообщение (оно не будет повторно доставлено)
            ch.nack(msg, false, false);
            console.error('❌ Сообщение отклонено (nack)');
          } catch (e) {
            console.error('❌ Не удалось выполнить nack:', e);
          }
        }
      })();
    },
    // Ручное подтверждение сообщений
    { noAck: false },
  );
}
