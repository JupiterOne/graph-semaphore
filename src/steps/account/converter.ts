import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createAccountEntity(orgName: string): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { orgName },
      assign: {
        _key: `semaphore_account:${orgName}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: orgName,
      },
    },
  });
}
