import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule } from '@app/common';
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
        PORT : Joi.number().required()
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
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationRepository],
})
export class ReservationsModule {}
