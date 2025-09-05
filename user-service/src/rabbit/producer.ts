import amqp, { Channel } from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const ROUTING_KEY = 'user.created';
const QUEUE_NAME = 'user.created.queue';

let channel: Channel;

async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();

    //! создаём durable exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    //! создаём durable очередь и привязываем её к exchange с routing key
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  }
  return channel;
}

export async function publishUserCreated(eventData: {
  id: number;
  email: string;
}) {
  const ch = await getChannel();

  const message = {
    type: 'USER_CREATED',
    data: eventData,
  };

  //! публикуем событие в exchange
  ch.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(message)), {
    persistent: true,
    contentType: 'application/json',
  });

  console.log('📤 Sent USER_CREATED event:', eventData);
}
