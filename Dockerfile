# Use the official node image as a base.
# https://github.com/nodejs/docker-node/blob/c37d5e87fa6d46c0e387f73161b056bbf90b83aa/8.6/Dockerfile
FROM node:8.6

# Expose the HTTP port.
EXPOSE 80

# Recursively create the directory for the rich HTML client.
RUN mkdir -p /etc/twine-package-manager/client/

# Set the working directory.
WORKDIR /etc/twine-package-manager/client/

ARG TWINEPM_MODE=production

ENV TWINEPM_MODE=${TWINEPM_MODE}

# Set the node environment to 'production' by default. This ensures that dev
# packages and HMR functionality are not installed/enabled.
ENV NODE_ENV=${TWINEPM_MODE}

# Copy the entire current host directory to the container's working directory.
COPY . .

# Run the following command with /bin/sh -c.
RUN \
    # Install all packages. \
    npm install && \
    # Build the server. \
    npm run nextbuild

# Attach the container process to the server start process.
ENTRYPOINT npm run nextstart