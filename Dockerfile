FROM node:16.10.0-alpine

WORKDIR /app

COPY ./ ./

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
