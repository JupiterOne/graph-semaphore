import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { SemaphoreProject } from '../../types';

import { Entities } from '../constants';

export function createProjectEntity(project: SemaphoreProject): Entity {
  return createIntegrationEntity({
    entityData: {
      source: project,
      assign: {
        _key: `semaphore_project:${project.metadata.id}`,
        _type: Entities.PROJECT._type,
        _class: Entities.PROJECT._class,
        ownerId: project.metadata.owner_id,
        orgId: project.metadata.org_id,
        name: project.metadata.name,
        id: project.metadata.id,
        description: project.metadata.description,
        kind: project.kind,
        apiVersion: project.apiVersion,
        visibility: project.spec.visibility,
        isPublic: project.spec.visibility !== 'private',
      },
    },
  });
}
