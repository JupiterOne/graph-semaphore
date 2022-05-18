# Development

This integration focuses on [Semaphore Ci](https://semaphoreci.com/) and is
using [Semaphore CI API](https://docs.semaphoreci.com/reference/api-v1alpha/)
for interacting with the Semaphore CI resources.

## Provider account setup

### In Semaphore CI

1. In your organization, go to profile settings.
2. Copy your API token

## Authentication

Provide the `API_TOKEN`, and `ORG_NAME` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The API token will be used to authorize requests.
