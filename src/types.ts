export type SemaphoreProject = {
  spec: {
    visibility: string;
  };
  metadata: {
    owner_id: string;
    org_id: string;
    name: string;
    id: string;
    description: string;
  };
  kind: string;
  apiVersion: string;
};

export type SemaphoreWorkflow = {
  wf_id: string;
  triggered_by: number;
  rerun_of: string;
  requester_id: string;
  project_id: string;
  initial_ppl_id: string;
  hook_id: string;
  created_at: {
    seconds: number;
    nanos: number;
  };
  commit_sha: string;
  branch_name: string;
  branch_id: string;
};

export type SemaphorePipeline = {
  yaml_file_name: string;
  working_directory: string;
  wf_id: string;
  terminated_by: string;
  terminate_request: string;
  switch_id: string;
  stopping_at: {
    seconds: number;
    nanos: number;
  };
  state: string;
  snapshot_id: string;
  running_at: {
    seconds: number;
    nanos: number;
  };
  result: string;
  result_reason: string;
  queuing_at: {
    seconds: number;
    nanos: number;
  };
  project_id: string;
  ppl_id: string;
  pending_at: {
    seconds: number;
    nanos: number;
  };
  name: string;
  hook_id: string;
  error_description: string;
  done_at: {
    seconds: number;
    nanos: number;
  };
  created_at: {
    seconds: number;
    nanos: number;
  };
  commit_sha: string;
  branch_name: string;
  branch_id: string;
};

export type SemaphorePipelineDetails = {
  pipeline: {
    yaml_file_name: string;
    working_directory: string;
    wf_id: string;
    terminated_by: string;
    terminate_request: string;
    switch_id: string;
    stopping_at: string;
    state: string;
    snapshot_id: string;
    running_at: string;
    result_reason: string;
    result: string;
    queuing_at: string;
    project_id: string;
    ppl_id: string;
    pending_at: string;
    name: string;
    hook_id: string;
    error_description: string;
    done_at: string;
    created_at: string;
    commit_sha: string;
    branch_name: string;
    branch_id: string;
  };
  blocks: SemaphoreBlock[];
};

export type SemaphoreBlock = {
  state: string;
  result_reason: string;
  result: string;
  name: string;
  jobs: SemaphoreBlockSummary[];
  error_description: string;
  build_req_id: string;
  block_id: string;
};

export type SemaphoreBlockSummary = {
  status: string;
  result: string;
  name: string;
  job_id: string;
  index: number;
};

export type SemaphoreJob = {
  metadata: {
    name: string;
    id: string;
    create_time: string;
    update_time: string;
    start_time: string;
    finish_time: string;
  };
  spec: {
    project_id: string;
    agent: {
      machine: {
        type: string;
        os_image: string;
      };
    };
    env_vars: {
      name: string;
      value: string;
    }[];
    commands: string[];
  };
  status: {
    result: string;
    state: string;
    agent: {
      ip: string;
      ports: {
        name: string;
        number: number;
      }[];
    };
  };
};
