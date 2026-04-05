export declare class ElevenLabsService {
    private client;
    constructor();
    createVoice(name: string, sampleUrls: string[]): Promise<{
        voice_id: string;
        name: string;
    }>;
    deleteVoice(voiceId: string): Promise<void>;
    generateSpeech(voiceId: string, text: string, settings?: any): Promise<Buffer>;
    listVoices(): Promise<any[] | import("elevenlabs/api").GetVoicesResponse>;
}
