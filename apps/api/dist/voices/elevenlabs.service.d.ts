export declare class ElevenLabsService {
    private client;
    constructor();
    createVoice(name: string, sampleFiles: Buffer[] | string[]): Promise<{
        voice_id: string;
        name: string;
    }>;
    deleteVoice(voiceId: string): Promise<void>;
    generateSpeech(voiceId: string, text: string, settings?: any): Promise<Buffer>;
    listVoices(): Promise<import("elevenlabs/api").Voice[]>;
    generateSpeechWithDefaultVoice(text: string, voiceId?: string): Promise<Buffer>;
}
