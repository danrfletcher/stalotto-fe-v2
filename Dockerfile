#start with node version 20 on alpine linux making the named image
FROM node:20-alpine as fe-stalotto-reactwebapp-image

#specify the directory on the container where codebase is located
WORKDIR /app

#copy package files for node_module install - container node_modules will be preserved
COPY package*.json ./

#install dependencies in the image
RUN npm install

#copy the rest of the codebase
COPY . .

#build application ready for nginx server
RUN npm run build

#expose port 3000 for nginx server
EXPOSE 3000

