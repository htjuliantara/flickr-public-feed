FROM node:alpine as flickr-public-feed-app

WORKDIR /client

COPY package*.json ./

RUN npm i  --production --silent

COPY ./public ./public

COPY ./src ./src

ARG REACT_APP_API_BASE_URL=http://localhost:8000
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

FROM nginx:latest

COPY --from=flickr-public-feed-app /client/build/ /usr/share/nginx/html

EXPOSE 80