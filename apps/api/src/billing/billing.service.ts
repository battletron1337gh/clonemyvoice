import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto, BuyCreditsDto } from './dto';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return { plan: 'FREE', status: 'NONE' };
    }

    return subscription;
  }

  async createCheckoutSession(userId: string, dto: CreateCheckoutDto) {
    // TODO: Implement Stripe checkout
    return {
      url: 'https://checkout.stripe.com/mock',
      sessionId: 'mock-session-id',
    };
  }

  async getCredits(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    const transactions = await this.prisma.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return {
      balance: user?.credits || 0,
      transactions,
    };
  }

  async buyCredits(userId: string, dto: BuyCreditsDto) {
    // TODO: Implement Stripe payment for credits
    const creditAmounts = {
      small: 50,
      medium: 150,
      large: 500,
    };

    const credits = creditAmounts[dto.package] || 50;

    await this.prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: credits } },
    });

    await this.prisma.creditTransaction.create({
      data: {
        userId,
        type: 'PURCHASE',
        amount: credits,
        description: `Purchased ${credits} credits`,
      },
    });

    return { creditsAdded: credits };
  }
}
