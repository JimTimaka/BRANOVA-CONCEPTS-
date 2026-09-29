# Branova Backend — Java / Spring Boot

This is the server-side application for Branova Concepts Uganda Ltd.

## Stack

- Java 17
- Spring Boot
- Maven
- REST API

## OOP structure

- `Product` — abstract parent class encapsulating common product data.
- `BrandedProduct` — inherits from Product and adds branding cost.
- `GeneralSupply` — inherits from Product for non-branded sourced/supplied items.
- `Customer` — customer entity.
- `Enquiry` — customer enquiry model.
- `Quotation` — uses Product polymorphically to calculate totals.
- `EnquiryService` — service layer for business logic.
- `ApiController` — HTTP/API layer.

This intentionally demonstrates encapsulation, abstraction, inheritance and polymorphism in a real Branova use case.

## Run locally

1. Install Java 17+ and Maven.
2. Open a terminal in `backend/`.
3. Run `mvn spring-boot:run`.
4. API starts at `http://localhost:8080`.

## Endpoints

- `GET /api/health`
- `GET /api/services`
- `POST /api/enquiries`

## Tests

Run:

`mvn test`

The initial quotation tests demonstrate polymorphic pricing for branded products and general supplies.

## Next backend stages

Database persistence (MySQL), quotation/order repositories, admin authentication and frontend API integration can be added without changing the core frontend architecture.

GitHub Pages hosts the frontend only. This Java application requires a Java-compatible backend host.


## MySQL persistence

The backend now uses Spring Data JPA with MySQL.

1. Install/start MySQL.
2. Run `database/setup.sql` as a MySQL administrator.
3. Change the example database password.
4. Set `DB_URL`, `DB_USERNAME` and `DB_PASSWORD` in your environment.
5. Run `mvn spring-boot:run`.

Hibernate currently uses `ddl-auto=update` for development, so it creates/updates the entity tables automatically. For production, schema migrations (Flyway) should replace automatic schema changes.

Current persistent entities:
- Customer
- Product (BrandedProduct / GeneralSupply inheritance)
- Enquiry
- Quotation
- QuotationItem
