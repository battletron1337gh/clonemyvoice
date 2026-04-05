import { VoicesService } from './voices.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';
export declare class VoicesController {
    private voicesService;
    constructor(voicesService: VoicesService);
    listVoices(req: any): Promise<{
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
    createVoice(req: any, dto: CreateVoiceDto): Promise<{
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
    getVoice(req: any, id: string): Promise<{
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
    updateVoice(req: any, id: string, dto: UpdateVoiceDto): Promise<{
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
    deleteVoice(req: any, id: string): Promise<{
        success: boolean;
    }>;
    generateSpeech(req: any, id: string, dto: GenerateSpeechDto): Promise<{
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
