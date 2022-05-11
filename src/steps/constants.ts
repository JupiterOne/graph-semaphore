import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  BUILD_ACCOUNT_PROJECT: 'build-account-project-relationship',
  PIPELINE: 'fetch-pipelines',
  PROJECT: 'fetch-projects',
  WORKFLOW: 'fetch-workflows',
  JOB: 'fetch-jobs',
};

export const Entities: Record<
  'PROJECT' | 'WORKFLOW' | 'JOB' | 'PIPELINE' | 'ACCOUNT',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'semaphore_account',
    _class: ['Account'],
  },
  PROJECT: {
    resourceName: 'Project',
    _type: 'semaphore_project',
    _class: ['Project'],
  },
  WORKFLOW: {
    resourceName: 'Workflow',
    _type: 'semaphore_workflow',
    _class: ['Task'],
  },
  JOB: {
    resourceName: 'Job',
    _type: 'semaphore_job',
    _class: ['Entity'],
  },
  PIPELINE: {
    resourceName: 'Pipeline',
    _type: 'semaphore_pipeline',
    _class: ['Entity'],
  },
};

export const Relationships: Record<
  | 'PROJECT_HAS_WORKFLOW'
  | 'PIPELINE_HAS_JOB'
  | 'PROJECT_HAS_PIPELINE'
  | 'ACCOUNT_HAS_PROJECT',
  StepRelationshipMetadata
> = {
  PROJECT_HAS_WORKFLOW: {
    _type: 'semaphore_project_has_workflow',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.WORKFLOW._type,
  },
  ACCOUNT_HAS_PROJECT: {
    _type: 'semaphore_account_has_project',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PROJECT._type,
  },
  PROJECT_HAS_PIPELINE: {
    _type: 'semaphore_project_has_pipeline',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PIPELINE._type,
  },
  PIPELINE_HAS_JOB: {
    _type: 'semaphore_pipeline_has_job',
    sourceType: Entities.PIPELINE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.JOB._type,
  },
};
