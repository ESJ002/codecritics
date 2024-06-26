import { ElevenLabsClient, play , stream } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY// Defaults to process.env.ELEVENLABS_API_KEY
})


export default async function generateTTS(response) {
const audioStream = await elevenlabs.generate({
    stream: true,
    voice: "Daniel",
    text: `hello there`,
    model_id: "eleven_multilingual_v2"
  });
  
  return audioStream
}