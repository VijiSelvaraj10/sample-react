### STAGE 1: Build ###
FROM node:14.21.2-alpine

#RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build
EXPOSE 4000
CMD npx next start -p 4000