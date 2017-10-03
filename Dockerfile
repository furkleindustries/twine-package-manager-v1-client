FROM node:8.5

RUN mkdir /etc/twine-package-manager/client/

WORKDIR /etc/twine-package-manager/client/

COPY . .

# Unsure why env is needed here.
RUN \
    env npm install && \
    env npm run nextbuild