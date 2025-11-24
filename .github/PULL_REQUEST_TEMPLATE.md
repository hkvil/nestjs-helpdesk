# Title

Short description of the change (50-72 chars recommended).

## Summary of changes
- (Add bullet list of changes made)

## Why this is needed
- (Context and motivation for the changes)

## How to test / validate
- Run locally: copy `.env.example` to `.env`, set DATABASE_URL, then:
  - npm ci
  - npm run start:dev
  - npm run seed (to populate development data)
  - npm test

## Checklist
- [ ] Tests added for new behavior
- [ ] Lint passes
- [ ] No secrets checked into repo
- [ ] Documentation updated (`README.md`, `API_DOCS.md`, `CHANGELOG.md`)

## Notes for reviewers
- Please verify DB synchronization is off for production and that no plaintext credentials remain.
