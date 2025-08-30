import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Connection, Channel, ConsumeMessage } from 'amqplib';
import { db } from '../db';
import { vehicles } from '../db/schema';

interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: { id: number; email: string };
}

@Injectable()
export class RabbitConsumer implements OnModuleInit {
  private readonly RABBIT_URL =
    process.env.RABBIT_URL || 'amqp://localhost:5672';
  private readonly RABBITMQ_EXCHANGE =
    process.env.RABBITMQ_EXCHANGE || 'user.events';

  private conn!: Connection;
  private channel!: Channel;

  async onModuleInit() {
    this.conn = (await connect(this.RABBIT_URL)) as Connection;
    this.channel = await this.conn.createChannel();

    await this.channel.assertExchange(this.RABBITMQ_EXCHANGE, 'topic', {
      durable: true,
    });

    const q = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(
      q.queue,
      this.RABBITMQ_EXCHANGE,
      'user.created',
    );

    console.log('✅ Vehicle Service is listening for user.created events...');

    await this.channel.consume(
      q.queue,
      (msg: ConsumeMessage | null) => {
        if (!msg) return;

        void this.handleMessage(msg);
      },
      { noAck: false },
    );
  }

  private async handleMessage(msg: ConsumeMessage) {
    try {
      const event = JSON.parse(msg.content.toString()) as UserCreatedEvent;

      if (event.type === 'USER_CREATED') {
        const { id: userId } = event.data;

        await db.insert(vehicles).values({
          make: 'Unknown',
          model: 'Unknown',
          year: null,
          userId,
        });

        console.log(`🚗 Vehicle created for user ${userId}`);
      }

      this.channel.ack(msg);
    } catch (err) {
      console.error('❌ Error processing message:', err);
      this.channel.nack(msg, false, false);
    }
  }
}
