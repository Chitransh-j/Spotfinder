import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'

@Module({
  imports: [UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGODB_URI : Joi.string().required(),
        JWT_SECRET : Joi.string().required(),
        JWT_EXPIRATION : Joi.string().required() 
      })
      }),
    JwtModule.registerAsync({
      useFactory :(configService: ConfigService) => ({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`
        }
      }),
      inject:[ConfigService]
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
