import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || DEFAULT_APP_PORT);
}

bootstrap();
