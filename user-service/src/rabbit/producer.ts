import amqp, { Channel } from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const ROUTING_KEY = 'user.created';

let channel: Channel;

async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
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
