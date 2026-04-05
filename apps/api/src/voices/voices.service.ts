import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ElevenLabsService } from './elevenlabs.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';

@Injectable()
export class VoicesService {
  constructor(
    private prisma: PrismaService,
    private elevenlabs: ElevenLabsService,
  ) {}

  async listVoices(userId: string) {
    return this.prisma.voice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createVoice(userId: string, dto: CreateVoiceDto) {
    // Check user's voice limit
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    const voiceCount = await this.prisma.voice.count({ where: { userId } });
    const maxVoices = user.subscription?.maxVoices || 1;

    if (voiceCount >= maxVoices) {
      throw new BadRequestException('Voice limit reached. Upgrade your plan.');
    }

    // Create voice clone with ElevenLabs
    const elevenLabsVoice = await this.elevenlabs.createVoice(dto.name, dto.sampleUrls);

    // Save to database
    const voice = await this.prisma.voice.create({
      data: {
        userId,
        name: dto.name,
        elevenLabsId: elevenLabsVoice.voice_id,
        status: 'READY',
        settings: dto.settings || {},
      },
    });

    return voice;
  }

  async getVoice(userId: string, voiceId: string) {
    const voice = await this.prisma.voice.findFirst({
      where: { id: voiceId, userId },
      include: { samples: true },
    });

    if (!voice) {
      throw new NotFoundException('Voice not found');
    }

    return voice;
  }

  async updateVoice(userId: string, voiceId: string, dto: UpdateVoiceDto) {
    const voice = await this.prisma.voice.findFirst({
      where: { id: voiceId, userId },
    });

    if (!voice) {
      throw new NotFoundException('Voice not found');
    }

    return this.prisma.voice.update({
      where: { id: voiceId },
      data: {
        name: dto.name,
        settings: dto.settings && voice.settings ? { ...(voice.settings as object), ...dto.settings } : dto.settings || voice.settings,
      },
    });
  }

  async deleteVoice(userId: string, voiceId: string) {
    const voice = await this.prisma.voice.findFirst({
      where: { id: voiceId, userId },
    });

    if (!voice) {
      throw new NotFoundException('Voice not found');
    }

    // Delete from ElevenLabs
    await this.elevenlabs.deleteVoice(voice.elevenLabsId);

    // Delete from database
    await this.prisma.voice.delete({ where: { id: voiceId } });

    return { success: true };
  }

  async generateSpeech(userId: string, voiceId: string, dto: GenerateSpeechDto) {
    const voice = await this.prisma.voice.findFirst({
      where: { id: voiceId, userId },
    });

    if (!voice) {
      throw new NotFoundException('Voice not found');
    }

    if (voice.status !== 'READY') {
      throw new BadRequestException('Voice is not ready yet');
    }

    // Check user credits
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.credits < 1) {
      throw new BadRequestException('Insufficient credits');
    }

    // Deduct credit
    await this.prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: 1 } },
    });

    // Generate speech
    const audioBuffer = await this.elevenlabs.generateSpeech(
      voice.elevenLabsId,
      dto.text,
      dto.settings,
    );

    // Save generation record
    const generation = await this.prisma.generation.create({
      data: {
        userId,
        voiceId,
        text: dto.text,
        settings: dto.settings || {},
        status: 'COMPLETED',
        creditsUsed: 1,
      },
    });

    // Update voice stats
    await this.prisma.voice.update({
      where: { id: voiceId },
      data: {
        generationCount: { increment: 1 },
        lastUsedAt: new Date(),
      },
    });

    return {
      generation,
      audio: audioBuffer.toString('base64'),
    };
  }
}
