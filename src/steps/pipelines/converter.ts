import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { SemaphorePipeline } from '../../types';
import { Entities } from '../constants';

export function createPipelineEntity(pipeline: SemaphorePipeline): Entity {
  return createIntegrationEntity({
    entityData: {
      source: pipeline,
      assign: {
        _key: `semaphore_pipeline:${pipeline.ppl_id}`,
        _type: Entities.PIPELINE._type,
        _class: Entities.PIPELINE._class,
        id: pipeline.ppl_id,
        yamlFileName: pipeline.yaml_file_name,
        workingDirectory: pipeline.working_directory,
        wfId: pipeline.wf_id,
        terminatedBy: pipeline.terminated_by,
        terminateRequest: pipeline.terminate_request,
        switchId: pipeline.switch_id,
        // TODO: at later stage, convert seconds/nanos to regular time format
        stoppingAtSeconds: pipeline.stopping_at.seconds,
        stoppingAtNanos: pipeline.stopping_at.nanos,
        state: pipeline.state,
        snapshotId: pipeline.snapshot_id,
        runningAtSeconds: pipeline.running_at.seconds,
        runningAtNanos: pipeline.running_at.nanos,
        result: pipeline.result,
        resultReason: pipeline.result_reason,
        queuingAtSeconds: pipeline.queuing_at.seconds,
        queuingAtNanos: pipeline.queuing_at.nanos,
        projectId: pipeline.project_id,
        pendingAtSeconds: pipeline.pending_at.seconds,
        pendingAtNanos: pipeline.pending_at.nanos,
        name: pipeline.name,
        hookId: pipeline.hook_id,
        errorDescription: pipeline.error_description,
        doneAtSeconds: pipeline.done_at.seconds,
        doneAtNanos: pipeline.done_at.nanos,
        createdAtSeconds: pipeline.created_at.seconds,
        createdAtNanos: pipeline.created_at.nanos,
        commitSha: pipeline.commit_sha,
        branchName: pipeline.branch_name,
        branchId: pipeline.branch_id,
      },
    },
  });
}
