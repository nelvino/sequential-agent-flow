import { ChatOpenAI } from '@langchain/openai';
import { State } from '../components/State';

export class SupervisorLLMNode {
    model: ChatOpenAI;
    state: State;
  
    constructor({ model, state }: { model: ChatOpenAI; state: State }) {
      this.model = model;
      this.state = state;
    }
  
    async invoke() {
      const currentPhase = this.state.get('currentPhase');
      const nextStep = this.state.get('next');
      const reviewFeedback = this.state.get('reviewFeedback') || '';
      
      console.log(`Current phase in Supervisor: ${currentPhase}, Next step: ${nextStep}`);
  
      // Transition based on the current phase and feedback received
      if (!currentPhase || currentPhase === 'InDevelopment') {
        console.log('Development phase complete, moving to Code Reviewer.');
        this.state.set('next', 'CodeReviewer');
        this.state.set('currentPhase', 'InReview');
      } else if (currentPhase === 'InReview') {
        console.log(`Code review feedback: ${reviewFeedback}`);
  
        // Supervisor checks if feedback says 'no issues' to end the loop, otherwise return to developer
        if (reviewFeedback.toLowerCase().includes('no issues found')) {
          console.log('No issues found, moving to End.');
          this.state.set('next', 'End');
          this.state.set('currentPhase', 'Completed');
        } else {
          console.log('Issues found or changes needed, returning to Software Developer.');
          this.state.set('next', 'SoftwareDeveloper');
          this.state.set('currentPhase', 'InDevelopment');
        }
      } else if (currentPhase === 'FeedbackImplementation') {
        console.log('Feedback has been provided. Returning to development to work on feedback.');
        this.state.set('next', 'SoftwareDeveloper');
        this.state.set('currentPhase', 'InDevelopment');
      } else {
        console.log('Unknown phase, resetting to Software Developer.');
        this.state.set('next', 'SoftwareDeveloper');
        this.state.set('currentPhase', 'InDevelopment');
      }
    }
  }