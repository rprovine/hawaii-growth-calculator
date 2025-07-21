# Render Deployment Guide

This guide will walk you through deploying the Hawaii Business Growth Calculator on Render.

## Prerequisites

- GitHub account with the repository
- Render account (free tier available)
- HubSpot API credentials

## Quick Deploy

### Option 1: One-Click Deploy (Recommended)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/rprovine/hawaii-growth-calculator)

### Option 2: Manual Deployment

## Step-by-Step Manual Deployment

### 1. Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub for easy integration
3. Verify your email address

### 2. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select the `hawaii-growth-calculator` repository
4. Configure the service:

   **Basic Settings:**
   - **Name**: `hawaii-growth-calculator` (or your preferred name)
   - **Region**: Oregon, USA (or closest to your users)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

   **Instance Type:**
   - **Free**: $0/month (512MB RAM, sleeps after inactivity)
   - **Starter**: $7/month (512MB RAM, always on)
   - **Standard**: $25/month (2GB RAM, always on)

### 3. Configure Environment Variables

Click **"Environment"** and add these variables:

#### Required Variables

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `HUBSPOT_ACCESS_TOKEN` | `your-token` | HubSpot private app token |
| `HUBSPOT_PORTAL_ID` | `your-portal-id` | HubSpot portal ID |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.onrender.com` | Your Render URL |
| `NEXT_PUBLIC_PHONE` | `815-641-6689` | Contact phone |
| `NEXT_PUBLIC_EMAIL` | `info@lenilani.com` | Contact email |

#### Optional Variables

| Key | Value | Description |
|-----|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | If using PostgreSQL |
| `SMTP_HOST` | `smtp.gmail.com` | Email server |
| `SMTP_PORT` | `587` | Email port |
| `SMTP_USER` | `your-email` | Email username |
| `SMTP_PASS` | `your-password` | Email password |
| `EMAIL_FROM` | `noreply@lenilani.com` | From address |
| `EMAIL_TO` | `sales@lenilani.com` | Notification recipient |

### 4. Advanced Settings

1. **Health Check Path**: `/api/test`
2. **Auto-Deploy**: Yes (deploys on git push)
3. **Build Filters**: 
   - Paths: `/**` (all paths)
   - Ignored Paths: `docs/**`, `*.md`

### 5. Deploy

1. Click **"Create Web Service"**
2. Wait for the build to complete (5-10 minutes)
3. Your app will be available at: `https://[your-app-name].onrender.com`

## Adding a PostgreSQL Database (Optional)

If you want to use database backup for leads:

### 1. Create Database

1. Click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `hawaii-growth-db`
   - **Database**: `hawaii_growth`
   - **User**: (auto-generated)
   - **Region**: Same as your web service
   - **PostgreSQL Version**: 15
   - **Plan**: Free (256MB storage)

### 2. Connect to Web Service

1. Copy the **Internal Database URL** from the database dashboard
2. Go to your web service → **Environment**
3. Add: `DATABASE_URL` = `[internal database URL]`
4. Redeploy the service

### 3. Initialize Database

After deployment, run migrations:

1. Go to web service → **Shell** tab
2. Run:
   ```bash
   npx prisma migrate deploy
   ```

## Custom Domain Setup

### 1. Add Custom Domain

1. Go to your web service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain: `calculator.yourdomain.com`

### 2. Configure DNS

Add a CNAME record to your DNS provider:

```
Type: CNAME
Name: calculator
Value: [your-app].onrender.com
TTL: 300
```

### 3. SSL Certificate

- Render automatically provisions SSL certificates
- Wait 10-30 minutes for DNS propagation
- Your site will be available at `https://calculator.yourdomain.com`

## Monitoring and Logs

### View Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. Filter by:
   - Time range
   - Log level
   - Search terms

### Metrics

Free tier includes basic metrics:
- Request count
- Response time
- Memory usage
- CPU usage

### Alerts

Set up alerts for:
- Service downtime
- High response time
- Deploy failures

## Troubleshooting

### Build Failures

**"Module not found" errors:**
```bash
# Check package.json has all dependencies
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

**"Cannot find module 'prisma'" error:**
```bash
# Ensure prisma is in dependencies, not devDependencies
npm install prisma @prisma/client
```

### Runtime Errors

**"Application failed to respond":**
- Check logs for startup errors
- Verify PORT environment variable usage
- Ensure `npm start` runs `next start`

**"Database connection failed":**
- Verify DATABASE_URL is set correctly
- Check database is in same region
- Ensure connection pooling is configured

### Performance Issues

**Slow cold starts (free tier):**
- Normal for free tier (service sleeps after 15 mins)
- Upgrade to Starter plan for always-on service
- Implement warming endpoint

**High memory usage:**
```javascript
// Add to next.config.ts
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
```

## Render-Specific Optimizations

### 1. Dockerfile (Optional)

For better control, create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Build Optimizations

Add to `next.config.ts`:

```typescript
module.exports = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}
```

### 3. Environment-Specific Config

```typescript
// lib/config.ts
export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  isRender: process.env.RENDER === 'true',
  url: process.env.RENDER 
    ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`
    : process.env.NEXT_PUBLIC_SITE_URL
}
```

## Costs

### Free Tier Limitations
- 750 hours/month (sleeps after 15 mins inactivity)
- 512MB RAM
- 10GB bandwidth
- Shared CPU
- No custom domains on free PostgreSQL

### Recommended Setup for Production
- **Web Service**: Starter ($7/month)
- **PostgreSQL**: Starter ($7/month)
- **Total**: $14/month

## Render vs Other Platforms

### Advantages
- Simple deployment process
- Free tier available
- Automatic SSL
- Built-in PostgreSQL
- GitHub integration
- Automatic deploys

### Disadvantages
- Free tier has cold starts
- Limited regions
- No edge functions
- Basic analytics only

## Support Resources

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Render Status**: https://status.render.com
- **Project Issues**: https://github.com/rprovine/hawaii-growth-calculator/issues

## Next Steps

1. Monitor your deployment for the first 24 hours
2. Set up alerts for downtime
3. Configure custom domain
4. Test all features in production
5. Set up backup strategy for database (if used)