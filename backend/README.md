# Branova Backend

This directory contains the server-side application for Branova Concepts Uganda Ltd.

## What belongs here

- API routes
- enquiry and quotation processing
- database access
- authentication/admin logic
- server-side integrations

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in `backend/`.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Run `npm run dev`.

The API defaults to `http://localhost:3000`.

### Initial endpoints

- `GET /api/health`
- `GET /api/services`
- `POST /api/enquiries`

GitHub Pages cannot execute this backend. It must later be deployed to a Node.js-compatible host. The existing frontend remains deployable through GitHub Pages.
