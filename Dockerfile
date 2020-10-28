FROM node:current-alpine

WORKDIR /app

COPY /js/package*.json .

RUN npm install

COPY . . 

CMD [ "npm", "start"]