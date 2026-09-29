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
