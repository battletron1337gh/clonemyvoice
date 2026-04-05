import { Controller, Get, Delete, Param, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GenerationsService } from './generations.service';

@Controller('generations')
@UseGuards(AuthGuard('jwt'))
export class GenerationsController {
  constructor(private generationsService: GenerationsService) {}

  @Get()
  async listGenerations(@Req() req, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.generationsService.listGenerations(
      req.user.userId,
      parseInt(page || '1'),
      parseInt(limit || '20'),
    );
  }

  @Get(':id')
  async getGeneration(@Req() req, @Param('id') id: string) {
    return this.generationsService.getGeneration(req.user.userId, id);
  }

  @Delete(':id')
  async deleteGeneration(@Req() req, @Param('id') id: string) {
    return this.generationsService.deleteGeneration(req.user.userId, id);
  }
}
