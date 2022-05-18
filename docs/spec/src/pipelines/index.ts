import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const pipelineSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /pipelines
     * PATTERN: Iterate entities
     */
    id: 'fetch-pipelines',
    name: 'Fetch Pipeline',
    entities: [
      {
        resourceName: 'Pipeline',
        _type: 'semaphore_pipeline',
        _class: ['Entity'],
      },
    ],
    relationships: [
      {
        _type: 'semaphore_project_has_pipeline',
        sourceType: 'semaphore_project',
        _class: RelationshipClass.HAS,
        targetType: 'semaphore_pipeline',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
];
