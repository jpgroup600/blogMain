FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Keep TypeScript for runtime config loading, remove other devDependencies
RUN npm ci --omit=dev && npm install typescript && npm cache clean --force

EXPOSE 3000

CMD ["npm", "start"]
