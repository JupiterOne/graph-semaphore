import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Steps, Entities, Relationships } from '../constants';
import { createProjectEntity } from './converter';

export async function fetchProjects({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateProjects(async (project) => {
    await jobState.addEntity(createProjectEntity(project));
  });
}

export async function buildAccountProjectRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: projectEntity,
        }),
      );
    },
  );
}

export const projectSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PROJECT,
    name: 'Fetch Projects',
    entities: [Entities.PROJECT],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchProjects,
  },
  {
    id: Steps.BUILD_ACCOUNT_PROJECT,
    name: 'Build Account Project Relationship',
    entities: [],
    relationships: [Relationships.ACCOUNT_HAS_PROJECT],
    dependsOn: [Steps.ACCOUNT, Steps.PROJECT],
    executionHandler: buildAccountProjectRelationship,
  },
];
