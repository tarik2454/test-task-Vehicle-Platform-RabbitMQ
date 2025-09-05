import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsString({ message: 'Марка автомобиля должна быть строкой' })
  make?: string;

  @IsOptional()
  @IsString({ message: 'Модель автомобиля должна быть строкой' })
  model?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Год должен быть числом' })
  year?: number;

  @IsNotEmpty({ message: 'Поле userId обязательно' })
  @IsNumber({}, { message: 'userId должен быть числом' })
  userId!: number;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString({ message: 'Марка автомобиля должна быть строкой' })
  make?: string;

  @IsOptional()
  @IsString({ message: 'Модель автомобиля должна быть строкой' })
  model?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Год должен быть числом' })
  year?: number;

  @IsNotEmpty({ message: 'Поле userId обязательно' })
  @IsNumber({}, { message: 'userId должен быть числом' })
  userId!: number;
}

export class Vehicle {
  id!: number;
  make!: string;
  model!: string;
  year?: number;
  userId!: number;
  createdAt!: Date;
  updatedAt?: Date;
}
