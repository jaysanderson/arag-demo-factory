# ── build stage ──────────────────────────────────────────────────────────────
FROM node:20-slim AS build
WORKDIR /app
# .npmrc points at the Progress HAR registry; the lockfile pins exact (cooldown-
# safe) versions, so `npm ci` is deterministic and never trips HAR's 14-day gate.
COPY package.json package-lock.json* .npmrc ./
RUN npm ci
COPY . .
# `npm run build` runs the Kendo-licence prebuild (activates KENDO_UI_LICENSE if
# present, else trial mode — never fails the build over licensing) then vite build.
RUN npm run build

# ── runtime stage ────────────────────────────────────────────────────────────
FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
# Only prod deps for a lean image (Express + its transitive deps).
COPY package.json package-lock.json* .npmrc ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
COPY demo.config.json ./demo.config.json
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server/index.mjs"]
