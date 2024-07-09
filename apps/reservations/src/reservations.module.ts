import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import { ReservationDocument, reservationschema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';

@Module({
  imports:[DatabaseModule,
    DatabaseModule.forFeature([{name: ReservationDocument.name,schema:reservationschema}]),
    LoggerModule
    
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationRepository],
})
export class ReservationsModule {}
