FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./dist/admin /usr/share/nginx/html/admin
COPY ./dist/learner /usr/share/nginx/html/learner

RUN chmod -R 755 /usr/share/nginx/html/admin && chmod -R 755 /usr/share/nginx/html/learner

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
