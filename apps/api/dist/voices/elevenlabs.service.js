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
    async createVoice(name, sampleUrls) {
        if (!process.env.ELEVENLABS_API_KEY) {
            return {
                voice_id: `mock-voice-${Date.now()}`,
                name,
            };
        }
        return {
            voice_id: `voice-${Date.now()}`,
            name,
        };
    }
    async deleteVoice(voiceId) {
        if (!process.env.ELEVENLABS_API_KEY) {
            return;
        }
    }
    async generateSpeech(voiceId, text, settings) {
        if (!process.env.ELEVENLABS_API_KEY) {
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
        const chunks = [];
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
};
exports.ElevenLabsService = ElevenLabsService;
exports.ElevenLabsService = ElevenLabsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ElevenLabsService);
//# sourceMappingURL=elevenlabs.service.js.map