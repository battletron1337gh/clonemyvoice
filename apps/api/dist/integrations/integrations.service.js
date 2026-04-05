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
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let IntegrationsService = class IntegrationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listIntegrations(userId) {
        return this.prisma.platformIntegration.findMany({
            where: { userId },
        });
    }
    async connectPlatform(userId, platform) {
        return {
            platform,
            authUrl: `https://api.${platform.toLowerCase()}.com/oauth/authorize?client_id=xxx`,
        };
    }
    async disconnectPlatform(userId, platform) {
        await this.prisma.platformIntegration.deleteMany({
            where: { userId, platform: platform.toUpperCase() },
        });
        return { success: true };
    }
    async updateSettings(userId, platform, dto) {
        const integration = await this.prisma.platformIntegration.findFirst({
            where: { userId, platform: platform.toUpperCase() },
        });
        if (!integration) {
            throw new Error('Integration not found');
        }
        return this.prisma.platformIntegration.update({
            where: { id: integration.id },
            data: {
                settings: { ...integration.settings, ...dto.settings },
            },
        });
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map