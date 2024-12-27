# Use Node.js for building the React app
FROM node:16 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app for production
RUN npm run build

# Use NGINX to serve the app
FROM nginx:alpine

# Copy the build output from React into NGINX's static directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom NGINX config file into the NGINX container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
