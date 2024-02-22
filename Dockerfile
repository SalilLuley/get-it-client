# Use a base image with Node.js installed
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the Docker image
COPY . .

# Set the necessary environment variables
# Replace these with your actual environment variables
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Specify the command to run the application
CMD [ "npm", "run", "dev" ]