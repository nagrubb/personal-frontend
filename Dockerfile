FROM nginx:latest
ARG npm_build_args="-g [ envify --NODE_ENV production ] -g uglifyify"
MAINTAINER Nathan Grubb "me@nathangrubb.io"

COPY nginx.conf /etc/nginx/nginx.conf
COPY html /usr/share/nginx/html

RUN apt update -y && apt upgrade -y

#Install specific version of nodejs
ENV NODE_VERSION=12.6.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

COPY .babelrc /tmp
COPY package-lock.json /tmp
COPY package.json /tmp
COPY jsx /tmp/jsx

RUN cd /tmp && npm install
RUN cd /tmp && npx browserify jsx/index.jsx -t [ babelify ] $npm_build_args -o /usr/share/nginx/html/js/index.js
