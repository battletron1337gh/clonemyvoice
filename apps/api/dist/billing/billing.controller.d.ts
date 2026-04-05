import { BillingService } from './billing.service';
import { CreateCheckoutDto, BuyCreditsDto } from './dto';
export declare class BillingController {
    private billingService;
    constructor(billingService: BillingService);
    getSubscription(req: any): Promise<{
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
    createCheckout(req: any, dto: CreateCheckoutDto): Promise<{
        url: string;
        sessionId: string;
    }>;
    getCredits(req: any): Promise<{
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
    buyCredits(req: any, dto: BuyCreditsDto): Promise<{
        creditsAdded: number;
    }>;
}
