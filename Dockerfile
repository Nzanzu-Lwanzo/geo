FROM node:lts-trixie-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8888

CMD [ "node","dist/server.js" ]