# Stage 1: Building the code
FROM node:16-alpine AS builder

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the app source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM node:16-alpine AS runner
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/.next/ .next/
COPY --from=builder /app/node_modules/ node_modules/
COPY --from=builder /app/public/ public/
COPY --from=builder /app/package.json package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment to production to avoid including unnecessary files
# ENV NODE_ENV development

# Start the app
CMD ["npm", "start"]