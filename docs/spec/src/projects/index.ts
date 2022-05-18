import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const projectSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /projects/{jobId}
     * PATTERN: Iterate entities
     */
    id: 'fetch-projects',
    name: 'Fetch Projects',
    entities: [
      {
        resourceName: 'Project',
        _type: 'semaphore_project',
        _class: ['Project'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build child relationship
     */
    id: 'build-account-project-relationship',
    name: 'Build Account Project Relationship',
    entities: [],
    relationships: [
      {
        _type: 'semaphore_account_has_project',
        sourceType: 'semaphore_account',
        _class: RelationshipClass.HAS,
        targetType: 'semaphore_project',
      },
    ],
    dependsOn: ['fetch-account', 'fetch-projects'],
    implemented: true,
  },
];
