Y# Unified Next.js Deployment

## Steps to merge into single Next.js app:

1. **Move Payload CMS into Next.js API routes**
   - Copy Payload collections to `pages/api/`
   - Update database connection
   - Remove separate backend

2. **Update environment variables**
   ```bash
   DATABASE_URI=your_mongodb_uri
   PAYLOAD_SECRET=your_secret
   ```

3. **Deploy to Vercel/Netlify**
   - Single deployment
   - Built-in API routes
   - Automatic scaling

## Benefits:
- ✅ Single deployment
- ✅ No Docker needed
- ✅ Automatic scaling
- ✅ Built-in CDN
- ✅ Easy environment management

## Quick Start:
```bash
# 1. Create new Next.js app
npx create-next-app@latest unified-blog

# 2. Copy your frontend code
# 3. Add Payload CMS as API routes
# 4. Deploy to Vercel
```
