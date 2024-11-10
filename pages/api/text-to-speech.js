// pages/api/text-to-speech.js
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize the client with credentials
const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voice = 'en-US-Standard-A' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Construct the request
    const request = {
      input: { text },
      voice: {
        languageCode: voice.split('-').slice(0, 2).join('-'), // Extract language code from voice name
        name: voice,
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // The response's audioContent is a Buffer
    const audioContent = response.audioContent;

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioContent.length);
    res.send(audioContent);
  } catch (error) {
    console.error('Text-to-speech error:', error);
    res.status(500).json({ 
      error: 'Failed to convert text to speech',
      details: error.message 
    });
  }
}