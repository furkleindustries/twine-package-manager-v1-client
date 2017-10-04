FROM node:8.5

RUN mkdir -p /etc/twine-package-manager/client/

WORKDIR /etc/twine-package-manager/client/

# There's no point in running in dev mode and 
ENV NODE_ENV production

COPY . .

# Unsure why env is needed here.
RUN \
    env npm install && \
    env npm run nextbuild

ENTRYPOINT npm run nextstart