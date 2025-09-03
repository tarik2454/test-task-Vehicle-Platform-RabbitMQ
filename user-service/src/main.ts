import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Определяем порт для HTTP-сервера (например, для REST API)
  const port = process.env.USER_SERVICE_PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`- User Service running on port ${port}`);
}
bootstrap();
