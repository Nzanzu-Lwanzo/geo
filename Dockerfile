FROM node:lts-trixie-slim AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY . .

RUN npm run build

FROM builder AS runner

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/src/data ./dist/data
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

# Remove uneeded files
RUN rm -rf /app/src
RUN rm -rf /app/package-lock.json
RUN rm -rf /app/package.json
RUN rm -rf /app/tsconfig.json
RUN rm -rf /app/.git

USER appuser

EXPOSE 8888

CMD [ "node","dist/server.js" ]