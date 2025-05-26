FROM node:20-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /dist
COPY . .
RUN yarn install
CMD ["node", "/app/server.js"]
