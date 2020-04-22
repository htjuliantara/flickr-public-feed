FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm i  --production --silent

COPY ./src ./src

EXPOSE 8000

CMD [ "npm", "start" ]