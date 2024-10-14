import { State } from './State';

export class Loop {
  async invoke({ state }: { state: State }) {
    console.log('Looping back to Supervisor.');
    return { state };
  }
}