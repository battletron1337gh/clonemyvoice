import { VoicesService } from './voices.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';
export declare class VoicesController {
    private voicesService;
    constructor(voicesService: VoicesService);
    listVoices(req: any): Promise<{
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
    createVoice(req: any, dto: CreateVoiceDto): Promise<{
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
    updateVoice(req: any, id: string, dto: UpdateVoiceDto): Promise<{
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
    deleteVoice(req: any, id: string): Promise<{
        success: boolean;
    }>;
    generateSpeech(req: any, id: string, dto: GenerateSpeechDto): Promise<{
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
