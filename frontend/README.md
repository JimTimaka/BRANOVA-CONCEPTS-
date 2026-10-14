# Branova Frontend

The production frontend is currently served from the repository root because GitHub Pages is configured to deploy `main / (root)`.

Current frontend files:

- `/index.html`
- `/assets/css/style.css`
- `/assets/js/main.js`
- `/assets/images/`

These are browser-facing files: HTML, CSS, JavaScript and images.

## Why the files remain at root

Moving `index.html` into this directory immediately would break the current GitHub Pages publishing configuration. This folder documents the frontend boundary while the live deployment remains stable.

When we migrate hosting/build configuration later, the root frontend can be moved physically into this directory without taking the current site offline.
