import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('voice-generation') private voiceQueue: Queue,
  ) {}

  async addVoiceGenerationJob(data: {
    generationId: string;
    voiceId: string;
    text: string;
    settings?: any;
  }) {
    return this.voiceQueue.add('generate', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }

  async getQueueStatus() {
    const [waiting, active, completed, failed] = await Promise.all([
      this.voiceQueue.getWaitingCount(),
      this.voiceQueue.getActiveCount(),
      this.voiceQueue.getCompletedCount(),
      this.voiceQueue.getFailedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
    };
  }
}
