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

1. Create a `.env.local` file in the project root (do not commit this file) and add:

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
