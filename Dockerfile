# Declarar la imagen base
FROM nginx:alpine

# Establecer un directorio de trabajo
WORKDIR /usr/share/nginx/html

# Copiar archivos
COPY . /usr/share/nginx/html


# Exponer el puerto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
