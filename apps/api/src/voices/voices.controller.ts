import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { VoicesService } from './voices.service';
import { ElevenLabsService } from './elevenlabs.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';

@Controller('voices')
@UseGuards(AuthGuard('jwt'))
export class VoicesController {
  constructor(
    private voicesService: VoicesService,
    private elevenLabsService: ElevenLabsService,
  ) {}

  @Get()
  async listVoices(@Req() req) {
    return this.voicesService.listVoices(req.user.userId);
  }

  @Post()
  async createVoice(@Req() req, @Body() dto: CreateVoiceDto) {
    return this.voicesService.createVoice(req.user.userId, dto);
  }

  @Get(':id')
  async getVoice(@Req() req, @Param('id') id: string) {
    return this.voicesService.getVoice(req.user.userId, id);
  }

  @Patch(':id')
  async updateVoice(@Req() req, @Param('id') id: string, @Body() dto: UpdateVoiceDto) {
    return this.voicesService.updateVoice(req.user.userId, id, dto);
  }

  @Delete(':id')
  async deleteVoice(@Req() req, @Param('id') id: string) {
    return this.voicesService.deleteVoice(req.user.userId, id);
  }

  @Post(':id/generate')
  async generateSpeech(@Req() req, @Param('id') id: string, @Body() dto: GenerateSpeechDto) {
    return this.voicesService.generateSpeech(req.user.userId, id, dto);
  }

  // Public demo endpoint (no auth required)
  @Post('demo/clone')
  @UseInterceptors(FileInterceptor('audio'))
  async demoCloneVoice(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No audio file provided' };
    }

    try {
      // Create a temporary voice from the uploaded audio
      const voice = await this.elevenLabsService.createVoice(
        `Demo Voice ${Date.now()}`,
        [file.buffer]
      );

      // Generate a sample response
      const sampleText = "Hey! Thanks for your message. I really appreciate you reaching out!";
      const audioBuffer = await this.elevenLabsService.generateSpeech(
        voice.voice_id,
        sampleText
      );

      return {
        voiceId: voice.voice_id,
        audio: audioBuffer.toString('base64'),
        text: sampleText,
      };
    } catch (error) {
      console.error('Demo clone error:', error);
      return { 
        error: 'Voice cloning failed',
        message: error.message,
        // Return mock data for demo purposes
        mock: true,
        audio: null,
      };
    }
  }

  // Public demo endpoint for generating conversation
  @Post('demo/conversation')
  async demoConversation(@Body() body: { voiceId: string; messages: string[] }) {
    try {
      const responses = [];
      
      for (const msg of body.messages) {
        const audioBuffer = await this.elevenLabsService.generateSpeech(
          body.voiceId,
          msg
        );
        responses.push({
          text: msg,
          audio: audioBuffer.toString('base64'),
        });
      }

      return { responses };
    } catch (error) {
      console.error('Demo conversation error:', error);
      return { 
        error: 'Conversation generation failed',
        mock: true,
      };
    }
  }
}
