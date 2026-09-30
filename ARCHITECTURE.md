# Branova Website Architecture

## Frontend

The customer-facing frontend remains at the repository root for the current GitHub Pages deployment:

```
index.html
assets/
  css/
  js/
  images/
```

The `frontend/` directory documents the frontend boundary. Keeping `index.html` at root prevents disruption to the existing GitHub Pages site.

## Backend — Java / Spring Boot

Server-side code is isolated under:

```
backend/
  pom.xml
  src/main/java/com/branova/
    BranovaApplication.java
    controller/
    model/
    service/
  src/main/resources/
  src/test/
```

The backend uses OOP for Branova business concepts. An abstract `Product` class is extended by `BrandedProduct` and `GeneralSupply`; quotations work against the common Product abstraction.

## Communication

```
Browser
  ↓
HTML / CSS / JavaScript frontend
  ↓ REST/JSON
Java Spring Boot API
  ↓
Business logic / services
  ↓
Database (next stage)
```

## Deployment

GitHub Pages hosts static frontend files only. The Java backend will be deployed separately to a Java-compatible service, and the frontend will call its public API URL.

## Development model

- `main`: stable/live website
- feature branches: development/testing
- pull requests: review before merging major changes

This keeps the live site stable while allowing the backend to grow independently.
