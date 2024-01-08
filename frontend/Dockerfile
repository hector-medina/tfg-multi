
# Use the official Node.js 21.2.0 image as the base image
FROM node:21.2.0

# Copy package.json and package-lock.json to the working directory
COPY ./app /srv/app

# Working dir
WORKDIR /srv/app

# Install dependencies
RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# Expose the port on which the application will run
EXPOSE 8081


# Start the application
CMD ["npx", "expo" ,"start"]
