FROM nginx:latest
MAINTAINER Nathan Grubb "me@nathangrubb.io"

COPY nginx.conf /etc/nginx/nginx.conf
COPY html /usr/share/nginx/html
