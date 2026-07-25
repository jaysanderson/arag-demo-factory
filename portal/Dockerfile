# ── build stage ──────────────────────────────────────────────────────────────
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# ── runtime stage ────────────────────────────────────────────────────────────
FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
# Only prod deps for a lean image (Express + its transitive deps).
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
COPY demo.config.json ./demo.config.json
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server/index.mjs"]
