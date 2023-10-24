FROM nginx:latest

COPY dist/. /usr/share/nginx/html/
COPY nginx/. /etc/nginx/conf.d/