FROM node:8.5

RUN mkdir /etc/twine-package-manager-client/

WORKDIR /etc/twine-package-manager-client/

COPY . .

# Unsure why env is needed here. Plain npm calls fail, but not after running
# the container itself.
RUN \
    env npm install && \
    env npm nextbuild