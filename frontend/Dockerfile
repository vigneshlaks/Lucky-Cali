# Development Stage

# Use an official Node.js runtime as the base image
FROM node:20 as developement

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Production Stage
FROM caddy:2-alpine as production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=developement /app/dist /srv
