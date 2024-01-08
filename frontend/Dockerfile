
# Use the official Node.js 21.2.0 image as the base image
FROM node:21.2.0

# Copy package.json and package-lock.json to the working directory
COPY ./app /srv/app

# Instala Expo CLI globalmente
RUN npm install -g expo-cli

# Working dir
WORKDIR /srv/app

# Install dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 19000

# Start the application
CMD ["expo" ,"start"]
