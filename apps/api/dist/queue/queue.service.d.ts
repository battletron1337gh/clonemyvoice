import { Queue } from 'bullmq';
export declare class QueueService {
    private voiceQueue;
    constructor(voiceQueue: Queue);
    addVoiceGenerationJob(data: {
        generationId: string;
        voiceId: string;
        text: string;
        settings?: any;
    }): Promise<import("bullmq").Job<any, any, string>>;
    getQueueStatus(): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
    }>;
}
