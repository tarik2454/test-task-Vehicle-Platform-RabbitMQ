import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { startConsumer } from './rabbit/consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get<number>('VEHICLE_SERVICE_PORT') || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`- Vehicle Service running on port ${port}`);

  //! Запуск консьюмера после поднятия HTTP сервера
  startConsumer().catch((err) => {
    console.error('❌ Ошибка запуска RabbitMQ Consumer:', err);
    process.exit(1);
  });
}
bootstrap();
