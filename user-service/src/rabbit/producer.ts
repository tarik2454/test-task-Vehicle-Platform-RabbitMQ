import amqp, { Channel } from 'amqplib';

// Настройки RabbitMQ
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const QUEUE_NAME = 'user.events';
const ROUTING_KEY = 'user.created';

let channel: Channel; // глобальный канал для повторного использования

// Функция для создания и получения канала
async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL); // подключаемся к RabbitMQ
    channel = await conn.createChannel(); // создаём канал

    // Создаём exchange типа topic
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    // Создаём очередь (durable = true, чтобы сообщения не терялись)
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Привязываем очередь к exchange с routing key
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  }
  return channel;
}

// Функция публикации события USER_CREATED
export async function publishUserCreated(eventData: {
  id: number;
  email: string;
}) {
  const ch = await getChannel(); // получаем канал

  // Публикуем сообщение в exchange с ключом маршрутизации
  ch.publish(
    EXCHANGE_NAME,
    ROUTING_KEY,
    Buffer.from(JSON.stringify({ type: 'USER_CREATED', data: eventData })),
    { persistent: true, contentType: 'application/json' }, // делаем сообщение стойким
  );

  console.log('📤 Sent USER_CREATED event:', eventData); // логируем отправку
}
