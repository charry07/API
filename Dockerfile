# Etapa de construcción
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


#                          LEER PRIMERO
############ comando para crear la imagen en docker ###########
#docker build -t api .

######## comando para correr la imagen en docker ###########
#docker run --name api-container -dp 3000:80 api
