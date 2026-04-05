import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IntegrationsService } from './integrations.service';
import { UpdateIntegrationSettingsDto } from './dto';

@Controller('integrations')
@UseGuards(AuthGuard('jwt'))
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {}

  @Get()
  async listIntegrations(@Req() req) {
    return this.integrationsService.listIntegrations(req.user.userId);
  }

  @Post(':platform/connect')
  async connectPlatform(@Req() req, @Param('platform') platform: string) {
    return this.integrationsService.connectPlatform(req.user.userId, platform);
  }

  @Post(':platform/disconnect')
  async disconnectPlatform(@Req() req, @Param('platform') platform: string) {
    return this.integrationsService.disconnectPlatform(req.user.userId, platform);
  }

  @Patch(':platform/settings')
  async updateSettings(
    @Req() req,
    @Param('platform') platform: string,
    @Body() dto: UpdateIntegrationSettingsDto,
  ) {
    return this.integrationsService.updateSettings(req.user.userId, platform, dto);
  }
}
