FROM node:current-alpine
WORKDIR /app
RUN npm install -g http-server
COPY . . 
CMD [ "http-server", "-s"]