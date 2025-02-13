#Sample Dockerfile for NodeJS Apps

FROM node:20.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "node", "app.js" ]