FROM node:24-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/TF_Java_2026_RCD_Fend /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200
