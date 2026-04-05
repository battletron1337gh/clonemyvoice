import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateIntegrationSettingsDto } from './dto';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async listIntegrations(userId: string) {
    return this.prisma.platformIntegration.findMany({
      where: { userId },
    });
  }

  async connectPlatform(userId: string, platform: string) {
    // TODO: Implement OAuth flow for each platform
    return {
      platform,
      authUrl: `https://api.${platform.toLowerCase()}.com/oauth/authorize?client_id=xxx`,
    };
  }

  async disconnectPlatform(userId: string, platform: string) {
    await this.prisma.platformIntegration.deleteMany({
      where: { userId, platform: platform.toUpperCase() as any },
    });

    return { success: true };
  }

  async updateSettings(userId: string, platform: string, dto: UpdateIntegrationSettingsDto) {
    const integration = await this.prisma.platformIntegration.findFirst({
      where: { userId, platform: platform.toUpperCase() as any },
    });

    if (!integration) {
      throw new Error('Integration not found');
    }

    return this.prisma.platformIntegration.update({
      where: { id: integration.id },
      data: {
        settings: { ...(integration.settings as object), ...dto.settings },
      },
    });
  }
}
