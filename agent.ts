import { model } from './components/ChatOpenAI';
import { State } from './components/State';
import { Start } from './components/Start';
import { Condition } from './components/Condition';
import { Loop } from './components/Loop';
import { End } from './components/End';
import { SoftwareDeveloper } from './agents/SoftwareDeveloper';
import { CodeReviewer } from './agents/CodeReviewer';
import { ProjectManager } from './agents/ProjectManager';
import { SupervisorLLMNode } from './agents/SupervisorLLMNode';
import { FlowManager } from './components/FlowManager'; // Import updated FlowManager

async function runFlow() {
  const state = new State();
  const start = new Start({ model, state });
  const supervisor = new SupervisorLLMNode({ model, state });
  const condition = new Condition();
  const developer = new SoftwareDeveloper({ model, state });
  const reviewer = new CodeReviewer({ model, state });
  const end = new End({ state });

  let iterationCount = 0;
  const maxIterations = 20;

  await start.invoke();

  while (iterationCount < maxIterations) {
    iterationCount++;

    await supervisor.invoke();
    const next = await condition.evaluate({ state });

    if (next === 'Software Developer') {
      await developer.invoke();
    } else if (next === 'Code Reviewer') {
      await reviewer.invoke();
    } else if (next === 'End') {
      await end.invoke();
      console.log('Project completed after', iterationCount, 'iterations.');
      break;
    }

    if (iterationCount >= maxIterations) {
      console.log('Maximum iterations reached, force stopping the flow.');
      await end.invoke();
      break;
    }

    console.log('Iteration:', iterationCount, 'Next step:', next, 'Current phase:', state.get('currentPhase'));
  }

  // After flow completion, export the entire flow (state + history) as JSON
  const flowManager = new FlowManager(state);
  await flowManager.saveFlowAsJson('flowData.json');  // Save flow to a file
}

runFlow().catch(console.error);