FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# RUN npm install -g npm@8.7.0
RUN yarn
COPY . .
RUN yarn build --fix

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
