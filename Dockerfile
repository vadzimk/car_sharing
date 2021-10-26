FROM node:lts-alpine AS build-frontend-static
WORKDIR /usr/src/app/client
COPY /client /usr/src/app/client/
RUN npm ci
RUN npm run build



FROM node:lts-alpine
WORKDIR /usr/src/app/server
COPY --chown=node:node /server /usr/src/app/server
COPY --from=build-frontend-static /usr/src/app/client/build /usr/src/app/client/build
RUN npm ci --only=production
USER node
EXPOSE 3001
CMD ["npm", "start"]












