import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

export const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY // Use the API key from environment variable
});