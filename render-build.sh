#!/bin/bash
# Build script for Render deployment

echo "Starting Render build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client (optional - only if using database)
if [ -n "$DATABASE_URL" ]; then
  echo "Generating Prisma client..."
  npx prisma generate
  
  # Run migrations in production
  echo "Running database migrations..."
  npx prisma migrate deploy || echo "No migrations to run"
fi

# Build Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"