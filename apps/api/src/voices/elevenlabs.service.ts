import { Injectable } from '@nestjs/common';
import { ElevenLabsClient } from 'elevenlabs';

@Injectable()
export class ElevenLabsService {
  private client: ElevenLabsClient;

  constructor() {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ ELEVENLABS_API_KEY not set - voice features will be disabled');
    }
    this.client = new ElevenLabsClient({
      apiKey: apiKey || 'dummy-key',
    });
  }

  async createVoice(name: string, sampleUrls: string[]) {
    // In production: download files from URLs and pass to API
    // For now, return mock response
    if (!process.env.ELEVENLABS_API_KEY) {
      return {
        voice_id: `mock-voice-${Date.now()}`,
        name,
      };
    }

    // TODO: Implement actual voice cloning
    // const voice = await this.client.voices.ivc.create({
    //   name,
    //   files: sampleUrls.map(url => fs.createReadStream(url)),
    // });
    
    return {
      voice_id: `voice-${Date.now()}`,
      name,
    };
  }

  async deleteVoice(voiceId: string) {
    if (!process.env.ELEVENLABS_API_KEY) {
      return;
    }
    // await this.client.voices.delete(voiceId);
  }

  async generateSpeech(voiceId: string, text: string, settings?: any): Promise<Buffer> {
    if (!process.env.ELEVENLABS_API_KEY) {
      // Return mock audio (empty buffer for now)
      return Buffer.from([]);
    }

    const audio = await this.client.generate({
      voice: voiceId,
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: settings?.stability ?? 0.5,
        similarity_boost: settings?.similarity_boost ?? 0.75,
        style: settings?.style ?? 0.3,
      },
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  async listVoices() {
    if (!process.env.ELEVENLABS_API_KEY) {
      return [];
    }
    return this.client.voices.getAll();
  }
}
