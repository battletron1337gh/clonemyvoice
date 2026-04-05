import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { VoiceGenerationProcessor } from './processors/voice-generation.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({
      name: 'voice-generation',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, VoiceGenerationProcessor],
  exports: [QueueService],
})
export class QueueModule {}
