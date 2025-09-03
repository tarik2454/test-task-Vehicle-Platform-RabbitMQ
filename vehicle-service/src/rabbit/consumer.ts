import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { ConsumeMessage, Channel } from 'amqplib';
import { db } from '../db';
import { vehicles } from '../db/schema';

interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: { id: number; email: string };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isUserCreatedEvent(value: unknown): value is UserCreatedEvent {
  if (!isRecord(value)) return false;
  if (value.type !== 'USER_CREATED') return false;
  const data = value.data;
  if (!isRecord(data)) return false;
  return typeof data.id === 'number' && typeof data.email === 'string';
}

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE || 'user.events';
const QUEUE_NAME = process.env.RABBIT_QUEUE || 'vehicle.user.created';
const ROUTING_KEY = 'user.created';

let channel: Channel;

async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await amqp.connect(RABBIT_URL);
    channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  }
  return channel;
}

@Injectable()
export class RabbitConsumerService implements OnModuleInit {
  async onModuleInit() {
    const ch = await getChannel();
    console.log('✅ Vehicle Service is listening for user.created events...');
    await ch.consume(
      QUEUE_NAME,
      (msg: ConsumeMessage | null): void => {
        if (!msg) return;
        void (async () => {
          const parsed: unknown = JSON.parse(msg.content.toString());
          if (isUserCreatedEvent(parsed)) {
            const userId = parsed.data.id;
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
          channel.ack(msg);
        })().catch((err) => {
          console.error('Error handling message:', err);
          try {
            channel.nack(msg, false, false);
          } catch (e) {
            console.error('Failed to nack message:', e);
          }
        });
      },
      { noAck: false },
    );
  }
}
