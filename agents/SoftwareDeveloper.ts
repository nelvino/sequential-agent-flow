import { ChatOpenAI } from '@langchain/openai';
import { State } from '../components/State';
import { JsonOutputParser } from '@langchain/core/output_parsers';

export class SoftwareDeveloper {
  model: ChatOpenAI;
  state: State;

  constructor({ model, state }: { model: ChatOpenAI; state: State }) {
    this.model = model;
    this.state = state;
  }

  async invoke() {
    const projectDescription = this.state.get('projectDescription') || 'Create a React component';
    const producedCode = await this.generateCode(projectDescription);
    this.state.set('producedCode', producedCode);
    console.log(`Generated Code (in SoftwareDeveloper): \n${producedCode}`);
  }

  async generateCode(projectDescription: string): Promise<string> {
    // Use OpenAI model to dynamically generate the code based on project description
    const systemPrompt = 'You are a skilled software developer who writes clean and efficient React code.';
    const userPrompt = `Please write a React component based on the following project description: ${projectDescription}`;

    const codeResponse = await this.model.call([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    console.log('Raw code generation response:', codeResponse?.content);

    // Use a parser to enforce structured output (if required)
    const responseContent = codeResponse?.content?.toString() || '';

    return responseContent.trim();
  }
}