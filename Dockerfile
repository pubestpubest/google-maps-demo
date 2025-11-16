# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Use pnpm if available; fallback to npm. Install deps in a reproducible way.
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --no-frozen-lockfile

# Provide Vite envs at build time (baked into static assets)
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

COPY . .
# Ensure Vite can read env; build for production
RUN pnpm build

# Stage 2: Nginx to serve static files
FROM nginx:alpine AS runtime
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx listens on 80 internally
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


