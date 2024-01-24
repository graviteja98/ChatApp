# Build stage
FROM node:14 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:latest

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/build .

# Copy Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the specified port (change 80 to your desired port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
