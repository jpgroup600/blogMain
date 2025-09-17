# Deploy as Single Next.js App

## Option 1: Next.js API Routes + Payload CMS
1. Move Payload CMS into Next.js API routes
2. Use Next.js built-in API endpoints
3. Deploy as single application

## Option 2: Vercel + External Database
1. Keep Payload CMS separate but deploy to Vercel
2. Use Vercel's serverless functions
3. Connect to external MongoDB

## Option 3: Next.js + Headless CMS
1. Use a headless CMS service (Strapi, Contentful, etc.)
2. Keep only the frontend Next.js app
3. Deploy to Vercel/Netlify

## Option 4: Monorepo with Vercel
1. Deploy both apps to Vercel
2. Use Vercel's monorepo support
3. Configure build order
