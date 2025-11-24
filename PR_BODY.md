# PR: Move config to env + add validation, tests, docs, and new endpoints

This PR prepares several security, reliability and developer experience improvements:

## Summary
- Move TypeORM DB config out of source into env-driven ConfigModule (no hard-coded DB URL in source anymore)
- Add global DTO validation via ValidationPipe and class-validator / class-transformer
- Implement missing CRUD endpoints for master-data, SLA and Knowledge Base
- Add a lightweight authentication scaffold (password hashing helpers); passwords stored with select: false; guards not enforced by default
- Fix & update unit tests (add mocks) — all tests are green locally
- Add Node CI workflow (lint + tests) and ensure the Docker CI workflow runs lint & test before push
- Update docs: `API_DOCS.md`, `README.md`, `CHANGELOG.md`, and add a PR template

## Files touched (high level)
- app.module.ts, main.ts
- src/ticket/dto/* (validation)
- src/master-data/* (controller, service, DTOs, tests)
- src/sla/* (controller, service, DTOs, tests)
- src/knowledge-base/* (controller, service, DTOs, tests)
- auth/* (scaffold and tests)
- CI workflows: .github/workflows/nodejs-ci.yml and modify ci.yml
- docs: API_DOCS.md, README.md, CHANGELOG.md

## Testing & verification
- Steps to run locally:
  1. copy `.env.example` to `.env` and set DATABASE_URL
  2. npm ci
  3. npm run start:dev
  4. npm run seed (to populate development data)
  5. npm test
  (All unit tests passed locally on the feature branch)

## Security / migration notes
- Because DB credentials were present at the repository start, rotate any exposed DB credentials and use secrets in CI.
- Remember to set `DB_SYNCHRONIZE=false` in production and rely on migrations for schema changes.

## Follow-up / future work (recommended)
- Add login/register controllers and JWT-based authentication with guards where needed.
- Add e2e tests for the main API flows and optionally a Swagger/OpenAPI spec.
- Consider scanning Git history for leaked secrets and removing them (BFG / git filter-repo) and rotate secrets.

---

If you'd like, I can open the PR on GitHub for you or push this branch and create a draft PR — tell me if you want me to open it automatically.
