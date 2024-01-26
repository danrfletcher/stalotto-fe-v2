#Build stage for React webapp
FROM node:20-alpine as stalotto-fe-buildstage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Setup stage for Nginx
FROM nginx:alpine as stalotto-fe
COPY --from=stalotto-fe-buildstage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

