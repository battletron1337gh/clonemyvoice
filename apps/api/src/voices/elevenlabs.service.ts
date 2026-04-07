import { Injectable } from '@nestjs/common';
import { ElevenLabsClient } from 'elevenlabs';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

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

  async createVoice(name: string, sampleFiles: Buffer[] | string[]): Promise<{ voice_id: string; name: string }> {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
      console.warn('⚠️ Using mock voice - set ELEVENLABS_API_KEY for real voice cloning');
      return {
        voice_id: `mock-voice-${Date.now()}`,
        name,
      };
    }

    try {
      // Convert buffers to readable streams
      const files = sampleFiles.map((file, index) => {
        if (Buffer.isBuffer(file)) {
          return {
            buffer: file,
            name: `sample_${index}.mp3`,
          };
        }
        // If it's a URL or path, we'd need to download it first
        return {
          buffer: Buffer.from(file),
          name: `sample_${index}.mp3`,
        };
      });

      // Create voice using ElevenLabs API
      const voice = await this.client.voices.add({
        name,
        files: files.map(f => new Blob([f.buffer]) as any),
      });

      return {
        voice_id: voice.voice_id,
        name: voice.name,
      };
    } catch (error) {
      console.error('Error creating voice with ElevenLabs:', error);
      throw new Error('Failed to create voice clone');
    }
  }

  async deleteVoice(voiceId: string): Promise<void> {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
      return;
    }

    try {
      await this.client.voices.delete(voiceId);
    } catch (error) {
      console.error('Error deleting voice:', error);
    }
  }

  async generateSpeech(voiceId: string, text: string, settings?: any): Promise<Buffer> {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
      // Return a small mock audio buffer (silence)
      return Buffer.from('mock-audio-data');
    }

    try {
      const audioStream = await this.client.generate({
        voice: voiceId,
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: settings?.stability ?? 0.5,
          similarity_boost: settings?.similarity_boost ?? 0.75,
          style: settings?.style ?? 0.3,
          use_speaker_boost: true,
        },
      });

      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('Failed to generate speech');
    }
  }

  async listVoices() {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
      return [];
    }

    try {
      const voices = await this.client.voices.getAll();
      return voices.voices;
    } catch (error) {
      console.error('Error listing voices:', error);
      return [];
    }
  }

  // For demo: generate speech with a default voice (no cloning needed)
  async generateSpeechWithDefaultVoice(text: string, voiceId: string = '21m00Tcm4TlvDq8ikWAM'): Promise<Buffer> {
    // '21m00Tcm4TlvDq8ikWAM' is ElevenLabs' default "Rachel" voice
    return this.generateSpeech(voiceId, text, {
      stability: 0.5,
      similarity_boost: 0.75,
    });
  }
}
