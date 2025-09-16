#!/bin/bash

echo "🚀 Building Tribune Blog..."

echo "📦 Step 1: Building backend..."
docker-compose build backend

echo "🔄 Step 2: Starting backend..."
docker-compose up -d backend

echo "⏳ Waiting for backend to be ready..."
sleep 10

echo "📦 Step 3: Building frontend..."
docker-compose build frontend

echo "🔄 Step 4: Starting frontend..."
docker-compose up -d frontend

echo "✅ All services are running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:4000"
