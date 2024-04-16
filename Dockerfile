FROM node:14-alpine

# Installez Git
RUN apk update && apk add --no-cache git bash

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]