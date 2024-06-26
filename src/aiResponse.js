import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true 
});

export default async function getAiResponse(input, characterPrompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `${characterPrompt}${input}` }],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion.choices[0].message.content;
}