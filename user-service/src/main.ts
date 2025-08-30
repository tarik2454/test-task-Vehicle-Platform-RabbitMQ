import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Подключаем RabbitMQ как микросервис
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.RABBIT_EXCHANGE || 'user.events',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();

  // Определяем порт для HTTP-сервера
  const port = process.env.USER_SERVICE_PORT || 4000;
  await app.listen(port);
  console.log(`User Service running on port ${port}`);
}
bootstrap();
