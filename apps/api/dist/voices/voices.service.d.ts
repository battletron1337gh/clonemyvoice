import { PrismaService } from '../prisma/prisma.service';
import { ElevenLabsService } from './elevenlabs.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';
export declare class VoicesService {
    private prisma;
    private elevenlabs;
    constructor(prisma: PrismaService, elevenlabs: ElevenLabsService);
    listVoices(userId: string): Promise<{
        id: string;
        userId: string;
        name: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.VoiceStatus;
        generationCount: number;
        lastUsedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createVoice(userId: string, dto: CreateVoiceDto): Promise<{
        id: string;
        userId: string;
        name: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.VoiceStatus;
        generationCount: number;
        lastUsedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getVoice(userId: string, voiceId: string): Promise<{
        samples: {
            id: string;
            createdAt: Date;
            voiceId: string;
            fileUrl: string;
            duration: number;
            fileSize: number;
        }[];
    } & {
        id: string;
        userId: string;
        name: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.VoiceStatus;
        generationCount: number;
        lastUsedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateVoice(userId: string, voiceId: string, dto: UpdateVoiceDto): Promise<{
        id: string;
        userId: string;
        name: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.VoiceStatus;
        generationCount: number;
        lastUsedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteVoice(userId: string, voiceId: string): Promise<{
        success: boolean;
    }>;
    generateSpeech(userId: string, voiceId: string, dto: GenerateSpeechDto): Promise<{
        generation: {
            id: string;
            userId: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            status: import(".prisma/client").$Enums.GenerationStatus;
            createdAt: Date;
            voiceId: string;
            duration: number | null;
            text: string;
            audioUrl: string | null;
            errorMessage: string | null;
            creditsUsed: number;
            jobId: string | null;
            completedAt: Date | null;
        };
        audio: string;
    }>;
}
