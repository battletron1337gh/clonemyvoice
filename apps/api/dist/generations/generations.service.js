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
exports.GenerationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GenerationsService = class GenerationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listGenerations(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [generations, total] = await Promise.all([
            this.prisma.generation.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: { voice: { select: { name: true } } },
            }),
            this.prisma.generation.count({ where: { userId } }),
        ]);
        return {
            data: generations,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getGeneration(userId, generationId) {
        const generation = await this.prisma.generation.findFirst({
            where: { id: generationId, userId },
            include: { voice: { select: { name: true } } },
        });
        if (!generation) {
            throw new common_1.NotFoundException('Generation not found');
        }
        return generation;
    }
    async deleteGeneration(userId, generationId) {
        const generation = await this.prisma.generation.findFirst({
            where: { id: generationId, userId },
        });
        if (!generation) {
            throw new common_1.NotFoundException('Generation not found');
        }
        await this.prisma.generation.delete({ where: { id: generationId } });
        return { success: true };
    }
};
exports.GenerationsService = GenerationsService;
exports.GenerationsService = GenerationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GenerationsService);
//# sourceMappingURL=generations.service.js.map