import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const jobSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /jobs/{jobId}
     * PATTERN: Iterate entities
     */
    id: 'fetch-jobs',
    name: 'Fetch Jobs',
    entities: [
      {
        resourceName: 'Job',
        _type: 'semaphore_job',
        _class: ['Job'],
      },
    ],
    relationships: [
      {
        _type: 'semaphore_pipeline_has_job',
        sourceType: 'pingone_pipeline',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_job',
      },
    ],
    dependsOn: ['fetch-pipelines'],
    implemented: true,
  },
];
