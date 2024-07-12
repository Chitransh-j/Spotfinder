import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule, PAYMENTS_SERVICE } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import { ReservationDocument, reservationschema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[DatabaseModule,
    DatabaseModule.forFeature([{name: ReservationDocument.name,schema:reservationschema}]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGODB_URI : Joi.string().required(),
        PORT : Joi.number().required(),
        AUTH_HOST : Joi.string().required(),
        PAYMENTS_HOST : Joi.string().required(),
        AUTH_PORT : Joi.string().required(),
        PAYMENTS_PORT : Joi.string().required()
      })
    }),
    ClientsModule.registerAsync([
      {
        name :AUTH_SERVICE,
        useFactory: (configservice :ConfigService) =>({
          transport: Transport.TCP,
          options:{
            host :configservice.get('AUTH_HOST'),
            port :configservice.get('AUTH_PORT')
          }
        }),
        inject:[ConfigService]
      },
      {
        name :PAYMENTS_SERVICE,
        useFactory: (configservice :ConfigService) =>({
          transport: Transport.TCP,
          options:{
            host :configservice.get('PAYMENTS_HOST'),
            port :configservice.get('PAYMENTS_PORT')
          }
        }),
        inject:[ConfigService]
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationRepository],
})
export class ReservationsModule {}
