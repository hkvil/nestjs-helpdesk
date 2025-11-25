# Helpdesk API Documentation

Base URL: `http://localhost:3000`

Note: This documentation is for the local development API. Authentication is scaffolded but not enforced by default — most endpoints are open for now.

## Master Data

### Channels
- `GET /master-data/channels` — List all channels
- `POST /master-data/channels` — Create a channel
- `GET /master-data/channels/:id` — Get channel details
- `PATCH /master-data/channels/:id` — Update channel
- `DELETE /master-data/channels/:id` — Delete channel

### Categories
- `GET /master-data/categories` — List all categories
- `POST /master-data/categories` — Create a category (body: { name, channel_id })
- `GET /master-data/categories/:id` — Get category details
- `PATCH /master-data/categories/:id` — Update category
- `DELETE /master-data/categories/:id` — Delete category

### Pipelines
- `GET /master-data/pipelines` — List all pipelines
- `POST /master-data/pipelines` — Create a pipeline
- `GET /master-data/pipelines/:id` — Get pipeline by id
- `PATCH /master-data/pipelines/:id` — Update pipeline
- `DELETE /master-data/pipelines/:id` — Delete pipeline

## Tickets

### Ticket Management
- `POST /tickets` — Create a new ticket
  - Body: { reporter_id: number, channel: string, category: string, sub_category: string, pipeline: string, name: string, description?: string, priority: 'low'|'medium'|'high'|'critical', source?: 'Portal'|'Email'|'WhatsApp' }
- `GET /tickets` — List tickets (includes reporter relation)
- `GET /tickets/:id` — Get ticket details (includes reporter, stages, assignees, attachments, associations)
- `PATCH /tickets/:id` — Update ticket (supports stage and assignee via assignee_id). Example: { stage: 'Assigned' } or { assignee_id: 5 }

## SLA Policies

- `GET /sla` — List SLA policies
- `POST /sla` — Create SLA policy (see DTO for fields such as name, description, pipeline, priority, start_stage, end_stage, resolution_time_hour, resolution_time_minute, operational_hours)
- `GET /sla/:id` — Get SLA policy details
- `PATCH /sla/:id` — Update SLA policy
- `DELETE /sla/:id` — Remove SLA policy

## Knowledge Base

- `GET /knowledge-base` — List articles
- `POST /knowledge-base` — Create article
- `GET /knowledge-base/:id` — Get article details
- `PATCH /knowledge-base/:id` — Update article
- `DELETE /knowledge-base/:id` — Delete article

---

## Environment variables (important)

- DATABASE_URL — Postgres connection string (e.g. postgresql://user:pass@host/dbname). Keep secret in your environment and CI.
- DB_SYNCHRONIZE — true/false. Default: false. Avoid true in production.
- DB_SSL — true/false. Set based on your DB provider.
- JWT_SECRET — secret for JWT if you enable auth in the future (scaffolded but not enforced by default)
- JWT_EXPIRES_IN — token expiry for auth tokens

---

If you want me to export this into an OpenAPI/Swagger spec next, I can add a minimal swagger setup in the next PR.

---

Postman collection (Ticket Management)
- Path: `postman/helpdesk-ticket-management.postman_collection.json`
- Import into Postman and use the `Helpdesk Local` environment (`postman/helpdesk-environment.postman_environment.json`) with `{{baseUrl}}` set to `http://localhost:3000`.

The collection contains sample requests and responses for ticket endpoints: Create, List, Get by ID, Update (stage / assignee).
