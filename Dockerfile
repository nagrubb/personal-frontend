FROM nginx:latest
MAINTAINER Nathan Grubb "me@nathangrubb.io"

COPY nginx.conf /etc/nginx/nginx.conf
COPY html /usr/share/nginx/html

RUN apt update -y && apt upgrade -y
RUN apt install -y nodejs npm

COPY .babelrc /tmp
COPY package-lock.json /tmp
COPY package.json /tmp
COPY jsx /tmp/jsx

RUN cd /tmp && npm install
RUN cd /tmp && npx browserify jsx/index.jsx -t [ babelify ] -g [ envify --NODE_ENV production ] -g uglifyify -o /usr/share/nginx/html/js/index.js
