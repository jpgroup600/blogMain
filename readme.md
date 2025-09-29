# Backend (from project root directory)
docker build -t jacob4368/blog-backend:latest ./tribune-blog-cms-main
docker push jacob4368/blog-backend:latest

# Frontend (from project root)
docker build -t jacob4368/tribune-blog-frontend:latest ./tribune-blog-main
docker push jacob4368/tribune-blog-frontend:latest