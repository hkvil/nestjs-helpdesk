# Helpdesk API Documentation

Base URL: `http://localhost:3000`

## Master Data

### Channels
- `GET /master-data/channels`: List all channels
- `POST /master-data/channels`: Create a channel
- `GET /master-data/channels/:id`: Get channel details
- `PUT /master-data/channels/:id`: Update channel
- `DELETE /master-data/channels/:id`: Delete channel

### Categories
- `GET /master-data/categories`: List all categories
- `POST /master-data/categories`: Create a category
- `GET /master-data/categories/:id`: Get category details

### Pipelines
- `GET /master-data/pipelines`: List all pipelines
- `POST /master-data/pipelines`: Create a pipeline

## Tickets

### Ticket Management
- `POST /tickets`: Create a new ticket
    - Body: `{ "reporter_id": 1, "category_id": 1, "description": "..." }`
- `GET /tickets`: List tickets (supports filtering)
- `GET /tickets/:id`: Get ticket details
- `PATCH /tickets/:id/stage`: Update ticket stage
    - Body: `{ "stage": "In Progress" }`
- `PATCH /tickets/:id/assign`: Assign ticket
    - Body: `{ "assignee_id": 1 }`

## SLA Policies

- `GET /sla`: List SLA policies
- `POST /sla`: Create SLA policy

## Knowledge Base

- `GET /knowledge-base`: List articles
- `POST /knowledge-base`: Create article
- `GET /knowledge-base/:id`: Get article details
