import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { VoicesController } from './voices.controller';
import { VoicesService } from './voices.service';
import { ElevenLabsService } from './elevenlabs.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [VoicesController],
  providers: [VoicesService, ElevenLabsService],
  exports: [VoicesService, ElevenLabsService],
})
export class VoicesModule {}
