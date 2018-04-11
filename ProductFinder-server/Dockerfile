# Nodejs image from docker hub
FROM node:boron

# Create app directory
RUN mkdir -p /product-finder-alexa
WORKDIR /product-finder-alexa

# Install app dependencies
COPY package.json /product-finder-alexa
RUN npm install
# Bundle app source
COPY . /product-finder-alexa

EXPOSE 8001
CMD [ "node","app.js"]