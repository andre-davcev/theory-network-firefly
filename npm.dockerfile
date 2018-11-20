FROM node:latest
LABEL author="Andre Davcev"
WORKDIR /app
COPY package.json package.json
RUN npm install
