# Sử dụng image nginx:alpine làm base image
FROM nginx:alpine

ARG ENV_MODE=production

COPY ./conf/${ENV_MODE}.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]