import amqp, { Channel } from 'amqplib';

// URL RabbitMQ
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
// Название exchange для событий пользователей
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
// Routing key для конкретного события
const ROUTING_KEY = 'user.created';
// Название очереди
// const QUEUE_NAME = 'user.created.queue';

let channel: Channel;

// Получение и создание канала (создаётся один раз и повторно используется для всех публикаций)
async function getChannel(): Promise<Channel> {
  if (!channel) {
    // Подключение к RabbitMQ
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();

    // Создаём durable exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
  }
  return channel;
}

// Публикация события USER_CREATED
export async function publishUserCreated(eventData: { id: number; email: string }) {
  // Получаем канал (создаётся один раз)
  const ch = await getChannel();

  const message = {
    type: 'USER_CREATED',
    data: eventData,
  };

  // Лог перед публикацией
  console.log(
    `🔹 Канал готов. Публикуем событие USER_CREATED в exchange "${EXCHANGE_NAME}" с routingKey "${ROUTING_KEY}"`,
  );

  // Публикуем сообщение в exchange (не напрямую в очередь)
  ch.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(message)), {
    // Сообщение сохраняется при перезапуске RabbitMQ
    persistent: true,
    contentType: 'application/json',
  });

  // Лог успешной публикации
  console.log('📤 Событие USER_CREATED отправлено:', eventData);
}
