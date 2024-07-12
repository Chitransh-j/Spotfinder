import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { createChargeDTO } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-06-20',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: createChargeDTO) {

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: +amount * 100,
      confirm: true,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return paymentIntent;
  }
}
