// db/schema/vehicles.ts
import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  make: varchar('make', { length: 255 }).notNull().default('Unknown'),
  model: varchar('model', { length: 255 }).notNull().default('Unknown'),
  year: integer('year'),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
