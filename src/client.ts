import fetch, { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { retry } from '@lifeomic/attempt';
import * as parseLink from 'parse-link-header';

import { IntegrationConfig } from './config';
import {
  SemaphoreJob,
  SemaphorePipeline,
  SemaphorePipelineDetails,
  SemaphoreProject,
  SemaphoreWorkflow,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private baseUri = `https://${this.config.orgName}.semaphoreci.com/api/v1alpha/`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<{ next: string; res: any }> {
    try {
      const options = {
        method,
        headers: {
          Authorization: `Token ${this.config.apiToken}`,
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );

      const parsed = parseLink.default(response.headers.get('link'));
      let nextLink;
      if (parsed && parsed.next) {
        nextLink = parsed.next.url;
      }

      return { res: await response.json(), next: nextLink };
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    try {
      let next: string | null = null;
      do {
        const { res, next: nextLink } = await this.request(next || uri, 'GET');

        for (const resource of res) {
          await iteratee(resource);
        }
        next = nextLink;
      } while (next);
    } catch (err) {
      throw new IntegrationProviderAPIError({
        cause: new Error(err.message),
        endpoint: uri,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('projects');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  /**
   * Iterates each project resource in the provider.
   *
   * @param iteratee receives each project to produce entities/relationships
   */
  public async iterateProjects(
    iteratee: ResourceIteratee<SemaphoreProject>,
  ): Promise<void> {
    await this.paginatedRequest<SemaphoreProject>(
      this.withBaseUri('projects'),
      async (project) => {
        await iteratee(project);
      },
    );
  }

  /**
   * Iterates each workflow resource in the provider.
   *
   * @param projectId project id
   * @param iteratee receives each workflow to produce entities/relationships
   */
  public async iterateWorkflows(
    projectId: string,
    iteratee: ResourceIteratee<SemaphoreWorkflow>,
  ): Promise<void> {
    await this.paginatedRequest<SemaphoreWorkflow>(
      this.withBaseUri(`plumber-workflows?project_id=${projectId}`),
      async (workflow) => {
        await iteratee(workflow);
      },
    );
  }

  /**
   * Iterates each workflow resource in the provider.
   *
   * @param projectId project id
   * @param iteratee receives each pipeline to produce entities/relationships
   */
  public async iteratePipelines(
    projectId: string,
    iteratee: ResourceIteratee<SemaphorePipeline>,
  ): Promise<void> {
    await this.paginatedRequest<SemaphorePipeline>(
      this.withBaseUri(`pipelines?project_id=${projectId}`),
      async (pipeline) => {
        await iteratee(pipeline);
      },
    );
  }

  /**
   * Iterates each pipeline resource in the provider.
   *
   * @param pipelineId pipeline id
   */
  public async getPipeline(
    pipelineId: string,
  ): Promise<SemaphorePipelineDetails> {
    const { res } = await this.request(
      this.withBaseUri(`pipelines/${pipelineId}?detailed=true`),
    );
    return res;
  }

  /**
   * Iterates each job resource in the provider.
   *
   * @param jobId job id
   */
  public async getJob(jobId: string): Promise<SemaphoreJob> {
    const { res } = await this.request(this.withBaseUri(`jobs/${jobId}`));
    return res;
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
