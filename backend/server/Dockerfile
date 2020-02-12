FROM node
RUN mkdir -p /var/app
WORKDIR /var/app
ADD package*.json ./
COPY ./dist ./
RUN npm install --only=production
RUN apt-get update && apt-get install -y imagemagick
CMD [ "node", "server.js" ]
