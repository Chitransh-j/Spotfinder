import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createChargeDTO } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create-charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: createChargeDTO) {
    return this.paymentsService.createCharge(data);
  }
}
