import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Steps, Entities, Relationships } from '../constants';
import { createJobEntity } from './converter';

export async function fetchJobs({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PIPELINE._type },
    async (pipelineEntity) => {
      const pipelineDetails = await apiClient.getPipeline(
        pipelineEntity.id as string,
      );

      for (const block of pipelineDetails.blocks)
        for (const job of block.jobs) {
          const jobDetails = await apiClient.getJob(job.job_id);

          const jobEntity = await jobState.addEntity(
            createJobEntity(jobDetails),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: pipelineEntity,
              to: jobEntity,
            }),
          );
        }
    },
  );
}

export const jobSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.JOB,
    name: 'Fetch Jobs',
    entities: [Entities.JOB],
    relationships: [Relationships.PIPELINE_HAS_JOB],
    dependsOn: [Steps.PIPELINE],
    executionHandler: fetchJobs,
  },
];
