# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install build dependencies and `bcrypt`.
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt-get remove --purge -y build-essential python3 && \
    apt-get autoremove -y && \
    apt-get clean

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Expose the port your application runs on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "start:prod"]
