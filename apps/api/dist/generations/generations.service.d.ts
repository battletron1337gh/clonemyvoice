import { PrismaService } from '../prisma/prisma.service';
export declare class GenerationsService {
    private prisma;
    constructor(prisma: PrismaService);
    listGenerations(userId: string, page?: number, limit?: number): Promise<{
        data: ({
            voice: {
                name: string;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.GenerationStatus;
            createdAt: Date;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            text: string;
            userId: string;
            audioUrl: string | null;
            duration: number | null;
            errorMessage: string | null;
            creditsUsed: number;
            jobId: string | null;
            completedAt: Date | null;
            voiceId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getGeneration(userId: string, generationId: string): Promise<{
        voice: {
            name: string;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.GenerationStatus;
        createdAt: Date;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        text: string;
        userId: string;
        audioUrl: string | null;
        duration: number | null;
        errorMessage: string | null;
        creditsUsed: number;
        jobId: string | null;
        completedAt: Date | null;
        voiceId: string;
    }>;
    deleteGeneration(userId: string, generationId: string): Promise<{
        success: boolean;
    }>;
}
