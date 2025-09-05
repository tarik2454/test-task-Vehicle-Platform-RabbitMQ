import {
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  @MinLength(2, { message: 'Имя должно содержать не меньше 2 символов' })
  name?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  @MinLength(2, { message: 'Имя должно содержать не меньше 2 символов' })
  name?: string;
}

export class User {
  id!: number;
  email!: string;
  name!: string;
  createdAt!: Date;
}
