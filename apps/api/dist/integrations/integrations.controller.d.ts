import { IntegrationsService } from './integrations.service';
import { UpdateIntegrationSettingsDto } from './dto';
export declare class IntegrationsController {
    private integrationsService;
    constructor(integrationsService: IntegrationsService);
    listIntegrations(req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        platform: import(".prisma/client").$Enums.Platform;
        accessToken: string;
        refreshToken: string | null;
        tokenExpiresAt: Date | null;
        lastSyncAt: Date | null;
    }[]>;
    connectPlatform(req: any, platform: string): Promise<{
        platform: string;
        authUrl: string;
    }>;
    disconnectPlatform(req: any, platform: string): Promise<{
        success: boolean;
    }>;
    updateSettings(req: any, platform: string, dto: UpdateIntegrationSettingsDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.IntegrationStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        platform: import(".prisma/client").$Enums.Platform;
        accessToken: string;
        refreshToken: string | null;
        tokenExpiresAt: Date | null;
        lastSyncAt: Date | null;
    }>;
}
