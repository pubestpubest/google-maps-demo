# Project TODOs

## Data & Persistence
- Replace in-memory mock data with a real database (PostgreSQL recommended)
- Define schema migrations (e.g., Prisma or Knex) and migration workflow
- Seed data for local development (sample trips, orders, products)
- Add environment-specific configs (local/dev/prod) and secrets management

## Data Model (initial proposal)
- trips
  - id (string/uuid)
  - name (string)
  - created_at, updated_at (timestamps)
- orders
  - id (string/uuid)
  - trip_id (fk -> trips.id)
  - name (string)
  - tel (string)
  - location_name (string, nullable)
  - location_lat (float, nullable)
  - location_lng (float, nullable)
  - created_at, updated_at (timestamps)
- products (SKU catalog)
  - id (string/uuid)
  - sku (enum: 'VT_TRAVEL_BIG' | 'VT_TRAVEL_SMALL' | 'VT_READY_BIG' | 'VT_READY_SMALL')
  - display_name (string)
- order_items
  - id (string/uuid)
  - order_id (fk -> orders.id)
  - product_id (fk -> products.id)
  - quantity (int >= 0)

Notes:
- Keep SKUs in a products table to allow future price/metadata
- Lat/lng stored on orders (single coordinate per order)

## Backend Service
- Tech: Node.js (Express/Fastify) or NestJS; Prisma ORM; PostgreSQL
- Structure: REST API with validation (Zod/Joi), centralized error handling, logging
- Authentication (future): simple key or JWT if needed

## REST API Endpoints (v1)
- Trips
  - GET /api/v1/trips → list trips
  - POST /api/v1/trips { name }
  - GET /api/v1/trips/:tripId
  - PATCH /api/v1/trips/:tripId { name }
  - DELETE /api/v1/trips/:tripId
- Orders
  - GET /api/v1/trips/:tripId/orders → list orders in a trip
  - POST /api/v1/trips/:tripId/orders { name, tel, locationName }
  - GET /api/v1/orders/:orderId
  - PATCH /api/v1/orders/:orderId { name, tel, locationName }
  - DELETE /api/v1/orders/:orderId
- Order Coordinates
  - PUT /api/v1/orders/:orderId/location { lat, lng }
- Order Items
  - GET /api/v1/orders/:orderId/items
  - PUT /api/v1/orders/:orderId/items [{ productId, quantity }]
- Products (SKU)
  - GET /api/v1/products → list allowed SKUs

## Frontend Integration
- Replace context mutations with API calls
- Add data fetching hooks (React Query/SWR) and optimistic updates
- Keep `.env` for frontend-only secrets (VITE_GOOGLE_MAPS_API_KEY)

## Validation & Types
- Shared types between frontend/backend (generate from Prisma/Zod or use OpenAPI)
- Enforce request/response schemas, input sanitization

## DevOps
- Dockerize backend + database (docker-compose)
- CI: run lint, typecheck, tests; build images
- CD: environment configs for staging/production