# Stage 1: Building the code
FROM node:16-alpine as builder

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the production bundle
RUN npm run build && \
    npm prune --production

# Stage 2: Run the Next.js application
FROM node:16-alpine as runner

WORKDIR /app

# Copy the built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Use the non-root user to run our application
USER node

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]
