FROM node:8.5

RUN mkdir /etc/twine-package-manager-client/

WORKDIR /etc/twine-package-manager-client/

COPY . .

RUN
    npm install && \
    npm nextbuild && \
    npm nextstart