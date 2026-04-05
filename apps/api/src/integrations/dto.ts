import { IsObject } from 'class-validator';

export class UpdateIntegrationSettingsDto {
  @IsObject()
  settings: {
    autoReply?: boolean;
    replyDelay?: number;
    voiceId?: string;
    greetingMessage?: string;
  };
}
