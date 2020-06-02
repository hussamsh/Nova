#Define image to build from
FROM node:lts

# Create app directory
WORKDIR /nova

COPY ./package*.json /nova/

RUN npm install

COPY . /nova/





