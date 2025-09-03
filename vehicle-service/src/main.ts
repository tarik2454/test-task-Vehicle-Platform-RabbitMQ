import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.VEHICLE_SERVICE_PORT || 5000, '0.0.0.0');
  console.log(
    `- Vehicle Service running on port ${process.env.VEHICLE_SERVICE_PORT || 5000}`,
  );
}
bootstrap();
