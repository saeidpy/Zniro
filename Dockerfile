FROM node:12
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
CMD node server.js
EXPOSE 8081