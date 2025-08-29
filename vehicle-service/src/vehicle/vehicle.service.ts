import { Injectable, OnModuleInit } from '@nestjs/common';
import { db } from '../db';
import { vehicles } from '../db/schema';
import { eq } from 'drizzle-orm';
import amqp from 'amqplib';

@Injectable()
export class VehicleService implements OnModuleInit {
  async create(dto: {
    make?: string;
    model?: string;
    year?: number;
    userId: number;
  }) {
    const [v] = await db
      .insert(vehicles)
      .values({
        make: dto.make ?? 'Unknown',
        model: dto.model ?? 'Unknown',
        year: dto.year ?? null,
        userId: dto.userId,
      })
      .returning();

    return v;
  }

  findAll() {
    return db.select().from(vehicles);
  }

  findOne(id: number) {
    return db.query.vehicles.findFirst({
      where: eq(vehicles.id, id),
    });
  }

  async update(
    id: number,
    dto: Partial<{ make: string; model: string; year: number }>,
  ) {
    const [v] = await db
      .update(vehicles)
      .set({
        make: dto.make ?? 'Unknown',
        model: dto.model ?? 'Unknown',
        year: dto.year ?? null,
      })
      .where(eq(vehicles.id, id))
      .returning();

    return v;
  }

  async delete(id: number) {
    const [v] = await db
      .delete(vehicles)
      .where(eq(vehicles.id, id))
      .returning();

    return v;
  }

  async onModuleInit() {
    const conn = await amqp.connect(process.env.RABBIT_URL!);
    const ch = await conn.createChannel();
    const exchange = process.env.RABBIT_EXCHANGE || 'user.events';
    const queue = process.env.RABBIT_QUEUE || 'vehicle.user.created';

    await ch.assertExchange(exchange, 'topic', { durable: true });
    await ch.assertQueue(queue, { durable: true });
    await ch.bindQueue(queue, exchange, 'user.created');

    ch.consume(queue, async (msg) => {
      if (!msg) return;
      const event = JSON.parse(msg.content.toString());
      if (event.type === 'USER_CREATED') {
        await db.insert(vehicles).values({
          make: 'Unknown',
          model: 'Unknown',
          year: null,
          userId: event.data.id,
        });
      }
      ch.ack(msg);
    });
  }
}
