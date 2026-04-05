import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QueueService } from './queue.service';

@Controller('queue')
@UseGuards(AuthGuard('jwt'))
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Get('status')
  async getQueueStatus() {
    return this.queueService.getQueueStatus();
  }
}
