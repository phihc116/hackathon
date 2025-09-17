/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Environment } from './config';

const whitelist = process.env.APP_ALLOW_ORIGINS?.split(',') || [
  'https://admin.myapp.com',
  'https://client.myapp.com',
];
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, origin?: boolean | string) => void,
  ): void {
    if (Environment.isDev) {
      callback(null, true);
    } else {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  } as CustomOrigin,
  credentials: true,
};

async function bootstrap() {
  Environment.init();
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Hackathon API')
    .setDescription('API docs for auth & user service')
    .setVersion('1.0')
    .addCookieAuth('access_token') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);    

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
