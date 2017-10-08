# Use the official node image as a base.
# https://github.com/nodejs/docker-node/blob/c37d5e87fa6d46c0e387f73161b056bbf90b83aa/8.6/Dockerfile
FROM node:8.5

# Expose the HTTP port.
EXPOSE 80

# Recursively create the directory for the rich HTML client.
RUN mkdir -p /etc/twine-package-manager/client/

# Set the working directory.
WORKDIR /etc/twine-package-manager/client/

# Set the node environment to 'production'. This ensures that dev packages and
# HMR functionality are not installed/enabled.
ENV NODE_ENV production

# Copy the entire current host directory to the container's working directory.
COPY . .

# Run the following command with /bin/sh -c.
RUN \
    # Install all production packages with verbose logging. \
    npm install --production --verbose && \
    # Build the server. \
    npm run nextbuild

# Attach the container process to the server start process.
ENTRYPOINT npm run nextstart