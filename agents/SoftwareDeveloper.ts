import { ChatOpenAI } from '@langchain/openai';
import { State } from '../components/State';

export class SoftwareDeveloper {
  model: ChatOpenAI;
  state: State;

  constructor({ model, state }: { model: ChatOpenAI; state: State }) {
    this.model = model;
    this.state = state;
  }

  async invoke() {
    const projectDescription = this.state.get('projectDescription') || 'Create a React component';
    const reviewFeedback = this.state.get('reviewFeedback');

    let producedCode;

    if (reviewFeedback) {
      console.log("Applying feedback from Code Reviewer:", reviewFeedback);
      producedCode = this.state.get('producedCode') || await this.generateCode(projectDescription);
      producedCode = await this.applyFeedback(producedCode, reviewFeedback);
    } else {
      producedCode = await this.generateCode(projectDescription);
    }

    this.state.set('producedCode', producedCode);
    console.log(`Generated Code (in SoftwareDeveloper): \n${producedCode}`);
  }

  async generateCode(projectDescription: string): Promise<string> {
    const systemPrompt = 'You are a skilled software developer who writes clean and efficient React code.';
    const userPrompt = `Please write a React component based on the following project description: ${projectDescription}`;

    const codeResponse = await this.model.call([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    console.log('Raw code generation response:', codeResponse?.content);

    const responseContent = codeResponse?.content?.toString() || '';

    return responseContent.trim();
  }

  async applyFeedback(producedCode: string, feedback: string): Promise<string> {
    const systemPrompt = `You are a skilled software developer improving a React component based on feedback.`;
    const userPrompt = `Here is the current code:\n\n${producedCode}\n\nAnd here is the feedback from the code review:\n\n${feedback}\n\nPlease apply the feedback and improve the code accordingly.`;

    const feedbackResponse = await this.model.call([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    console.log('Raw feedback application response:', feedbackResponse?.content);

    const responseContent = feedbackResponse?.content?.toString() || '';

    return responseContent.trim();
  }

  exportToJson() {
    const fullState = this.state.getAll(); // Retrieve all state data
    return JSON.stringify(fullState, null, 2); // Pretty-print JSON
  }
}