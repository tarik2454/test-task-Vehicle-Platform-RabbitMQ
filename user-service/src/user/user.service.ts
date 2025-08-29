import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { users } from '../db/schema';
import { publishUserCreated } from '../rabbit/rabbit';

@Injectable()
export class UserService {
  async create(dto: { email: string; name?: string }) {
    const [user] = await db
      .insert(users)
      .values({ email: dto.email, name: dto.name })
      .returning();

    await publishUserCreated({
      id: user.id,
      email: user.email,
    });

    return user;
  }

  async findAll() {
    return db.select().from(users);
  }

  async findOne(id: number) {
    return db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, id),
    });
  }

  async update(id: number, dto: Partial<{ email: string; name: string }>) {
    const [user] = await db
      .update(users)
      .set(dto)
      .where(users.id.eq(id))
      .returning();
    return user;
  }

  async delete(id: number) {
    const [user] = await db.delete(users).where(users.id.eq(id)).returning();
    return user;
  }
}
