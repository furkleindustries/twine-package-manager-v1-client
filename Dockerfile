FROM node:8.5

RUN mkdir -p /etc/twine-package-manager/client/

WORKDIR /etc/twine-package-manager/client/

COPY . .

# Unsure why env is needed here.
RUN \
    env npm install --no-bin-links && \
    env npm run nextbuild

ENTRYPOINT npm run nextstart