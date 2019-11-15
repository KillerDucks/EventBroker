# Include the image to build on
FROM node:alpine
# Set the Working Path
WORKDIR /usr/src/app
# Copy the package files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# Install the packages
RUN npm install
# Copy over the source code
COPY . .
# Generate RSA keys
RUN ./GenerateKeys.sh
# Expose the TCP port
EXPOSE 8080
# Start the Node app
CMD npm start