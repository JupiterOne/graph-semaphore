import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { createWorkflowEntity } from './converter';

export async function fetchWorkflows({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      await apiClient.iterateWorkflows(
        projectEntity.id as string,
        async (workflow) => {
          const workflowEntity = await jobState.addEntity(
            createWorkflowEntity(workflow),
          );
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: projectEntity,
              to: workflowEntity,
            }),
          );
        },
      );
    },
  );
}

export const workflowSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.WORKFLOW,
    name: 'Fetch Workflows',
    entities: [Entities.WORKFLOW],
    relationships: [Relationships.PROJECT_HAS_WORKFLOW],
    dependsOn: [Steps.PROJECT],
    executionHandler: fetchWorkflows,
  },
];
