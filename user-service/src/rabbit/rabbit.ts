// src/rabbitmq/publisher.ts
import amqp from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const QUEUE_NAME = 'user.events';
const ROUTING_KEY = 'user.created';

let channel: amqp.Channel;

async function getChannel() {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();

    // Создаём exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    // Создаём очередь
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Привязываем очередь к exchange с routing key
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  }
  return channel;
}

export async function publishUserCreated(eventData: {
  id: number;
  email: string;
}) {
  const ch = await getChannel();
  ch.publish(
    EXCHANGE_NAME,
    ROUTING_KEY,
    Buffer.from(JSON.stringify({ type: 'USER_CREATED', data: eventData })),
    { persistent: true, contentType: 'application/json' },
  );

  console.log('📤 Sent USER_CREATED event:', eventData);
}
