import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule,ConfigService} from '@nestjs/config';
import * as Joi from 'joi';
@Module({
    imports:[
        NestjsConfigModule.forRoot({
        validationSchema:Joi.object({
            MONGODB_URI : Joi.string().required(),
        })
    })], // basically to take up the .env files from root directory
    providers:[ConfigService],
    exports:[ConfigService]
})
export class ConfigModule {}
