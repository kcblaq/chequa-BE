import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    // origin: 'http://127.0.0.1:5173',
    origin: 'http://kejepay.com.ng',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
