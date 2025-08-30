import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.RABBIT_QUEUE || 'user.events',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.VEHICLE_SERVICE_PORT || 5000);
  console.log(
    `User Service running on port ${process.env.VEHICLE_SERVICE_PORT || 5000}`,
  );
}
bootstrap();
