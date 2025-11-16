# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Google Maps Demo

## Configure API key

1. Create a `.env` file in the project root (do not commit this file) and add:

```
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

2. Restart the dev server.

3. In Google Cloud Console, restrict your key:
- Application restrictions: HTTP referrers
- Allowed referrers: `http://localhost:5173/*` (and your production domains)
- API restrictions: enable and restrict to "Maps JavaScript API"

## Notes
- Vite exposes env vars prefixed with `VITE_` to the client as `import.meta.env.VITE_*`.
- The code reads `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` and passes it to the map modal.

## Running with Docker + Nginx

- Build and run the production container:

```
docker compose up --build
```

- Configure ports via environment variables:
  - `FRONTEND_PORT` (host port mapped to Nginx `80` inside the container). Default: `8080`.
  - Example (PowerShell):
    ```
    $env:FRONTEND_PORT="3000"; docker compose up --build
    ```

- Reverse proxy for backend:
  - Requests to `/api/*` are proxied by Nginx.
  - Update `nginx.conf` `proxy_pass` target (default `http://backend:8080/`) and define a corresponding `backend` service in `docker-compose.yml` when you add a backend.

## Dev server ports via env

- You can control Vite ports via env variables in a `.env` file at the project root:
  - `VITE_PORT` (dev): defaults to `5173`
  - `VITE_PREVIEW_PORT` (preview): defaults to `4173`
  - Example (PowerShell):
    ```
    Set-Content -Path .env -Value @"
    VITE_PORT=5174
    VITE_PREVIEW_PORT=4174
    FRONTEND_PORT=8080
    VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY
    "@
    ```

## Env handling with Nginx and containers

- This app is built to static files and served by Nginx. Client-side envs must be known at build time.
- Provide your API key via compose build args or a `.env` file next to `docker-compose.yml`:
  - `.env`:
    - `VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY`
    - `FRONTEND_PORT=8080` (optional)
  - Build and run:
    - `docker compose up --build`
- Why `.env.local` won’t work here:
  - `env_file:` only injects runtime envs into the container, but the static bundle is already built. Use build args (from `.env` or shell) so Vite can bake values into the JS at build time.
- Nginx doesn’t read app envs at runtime for SPA; to change client envs, rebuild the image.
