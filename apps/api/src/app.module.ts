import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VoicesModule } from './voices/voices.module';
import { GenerationsModule } from './generations/generations.module';
import { BillingModule } from './billing/billing.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { QueueModule } from './queue/queue.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    VoicesModule,
    GenerationsModule,
    BillingModule,
    IntegrationsModule,
    QueueModule,
  ],
})
export class AppModule {}
