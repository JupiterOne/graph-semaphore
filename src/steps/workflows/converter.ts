import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { SemaphoreWorkflow } from '../../types';
import { Entities } from '../constants';

export function createWorkflowEntity(workflow: SemaphoreWorkflow): Entity {
  return createIntegrationEntity({
    entityData: {
      source: workflow,
      assign: {
        _key: `semaphore_workflow:${workflow.wf_id}`,
        _type: Entities.WORKFLOW._type,
        _class: Entities.WORKFLOW._class,
        id: workflow.wf_id,
        name: workflow.wf_id,
        triggeredBy: workflow.triggered_by,
        rerunOf: workflow.rerun_of,
        requesterId: workflow.requester_id,
        projectId: workflow.project_id,
        initialPplId: workflow.initial_ppl_id,
        hookId: workflow.hook_id,
        createdAtSeconds: workflow.created_at?.seconds,
        createdAtNanos: workflow.created_at?.nanos,
        commitSha: workflow.commit_sha,
        branchName: workflow.branch_name,
        branchId: workflow.branch_id,
      },
    },
  });
}
