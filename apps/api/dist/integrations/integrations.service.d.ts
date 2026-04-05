import { PrismaService } from '../prisma/prisma.service';
import { UpdateIntegrationSettingsDto } from './dto';
export declare class IntegrationsService {
    private prisma;
    constructor(prisma: PrismaService);
    listIntegrations(userId: string): Promise<{
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
    connectPlatform(userId: string, platform: string): Promise<{
        platform: string;
        authUrl: string;
    }>;
    disconnectPlatform(userId: string, platform: string): Promise<{
        success: boolean;
    }>;
    updateSettings(userId: string, platform: string, dto: UpdateIntegrationSettingsDto): Promise<{
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
