FROM node:16.13.0-alpine
WORKDIR /usr/src/app/server
COPY package-lock.json /usr/src/app/server/
COPY package.json /usr/src/app/server/
RUN npm ci  --silent --only=production
COPY --chown=node:node . /usr/src/app/server
USER node
EXPOSE 3001
CMD ["npm", "start"]