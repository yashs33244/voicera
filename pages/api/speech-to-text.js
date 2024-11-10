// pages/api/speech-to-text.js
import { SpeechClient } from '@google-cloud/speech';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new SpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// Helper function to determine audio encoding from file type
const getAudioEncoding = (mimeType) => {
  switch (mimeType) {
    case 'audio/wav':
    case 'audio/wave':
    case 'audio/x-wav':
      return 'LINEAR16';
    case 'audio/mp3':
    case 'audio/mpeg':
      return 'MP3';
    case 'audio/ogg':
      return 'OGG_OPUS';
    case 'audio/flac':
      return 'FLAC';
    default:
      throw new Error('Unsupported audio format. Please use WAV, MP3, OGG, or FLAC.');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const form = formidable();
    const [fields, files] = await form.parse(req);

    const file = files.audio?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Read file content
    const content = fs.readFileSync(file.filepath);
    const audioBytes = content.toString('base64');

    // Get audio encoding based on file type
    const encoding = getAudioEncoding(file.mimetype);

    // Configure request
    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: encoding,
        languageCode: fields.languageCode?.[0] || 'en-US',
        enableAutomaticPunctuation: fields.punctuation?.[0] === 'true',
        profanityFilter: fields.profanityFilter?.[0] === 'true',
        model: 'default', // You can change this to 'phone_call' for phone audio or 'video' for video audio
        audioChannelCount: 1, // Adjust based on your audio input (1 for mono, 2 for stereo)
        enableWordTimeOffsets: false,
      },
    };

    // Perform the transcription
    const [response] = await client.recognize(request);

    // Get transcription results
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    res.status(200).json({ transcription });
  } catch (error) {
    console.error('Speech-to-text error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('bad encoding')) {
      return res.status(400).json({ 
        error: 'Unsupported audio format. Please use WAV, MP3, OGG, or FLAC files.' 
      });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File size too large. Please upload a smaller file.' 
      });
    }

    res.status(500).json({ 
      error: error.message || 'Failed to convert speech to text' 
    });
  }
}