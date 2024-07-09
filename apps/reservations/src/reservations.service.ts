import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository :ReservationRepository ){}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId:'123'
    })
  }

  findAll() {
    return this.reservationRepository.find({})
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({_id})
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneandUpdate(
      {_id},
      {$set : updateReservationDto}
    )
  }

  remove(_id: string) {
    return this.reservationRepository.findOneandDelete({_id})
  }
}
