import { GenerationsService } from './generations.service';
export declare class GenerationsController {
    private generationsService;
    constructor(generationsService: GenerationsService);
    listGenerations(req: any, page?: string, limit?: string): Promise<{
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
    getGeneration(req: any, id: string): Promise<{
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
    deleteGeneration(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
