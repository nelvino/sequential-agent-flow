import { State } from '../components/State';
import { ChatOpenAI } from '@langchain/openai';

export class ProjectManager {

    model: ChatOpenAI;
    state: State;

    constructor({ model, state }: { model: ChatOpenAI; state: State }) {
        this.model = model;
        this.state = state;
    }
    async invoke() {
        const currentPhase = this.state.get('currentPhase');
        
        if (currentPhase === 'Completed') {
            console.log('Project has been successfully completed!');
            this.state.set('next', 'End');
        } else {
            console.log('Project is not yet completed.');
            this.state.set('next', 'SoftwareDeveloper');  // Go back for further work
        }
        
        return { state: this.state };
    }
}