import { ChatOpenAI } from '@langchain/openai';
import { State } from './State';

export class Start {
  model: ChatOpenAI;
  state: State;

  constructor({ model, state }: { model: ChatOpenAI; state: State }) {
    this.model = model;
    this.state = state;
  }

  async invoke() {
    const description = 'The goal is to develop a login page using React and Tailwind.';
    this.state.set('projectDescription', description);
    console.log('First Call in Start.ts:',description);
    return { state: this.state };
  }
}