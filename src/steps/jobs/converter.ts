import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { SemaphoreJob } from '../../types';
import { Entities } from '../constants';

export function createJobEntity(job: SemaphoreJob): Entity {
  return createIntegrationEntity({
    entityData: {
      source: job,
      assign: {
        _key: `semaphore_job:${job.metadata.id}`,
        _type: Entities.JOB._type,
        _class: Entities.JOB._class,
        name: job.metadata.name,
        id: job.metadata.id,
        projectId: job.spec.project_id,
        createdOn: parseInt(job.metadata.create_time, 10),
        updatedOn: parseInt(job.metadata.update_time, 10),
        startedOn: parseInt(job.metadata.start_time, 10),
        finishedOn: parseInt(job.metadata.finish_time, 10),
        agentMachineType: job.spec.agent.machine.type,
        agentMachineOsImage: job.spec.agent.machine.os_image,
        commands: job.spec.commands,
        result: job.status.result,
        state: job.status.state,
        agentIp: job.status.agent.ip,
      },
    },
  });
}
