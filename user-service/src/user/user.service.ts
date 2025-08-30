import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto, User } from './dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  // Создание пользователя и отправка события
  async create(dto: CreateUserDto): Promise<User> {
    // Drizzle ORM ожидает строго типизированные значения
    const insertValues: {
      email: string;
      name: string;
    } = {
      email: dto.email,
      name: dto.name ?? '', // если нет имени, используем пустую строку
    };

    const [user] = await db.insert(users).values(insertValues).returning();

    // Отправка события через RabbitMQ
    this.client.emit<{ id: number; email: string }>('user.created', {
      id: user.id,
      email: user.email,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async findAll(): Promise<User[]> {
    const result = await db.select().from(users);
    return result.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }));
  }

  async findOne(id: number): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async update(id: number, dto: Partial<CreateUserDto>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        email: dto.email ?? undefined,
        name: dto.name ?? undefined,
      })
      .where(eq(users.id, id))
      .returning();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async delete(id: number): Promise<User> {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
