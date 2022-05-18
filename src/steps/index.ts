import { accountSteps } from './account';
import { jobSteps } from './jobs';
import { pipelineSteps } from './pipelines';
import { projectSteps } from './projects';
import { workflowSteps } from './workflows';

const integrationSteps = [
  ...accountSteps,
  ...projectSteps,
  ...workflowSteps,
  ...pipelineSteps,
  ...jobSteps,
];

export { integrationSteps };
