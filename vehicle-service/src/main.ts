import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Подключаем RabbitMQ как микросервис
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.RABBIT_QUEUE || 'vehicle.user.created',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  // Можно также слушать HTTP (например для healthcheck)
  const port = process.env.VEHICLE_SERVICE_PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`- Vehicle Service running on port ${port}`);
}
bootstrap();
