# base stage to install OS libs and other global dependencies
ARG NODE_TAG=20-alpine
FROM node:${NODE_TAG} as base

WORKDIR /app


# intermediate build stage used to compile source
FROM base as builder

COPY nest-cli.json \
  package.json \
  package-lock.json \
  tsconfig.build.json \
  tsconfig.json \
  ./

RUN npm ci

COPY src/ ./src

RUN npm run build


# final production stage
FROM base as prod
ENV NODE_ENV=production

COPY package.json \
  package-lock.json \
  ./

EXPOSE 6000
EXPOSE 27017

RUN npm install --only=production

COPY --from=builder /app/dist/ ./dist

CMD ["npm", "start"]
