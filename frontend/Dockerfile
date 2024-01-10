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
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/build ./build
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Install serve globally
RUN npm install -g serve

# Expose the specified port (change 3055 to your desired port)
EXPOSE 3055

# Start the React app using serve with the specified port
CMD ["serve", "-s", "build", "-p", "3055"]
