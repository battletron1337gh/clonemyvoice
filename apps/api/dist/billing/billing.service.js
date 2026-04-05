"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BillingService = class BillingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSubscription(userId) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { userId },
        });
        if (!subscription) {
            return { plan: 'FREE', status: 'NONE' };
        }
        return subscription;
    }
    async createCheckoutSession(userId, dto) {
        return {
            url: 'https://checkout.stripe.com/mock',
            sessionId: 'mock-session-id',
        };
    }
    async getCredits(userId) {
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
    async buyCredits(userId, dto) {
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
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingService);
//# sourceMappingURL=billing.service.js.map