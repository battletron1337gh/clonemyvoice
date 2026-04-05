# ElevenLabs API Test Script

This script tests the ElevenLabs voice cloning API.

## Setup

```bash
# Install dependencies
npm install elevenlabs dotenv

# Create .env file
echo "ELEVENLABS_API_KEY=your_api_key_here" > .env

# Run test
npx ts-node test-elevenlabs.ts
```

## Test Script

```typescript
import { ElevenLabsClient } from 'elevenlabs';
import * as fs from 'fs';
import * as path from 'path';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

async function testVoiceCloning() {
  console.log('🎤 Testing ElevenLabs Voice Cloning API\n');

  // 1. List existing voices
  console.log('1. Listing existing voices...');
  const voices = await client.voices.getAll();
  console.log(`   Found ${voices.voices.length} voices`);
  
  // 2. Create a voice clone (if sample files exist)
  const sampleDir = './voice-samples';
  if (fs.existsSync(sampleDir)) {
    const files = fs.readdirSync(sampleDir)
      .filter(f => f.endsWith('.mp3') || f.endsWith('.wav'))
      .map(f => fs.createReadStream(path.join(sampleDir, f)));
    
    if (files.length > 0) {
      console.log(`\n2. Creating voice clone with ${files.length} samples...`);
      const voice = await client.voices.ivc.create({
        name: 'Test Voice Clone',
        files,
      });
      console.log(`   ✓ Created voice: ${voice.voice_id}`);

      // 3. Generate speech
      console.log('\n3. Generating speech...');
      const audio = await client.generate({
        voice: voice.voice_id,
        text: 'Hello! This is a test of my cloned voice. It sounds just like me!',
        model_id: 'eleven_multilingual_v2',
      });

      // Save audio
      const chunks: Buffer[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }
      const audioBuffer = Buffer.concat(chunks);
      fs.writeFileSync('test-output.mp3', audioBuffer);
      console.log('   ✓ Generated test-output.mp3');

      // 4. Clean up
      console.log('\n4. Cleaning up...');
      await client.voices.delete(voice.voice_id);
      console.log('   ✓ Deleted test voice');
    }
  } else {
    console.log('\n   ℹ️  No voice samples found. Create a voice-samples folder with .mp3 files to test cloning.');
  }

  console.log('\n✅ Test complete!');
}

testVoiceCloning().catch(console.error);
```

## Expected Output

```
🎤 Testing ElevenLabs Voice Cloning API

1. Listing existing voices...
   Found 3 voices

2. Creating voice clone with 2 samples...
   ✓ Created voice: abc123xyz

3. Generating speech...
   ✓ Generated test-output.mp3

4. Cleaning up...
   ✓ Deleted test voice

✅ Test complete!
```

## API Costs

- Voice cloning: ~$0 (one-time per voice)
- Speech generation: ~$0.10-0.30 per 1000 characters
- See: https://elevenlabs.io/pricing
