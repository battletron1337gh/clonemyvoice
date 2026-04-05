export declare class CreateVoiceDto {
    name: string;
    sampleUrls: string[];
    settings?: {
        stability?: number;
        similarity_boost?: number;
        style?: number;
    };
}
export declare class UpdateVoiceDto {
    name?: string;
    settings?: {
        stability?: number;
        similarity_boost?: number;
        style?: number;
    };
}
export declare class GenerateSpeechDto {
    text: string;
    settings?: {
        stability?: number;
        similarity_boost?: number;
        style?: number;
    };
}
