# Use Node.js for building the React app
FROM node:16 AS build

WORKDIR /app

# Set build-time argument for API URL
ARG REACT_APP_API_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set the environment variable for React during the build process
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build the app for production
RUN npm run build

# Serve the app using nginx
FROM nginx:alpine

# Copy build output to Nginx's default static file directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
