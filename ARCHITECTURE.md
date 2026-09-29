# Branova Website Architecture

## Frontend

The frontend is the part visitors see and use in their browser.

For the current GitHub Pages deployment it remains at the repository root:

```
index.html
assets/
  css/
  js/
  images/
```

The `frontend/` directory contains frontend-specific documentation and is the target location for a future deployment migration.

## Backend

The backend is now isolated under:

```
backend/
  package.json
  .env.example
  src/
    server.js
```

It provides the starting API layer for enquiries, quotations, products, orders and future admin/database features.

## Deployment

GitHub Pages hosts static files only, so the live website continues to use the root frontend.

The backend must be deployed separately to a service capable of running Node.js. Once deployed, the frontend can call it through an API URL.

## Development model

- `main`: stable/live website.
- feature branches: development and testing.
- merge to `main` only after changes are checked.

This structure separates browser code from server-side code without disrupting the existing Branova website.
