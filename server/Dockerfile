FROM node:lts
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 8000

COPY ./dist /dist
COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json
RUN NODE_ENV="$NODE_ENV" npm install
CMD ["node", "dist/server.js"]
