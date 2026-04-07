"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevenLabsService = void 0;
const common_1 = require("@nestjs/common");
const elevenlabs_1 = require("elevenlabs");
let ElevenLabsService = class ElevenLabsService {
    constructor() {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            console.warn('⚠️ ELEVENLABS_API_KEY not set - voice features will be disabled');
        }
        this.client = new elevenlabs_1.ElevenLabsClient({
            apiKey: apiKey || 'dummy-key',
        });
    }
    async createVoice(name, sampleFiles) {
        if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
            console.warn('⚠️ Using mock voice - set ELEVENLABS_API_KEY for real voice cloning');
            return {
                voice_id: `mock-voice-${Date.now()}`,
                name,
            };
        }
        try {
            const files = sampleFiles.map((file, index) => {
                if (Buffer.isBuffer(file)) {
                    return {
                        buffer: file,
                        name: `sample_${index}.mp3`,
                    };
                }
                return {
                    buffer: Buffer.from(file),
                    name: `sample_${index}.mp3`,
                };
            });
            const voice = await this.client.voices.add({
                name,
                files: files.map(f => new Blob([f.buffer])),
            });
            return {
                voice_id: voice.voice_id,
                name: voice.name,
            };
        }
        catch (error) {
            console.error('Error creating voice with ElevenLabs:', error);
            throw new Error('Failed to create voice clone');
        }
    }
    async deleteVoice(voiceId) {
        if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
            return;
        }
        try {
            await this.client.voices.delete(voiceId);
        }
        catch (error) {
            console.error('Error deleting voice:', error);
        }
    }
    async generateSpeech(voiceId, text, settings) {
        if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'sk_...') {
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
            const chunks = [];
            for await (const chunk of audioStream) {
                chunks.push(Buffer.from(chunk));
            }
            return Buffer.concat(chunks);
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Error listing voices:', error);
            return [];
        }
    }
    async generateSpeechWithDefaultVoice(text, voiceId = '21m00Tcm4TlvDq8ikWAM') {
        return this.generateSpeech(voiceId, text, {
            stability: 0.5,
            similarity_boost: 0.75,
        });
    }
};
exports.ElevenLabsService = ElevenLabsService;
exports.ElevenLabsService = ElevenLabsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ElevenLabsService);
//# sourceMappingURL=elevenlabs.service.js.map