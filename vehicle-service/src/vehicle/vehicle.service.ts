import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db';
import { vehicles } from '../db/schema';
import { eq, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { CreateVehicleDto, UpdateVehicleDto, Vehicle } from './dto';

type DbVehicle = InferSelectModel<typeof vehicles>; // для выборки
type NewVehicle = InferInsertModel<typeof vehicles>; // для вставки

@Injectable()
export class VehicleService {
  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const insertValues: NewVehicle = {
      make: dto.make ?? 'Unknown',
      model: dto.model ?? 'Unknown',
      year: dto.year,
      userId: dto.userId,
    };

    if (!insertValues.userId) throw new Error('userId is required');

    const [vehicle] = await db
      .insert(vehicles)
      .values(insertValues)
      .returning();
    return this.mapDbVehicle(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    const result = await db.select().from(vehicles);
    return result.map((v) => this.mapDbVehicle(v));
  }

  async findOne(id: number): Promise<Vehicle | null> {
    const vehicle = await db.query.vehicles.findFirst({
      where: eq(vehicles.id, id),
    });
    return vehicle ? this.mapDbVehicle(vehicle) : null;
  }

  async update(id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const updatedVehicles = await db
      .update(vehicles)
      .set({
        make: dto.make ?? undefined,
        model: dto.model ?? undefined,
        year: dto.year ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(vehicles.id, id))
      .returning();

    if (!updatedVehicles.length)
      throw new NotFoundException('Vehicle not found');
    return this.mapDbVehicle(updatedVehicles[0]);
  }

  async delete(id: number): Promise<Vehicle> {
    const deletedVehicles = await db
      .delete(vehicles)
      .where(eq(vehicles.id, id))
      .returning();

    if (!deletedVehicles.length)
      throw new NotFoundException('Vehicle not found');
    return this.mapDbVehicle(deletedVehicles[0]);
  }

  private mapDbVehicle = (vehicle: DbVehicle): Vehicle => ({
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year ?? undefined,
    userId: vehicle.userId,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt ?? vehicle.createdAt,
  });
}
