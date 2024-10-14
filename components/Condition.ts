import { State } from './State';

export class Condition {
  async evaluate({ state }: { state: State }) {
      const next = state.get('next');
      const currentPhase = state.get('currentPhase');
      console.log(`Evaluating Condition: next -> ${next}, currentPhase -> ${currentPhase}`);

      if (next === 'SoftwareDeveloper' && currentPhase === 'InDevelopment') {
          return 'Software Developer';
      } else if (next === 'CodeReviewer' && currentPhase === 'InReview') {
          return 'Code Reviewer';
      } else if (next === 'End' && currentPhase === 'Completed') {
          return 'End';
      }

      return 'Supervisor'; // Always return to Supervisor after each phase
  }
}