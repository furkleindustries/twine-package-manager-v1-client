FROM node:8.5

RUN mkdir -p /etc/twine-package-manager/client/

WORKDIR /etc/twine-package-manager/client/

ENV NODE_ENV production

COPY . .

RUN \
    npm install --production && \
    npm run nextbuild

ENTRYPOINT npm run nextstart