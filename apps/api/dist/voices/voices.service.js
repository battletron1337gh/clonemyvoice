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
exports.VoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const elevenlabs_service_1 = require("./elevenlabs.service");
let VoicesService = class VoicesService {
    constructor(prisma, elevenlabs) {
        this.prisma = prisma;
        this.elevenlabs = elevenlabs;
    }
    async listVoices(userId) {
        return this.prisma.voice.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createVoice(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true },
        });
        const voiceCount = await this.prisma.voice.count({ where: { userId } });
        const maxVoices = user.subscription?.maxVoices || 1;
        if (voiceCount >= maxVoices) {
            throw new common_1.BadRequestException('Voice limit reached. Upgrade your plan.');
        }
        const elevenLabsVoice = await this.elevenlabs.createVoice(dto.name, dto.sampleUrls);
        const voice = await this.prisma.voice.create({
            data: {
                userId,
                name: dto.name,
                elevenLabsId: elevenLabsVoice.voice_id,
                status: 'READY',
                settings: dto.settings || {},
            },
        });
        return voice;
    }
    async getVoice(userId, voiceId) {
        const voice = await this.prisma.voice.findFirst({
            where: { id: voiceId, userId },
            include: { samples: true },
        });
        if (!voice) {
            throw new common_1.NotFoundException('Voice not found');
        }
        return voice;
    }
    async updateVoice(userId, voiceId, dto) {
        const voice = await this.prisma.voice.findFirst({
            where: { id: voiceId, userId },
        });
        if (!voice) {
            throw new common_1.NotFoundException('Voice not found');
        }
        return this.prisma.voice.update({
            where: { id: voiceId },
            data: {
                name: dto.name,
                settings: dto.settings && voice.settings ? { ...voice.settings, ...dto.settings } : dto.settings || voice.settings,
            },
        });
    }
    async deleteVoice(userId, voiceId) {
        const voice = await this.prisma.voice.findFirst({
            where: { id: voiceId, userId },
        });
        if (!voice) {
            throw new common_1.NotFoundException('Voice not found');
        }
        await this.elevenlabs.deleteVoice(voice.elevenLabsId);
        await this.prisma.voice.delete({ where: { id: voiceId } });
        return { success: true };
    }
    async generateSpeech(userId, voiceId, dto) {
        const voice = await this.prisma.voice.findFirst({
            where: { id: voiceId, userId },
        });
        if (!voice) {
            throw new common_1.NotFoundException('Voice not found');
        }
        if (voice.status !== 'READY') {
            throw new common_1.BadRequestException('Voice is not ready yet');
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.credits < 1) {
            throw new common_1.BadRequestException('Insufficient credits');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 1 } },
        });
        const audioBuffer = await this.elevenlabs.generateSpeech(voice.elevenLabsId, dto.text, dto.settings);
        const generation = await this.prisma.generation.create({
            data: {
                userId,
                voiceId,
                text: dto.text,
                settings: dto.settings || {},
                status: 'COMPLETED',
                creditsUsed: 1,
            },
        });
        await this.prisma.voice.update({
            where: { id: voiceId },
            data: {
                generationCount: { increment: 1 },
                lastUsedAt: new Date(),
            },
        });
        return {
            generation,
            audio: audioBuffer.toString('base64'),
        };
    }
};
exports.VoicesService = VoicesService;
exports.VoicesService = VoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        elevenlabs_service_1.ElevenLabsService])
], VoicesService);
//# sourceMappingURL=voices.service.js.map