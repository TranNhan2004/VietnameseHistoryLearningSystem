# Stage 0: Base stage cho cả Development và Production
FROM node:22-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

# Stage 1: Development stage
FROM base AS development
CMD ["npm", "run", "${APP_MODE}"]

# Stage 2: Production build stage
FROM base AS build
ARG APP_MODE=build-all
RUN if [ "$APP_MODE" = "build-all" ]; then \
  npx nx build admin --configuration=production --output-path=dist/admin && \
  npx nx build learner --configuration=production --output-path=dist/learner; \
  elif [ "$APP_MODE" = "build-admin" ]; then \
  npx nx build admin --configuration=production --output-path=dist/admin; \
  elif [ "$APP_MODE" = "build-learner" ]; then \
  npx nx build learner --configuration=production --output-path=dist/learner; \
  fi
