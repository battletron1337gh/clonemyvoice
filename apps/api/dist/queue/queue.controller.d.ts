import { QueueService } from './queue.service';
export declare class QueueController {
    private queueService;
    constructor(queueService: QueueService);
    getQueueStatus(): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
    }>;
}
