FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm install babel-cli -g --save --silent

RUN npm install --production --silent

COPY ./ ./

EXPOSE 8000

CMD [ "npm", "start" ]