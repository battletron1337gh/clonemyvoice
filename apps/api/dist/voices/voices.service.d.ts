import { PrismaService } from '../prisma/prisma.service';
import { ElevenLabsService } from './elevenlabs.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';
export declare class VoicesService {
    private prisma;
    private elevenlabs;
    constructor(prisma: PrismaService, elevenlabs: ElevenLabsService);
    listVoices(userId: string): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.VoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        generationCount: number;
        lastUsedAt: Date | null;
    }[]>;
    createVoice(userId: string, dto: CreateVoiceDto): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.VoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        generationCount: number;
        lastUsedAt: Date | null;
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
        name: string;
        status: import(".prisma/client").$Enums.VoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        generationCount: number;
        lastUsedAt: Date | null;
    }>;
    updateVoice(userId: string, voiceId: string, dto: UpdateVoiceDto): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.VoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        elevenLabsId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        generationCount: number;
        lastUsedAt: Date | null;
    }>;
    deleteVoice(userId: string, voiceId: string): Promise<{
        success: boolean;
    }>;
    generateSpeech(userId: string, voiceId: string, dto: GenerateSpeechDto): Promise<{
        generation: {
            id: string;
            status: import(".prisma/client").$Enums.GenerationStatus;
            createdAt: Date;
            userId: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
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
