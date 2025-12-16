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
# See README for explanations on why we copy data into dist (Self-contained)
COPY --from=builder --chown=appuser:appgroup /app/src/data ./dist/data 
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

# Remove uneeded files
RUN rm -rf /app/src /app/package-lock.json /app/package.json /app/tsconfig.json

USER appuser

EXPOSE 8888

CMD [ "node","dist/server.js" ]