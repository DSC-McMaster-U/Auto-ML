# Stage 1: Building the code
FROM node:16-alpine as builder

WORKDIR /app

# Copy the package.json and package-lock.json/yarn.lock files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:16-alpine as runner

WORKDIR /app

# Copy the built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js collects completely anonymous telemetry data about general usage.
# If you'd like to opt-out, you can use the following command:
RUN npx next telemetry disable

# Expose the port Next.js runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]
