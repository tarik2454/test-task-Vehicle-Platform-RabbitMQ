import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const RABBITMQ_EXCHANGE = process.env.RABBITMQ_EXCHANGE || 'user.events';

let channel: amqp.Channel;

async function getChannel() {
  if (!channel) {
    const conn = await amqp.connect(RABBITMQ_URL);
    channel = await conn.createChannel();
    await channel.assertExchange(RABBITMQ_EXCHANGE, 'topic', { durable: true });
  }
  return channel;
}

export async function publishUserCreated(eventData: {
  id: number;
  email: string;
}) {
  const ch = await getChannel();
  ch.publish(
    RABBITMQ_EXCHANGE,
    'user.created',
    Buffer.from(
      JSON.stringify({
        type: 'USER_CREATED',
        data: eventData,
      }),
    ),
    { persistent: true, contentType: 'application/json' },
  );

  console.log('📤 Sent USER_CREATED event:', eventData);
}
