FROM node:16.13.0-alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --silent
COPY . /usr/src/app
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "start"]

