import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto, BuyCreditsDto } from './dto';
export declare class BillingService {
    private prisma;
    constructor(prisma: PrismaService);
    getSubscription(userId: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        maxVoices: number;
        maxGenerations: number;
        features: string[];
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
    } | {
        plan: string;
        status: string;
    }>;
    createCheckoutSession(userId: string, dto: CreateCheckoutDto): Promise<{
        url: string;
        sessionId: string;
    }>;
    getCredits(userId: string): Promise<{
        balance: number;
        transactions: {
            id: string;
            createdAt: Date;
            userId: string;
            type: import(".prisma/client").$Enums.TransactionType;
            amount: number;
            generationId: string | null;
            description: string | null;
        }[];
    }>;
    buyCredits(userId: string, dto: BuyCreditsDto): Promise<{
        creditsAdded: number;
    }>;
}
