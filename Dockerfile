FROM node:12.18.3-alpine

RUN mkdir -p /app

WORKDIR /app
ADD . /app

RUN npm i

EXPOSE 3000
CMD ["npm", "start"]
