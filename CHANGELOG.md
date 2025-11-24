# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- Move DB configuration into env-driven ConfigModule and TypeORM forRootAsync (no hard-coded DB credentials).
- Global ValidationPipe enabled and DTO validation added for ticket/master-data/KB/SLA.
- CRUD endpoints added for master-data (channels, categories, sub-categories, pipelines), SLA, Knowledge Base and Ticket improvements.
- Auth scaffolding + password hashing helpers (passwords stored with select: false). No guards enforced by default.
- New Node CI GitHub Action that runs lint and tests, and added lint/tests to the existing Docker CI workflow.

### Fixed
- Unit tests updated / mocks added so the test suite is stable and fast (all unit tests pass).

### Notes
- Production: ensure DB_SYNCHRONIZE is false; use migrations for schema changes. Update DB connection string via env.