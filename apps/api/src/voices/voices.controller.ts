import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VoicesService } from './voices.service';
import { CreateVoiceDto, UpdateVoiceDto, GenerateSpeechDto } from './dto';

@Controller('voices')
@UseGuards(AuthGuard('jwt'))
export class VoicesController {
  constructor(private voicesService: VoicesService) {}

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
}
