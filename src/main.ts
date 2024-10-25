import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentInstance } from './enviroment';
import { json } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const enviroment = await EnvironmentInstance.getConfig();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(json());
  await app.init();
  void app.listen(Number(enviroment?.API_PORT ?? 3000));
}
void bootstrap();
