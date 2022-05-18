import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { createPipelineEntity } from './converter';

export async function fetchPipelines({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      await apiClient.iteratePipelines(
        projectEntity.id as string,
        async (pipeline) => {
          const pipelineEntity = await jobState.addEntity(
            createPipelineEntity(pipeline),
          );
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: projectEntity,
              to: pipelineEntity,
            }),
          );
        },
      );
    },
  );
}

export const pipelineSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PIPELINE,
    name: 'Fetch Pipelines',
    entities: [Entities.PIPELINE],
    relationships: [Relationships.PROJECT_HAS_PIPELINE],
    dependsOn: [Steps.PROJECT],
    executionHandler: fetchPipelines,
  },
];
