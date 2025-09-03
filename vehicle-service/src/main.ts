import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.VEHICLE_SERVICE_PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`- Vehicle Service running on port ${port}`);
}
bootstrap();
