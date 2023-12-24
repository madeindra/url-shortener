FROM node:20-slim as build

# Set working directory and copy files
WORKDIR /build
COPY . ./

# Install packages and build
RUN npm install
RUN npm run build

FROM node:20-slim as base

# Get argument or set default
ARG PORT=3000
ARG HOST=0.0.0.0
ARG DB_PATH=database.db
ARG DB_TABLENAME=urls

# Set environment variables from arguments
ENV PORT=$PORT
ENV HOST=$HOST
ENV DB_PATH=$DB_PATH
ENV DB_TABLENAME=$DB_TABLENAME

# Set working directory and copy files
WORKDIR /app
COPY --from=build /build/dist/. ./dist/
COPY --from=build /build/public/. ./public/
COPY --from=build /build/templates/. ./templates/
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/package-lock.json ./package-lock.json
COPY --from=build /build/node_modules/. ./node_modules/

# Remove dev dependencies
RUN npm prune --omit=dev

# Expose port using environment variable
EXPOSE $PORT

# Start the app
CMD [ "npm", "start" ]