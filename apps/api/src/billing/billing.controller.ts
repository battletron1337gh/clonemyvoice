import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillingService } from './billing.service';
import { CreateCheckoutDto, BuyCreditsDto } from './dto';

@Controller('billing')
@UseGuards(AuthGuard('jwt'))
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get('subscription')
  async getSubscription(@Req() req) {
    return this.billingService.getSubscription(req.user.userId);
  }

  @Post('checkout')
  async createCheckout(@Req() req, @Body() dto: CreateCheckoutDto) {
    return this.billingService.createCheckoutSession(req.user.userId, dto);
  }

  @Get('credits')
  async getCredits(@Req() req) {
    return this.billingService.getCredits(req.user.userId);
  }

  @Post('credits/buy')
  async buyCredits(@Req() req, @Body() dto: BuyCreditsDto) {
    return this.billingService.buyCredits(req.user.userId, dto);
  }
}
