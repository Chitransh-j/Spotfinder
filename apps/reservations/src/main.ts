import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import {ValidationPipe} from '@nestjs/common'
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('consoling')
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser ())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
