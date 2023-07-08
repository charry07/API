FROM node:16 as build
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g ts-node
COPY . /app
EXPOSE 3001
CMD ["npm", "start"]