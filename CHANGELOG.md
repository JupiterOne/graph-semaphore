# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Ingest new entities
  - `semaphore_account`
  - `semaphore_job`
  - `semaphore_pipeline`
  - `semaphore_project`
  - `semaphore_workflow`
- Build new relationships
  - `semaphore_account_has_project`
  - `semaphore_pipeline_has_job`
  - `semaphore_project_has_pipeline`
  - `semaphore_project_has_workflow`
