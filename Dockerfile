# Multi-stage Dockerfile for docker-notes-app

# 1) dependencies stage
FROM node:20-alpine AS deps
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --production

# 2) build stage(not used heavily here but kept for pattern)
FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci
COPY app/ ./
#RUN npm run build # uncomment if building front-end or transpiling

# 3) runtime

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup


COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -q -O- http://localhost:5000/health || exit 1
CMD ["node", "server.js"]