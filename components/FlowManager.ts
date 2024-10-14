import { promises as fs } from 'fs';
import { State } from './State'; // Explicitly importing the State class

export class FlowManager {
  state: State;  // Now explicitly using the State type

  constructor(state: State) {  // Ensure that only a State instance can be passed in
    this.state = state;
  }

  async saveFlowAsJson(filePath: string): Promise<void> {
    try {
      const stateData = this.state.getAll(); // Get current state
      const historyData = this.state.getHistory(); // Get entire history
      const jsonData = JSON.stringify({ state: stateData, history: historyData }, null, 2); // Combine both

      await fs.writeFile(filePath, jsonData); // Save to file
      console.log(`Flow data and history saved to ${filePath}`);
    } catch (error) {
      console.error(`Failed to save flow data: ${error}`);
    }
  }
}