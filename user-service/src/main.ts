import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.USER_SERVICE_PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`- User Service running on port ${port}`);
}
bootstrap();
