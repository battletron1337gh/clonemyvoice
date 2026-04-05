import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateVoiceDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  sampleUrls: string[];

  @IsObject()
  @IsOptional()
  settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
  };
}

export class UpdateVoiceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
  };
}

export class GenerateSpeechDto {
  @IsString()
  text: string;

  @IsObject()
  @IsOptional()
  settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
  };
}
