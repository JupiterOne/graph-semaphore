import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const workflowSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /plumber-workflows?project_id={projectId}
     * PATTERN: Iterate entities
     */
    id: 'fetch-workflows',
    name: 'Fetch Workflows',
    entities: [
      {
        resourceName: 'Workflow',
        _type: 'semaphore_workflow',
        _class: ['Task'],
      },
    ],
    relationships: [
      {
        _type: 'semaphore_project_has_workflow',
        sourceType: 'semaphore_project',
        _class: RelationshipClass.HAS,
        targetType: 'semaphore_workflow',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
];
