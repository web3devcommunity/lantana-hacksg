FROM bitnami/node:18.16.0 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build

# Production image, copy all the files and run next
FROM bitnami/node:18.16.0 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN useradd -r -u 1001 -g root lantana

COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=lantana:root /app/.next/standalone ./
COPY --from=builder --chown=lantana:root /app/.next/static ./.next/static

USER lantana
EXPOSE $PORT
CMD ["node", "server.js"]
