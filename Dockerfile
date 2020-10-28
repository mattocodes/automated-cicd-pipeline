FROM node:current-alpine
WORKDIR /app
COPY /js/package*.json ./
RUN npm install
COPY . . 
EXPOSE 8080
CMD [ "npm", "start"]
