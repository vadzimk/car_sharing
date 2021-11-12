FROM node:lts-alpine AS build-frontend-static
WORKDIR /usr/src/app/client
COPY client/package-lock.json /usr/src/app/client/
COPY client/package.json /usr/src/app/client/
RUN npm ci --silent
COPY client /usr/src/app/client/
ENV GENERATE_SOURCEMAP=false
RUN npm run build



FROM node:lts-alpine
WORKDIR /usr/src/app/server
COPY server/package-lock.json /usr/src/app/server/
COPY server/package.json /usr/src/app/server/
RUN npm ci  --silent --only=production
COPY --chown=node:node server /usr/src/app/server
COPY --from=build-frontend-static /usr/src/app/client/build /usr/src/app/client/build
USER node
EXPOSE 3001
CMD ["npm", "start"]












