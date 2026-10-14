# Branova Backend, Java / Spring Boot

This is the server-side application for Branova Concepts Uganda Ltd. The storefront remains a static HTML/CSS/JavaScript application and communicates with this API when a backend URL is configured.

## Stack

- Java 17
- Spring Boot 3
- Maven
- Spring Web and Validation
- Spring Data JPA
- MySQL

## Run locally

1. Install Java 17+ and Maven.
2. Start MySQL and create the database using `database/setup.sql`.
3. In a terminal, enter the `backend/` directory.
4. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` and `FRONTEND_URL` as environment variables. Use a private password, not the example credentials.
5. Run `mvn spring-boot:run`.
6. The API starts at `http://localhost:8080`.

For local frontend development, the default allowed origin is `http://localhost:5500`. When deployed, set `FRONTEND_URL` to the exact public frontend origin, for example `https://jimtimaka.github.io`. If the frontend is hosted under a GitHub Pages project path, the origin does not include the path.

## REST endpoints

- `GET /api/health`, checks that the API is running.
- `GET /api/services`, returns Branova service information.
- `GET /api/catalog`, returns the product catalogue metadata, categories and image paths.
- `POST /api/enquiries`, validates and stores a customer enquiry in MySQL.

Example enquiry body:

```json
{
  "name": "Jane Example",
  "phone": "+256700000000",
  "email": "jane@example.com",
  "message": "Please quote for 500 branded notebooks, A5 size."
}
```

The frontend catalogue is usable without the backend. When the backend is deployed, define `window.BRANOVA_API_URL` before `assets/js/main.js` loads, using the base URL of the deployed API. The frontend then syncs catalogue metadata from `GET /api/catalog` and sends enquiry submissions to `POST /api/enquiries`. If the API is not configured or is unavailable, the enquiry form prepares a WhatsApp message as a fallback.

For example, add this script immediately before the main JavaScript file in `index.html`, replacing the placeholder with the real deployed API URL:

```html
<script>window.BRANOVA_API_URL = "https://YOUR-BACKEND-HOST";</script>
<script src="assets/js/main.js"></script>
```

Do not place database credentials or private API keys in frontend files.

## Object-oriented design

- `Product` is the abstract parent class for shared product data.
- `BrandedProduct` inherits from `Product` and adds branding cost.
- `GeneralSupply` inherits from `Product` for sourced, non-branded supplies.
- `Customer`, `Enquiry`, `Quotation` and `QuotationItem` represent business data.
- Repositories handle persistence, while services hold business logic and controllers handle HTTP requests.

This structure demonstrates encapsulation, abstraction, inheritance and polymorphism in a real Branova use case.

## MySQL and deployment notes

Hibernate currently uses `ddl-auto=update` for development. Before production, use managed database credentials, HTTPS, schema migrations such as Flyway, backups and suitable database permissions. GitHub Pages hosts static frontend files only. The Java API and MySQL database must be hosted separately on services that support them.

## Tests

Run `mvn test` from the `backend/` directory.
