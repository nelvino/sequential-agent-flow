import { State } from '../components/State';

export class End {
  state: State;

  constructor({ state }: { state: State }) {
    if (!state) {
      throw new Error("State is undefined, cannot proceed.");
    }
    this.state = state;
  }

  async invoke() {
    console.log('Project completed. All tasks are finished.');
    const finalState = this.state.getAll();
    console.log('Final Project State:', JSON.stringify(finalState, null, 2));
    return { state: this.state, message: 'Project has reached completion.' };
  }
}