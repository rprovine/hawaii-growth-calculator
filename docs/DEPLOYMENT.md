# Deployment Guide

This guide covers how to deploy the Hawaii Business Growth Calculator to production using Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Deployment](#initial-deployment)
3. [Environment Variables](#environment-variables)
4. [Vercel Configuration](#vercel-configuration)
5. [Deployment Process](#deployment-process)
6. [Custom Domains](#custom-domains)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- A [Vercel account](https://vercel.com/signup)
- A [GitHub account](https://github.com) with access to the repository
- HubSpot API credentials (see [HubSpot Integration Guide](./HUBSPOT.md))
- Node.js 18.17.0 or later installed locally

## Initial Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Log in to Vercel**
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `rprovine/hawaii-growth-calculator`

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave empty)
   - Build Command: `npm run vercel-build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Set Environment Variables** (see [Environment Variables](#environment-variables) section)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd hawaii-growth-calculator
   vercel --prod
   ```

4. **Follow prompts**
   - Link to existing project or create new
   - Confirm settings
   - Set environment variables when prompted

## Environment Variables

### Required Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
# HubSpot Integration (REQUIRED)
HUBSPOT_ACCESS_TOKEN=your-hubspot-private-app-token
HUBSPOT_PORTAL_ID=your-hubspot-portal-id

# Optional: HubSpot Form Submission (if not using API)
HUBSPOT_FORM_GUID=your-form-guid

# Optional: Email Notifications
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@lenilani.com
EMAIL_TO=sales@lenilani.com
```

### Environment Variable Scopes

- **Production**: Applied to production deployments
- **Preview**: Applied to preview deployments (pull requests)
- **Development**: Applied to development deployments

Typically, use the same HubSpot credentials for all environments.

## Vercel Configuration

### vercel.json

The project includes a `vercel.json` configuration file:

```json
{
  "name": "hawaii-growth-calculator",
  "framework": "nextjs",
  "buildCommand": "npm run vercel-build",
  "outputDirectory": ".next",
  "installCommand": "npm install --production=false",
  "rootDirectory": "./",
  "env": {
    "NEXT_PUBLIC_SITE_NAME": "Hawaii Business Growth Calculator",
    "NEXT_PUBLIC_PHONE": "815-641-6689",
    "NEXT_PUBLIC_EMAIL": "info@lenilani.com"
  },
  "functions": {
    "app/api/calculate/route.ts": {
      "maxDuration": 10
    }
  }
}
```

### Build Settings

- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run vercel-build` (runs Prisma generate + Next.js build)
- **Install Command**: `npm install --production=false` (includes devDependencies)
- **Node Version**: 18.x or later

## Deployment Process

### Automatic Deployments

Vercel automatically deploys:

1. **Production**: When pushing to `main` branch
2. **Preview**: When creating pull requests
3. **Branch Deployments**: When pushing to other branches

### Manual Deployments

#### Via Dashboard
1. Go to your project in Vercel
2. Click "Deployments" tab
3. Click "Redeploy" on any deployment
4. Select "Use existing Build Cache" for faster deploys

#### Via CLI
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Force new deployment (no cache)
vercel --prod --force
```

### Deployment Workflow

1. **Code Push** → GitHub
2. **Webhook Trigger** → Vercel receives notification
3. **Build Process**:
   - Install dependencies
   - Generate Prisma client
   - Build Next.js application
   - Run type checking
   - Optimize assets
4. **Deployment** → Upload to Vercel edge network
5. **Domain Update** → Routes traffic to new deployment

## Custom Domains

### Adding a Custom Domain

1. **In Vercel Dashboard**:
   - Go to Settings → Domains
   - Add your domain (e.g., `calculator.lenilani.com`)

2. **DNS Configuration**:
   - **Option A - Nameservers**: Point domain to Vercel nameservers
   - **Option B - CNAME**: Add CNAME record pointing to `cname.vercel-dns.com`
   - **Option C - A Record**: Point to Vercel's IP addresses

3. **SSL Certificate**: Automatically provisioned by Vercel

### Default Domain

Your project is always accessible at:
- `https://hawaii-growth-calculator.vercel.app`

## Monitoring & Maintenance

### Deployment Status

Check deployment status:
- **Dashboard**: https://vercel.com/dashboard
- **CLI**: `vercel ls`

### Logs

View application logs:
- **Dashboard**: Project → Functions → Logs
- **CLI**: `vercel logs`

### Analytics

Monitor performance:
- **Web Vitals**: Automatically tracked
- **Custom Events**: Implement with Vercel Analytics

### Health Checks

Test endpoints:
- `/api/verify` - Verify deployment
- `/api/test` - Test basic functionality
- `/api/test-hubspot` - Test HubSpot connection

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Build fails with module errors
```
Module not found: Can't resolve '@/components/...'
```

**Solution**: 
- Check import paths are correct
- Ensure all files are committed to Git
- Clear build cache: `vercel --prod --force`

#### 2. Environment Variables Not Working

**Problem**: HubSpot integration failing in production

**Solution**:
- Verify variables in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding variables
- Test with `/api/test-hubspot` endpoint

#### 3. 404 Errors on API Routes

**Problem**: API routes return 404

**Solution**:
- Ensure route files follow naming convention: `route.ts`
- Check file location: `app/api/[endpoint]/route.ts`
- Verify exports: `export async function GET/POST/etc`

#### 4. Slow Build Times

**Problem**: Deployments take too long

**Solution**:
- Use build cache (default)
- Optimize dependencies
- Check for large assets in `/public`

### Rollback Deployment

If issues occur:

1. **Via Dashboard**:
   - Go to Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI**:
   ```bash
   vercel rollback
   ```

### Debug Mode

Enable debug logging:

1. Set environment variable:
   ```
   NEXT_PUBLIC_DEBUG_MODE=true
   ```

2. Check browser console and Vercel logs

## Best Practices

1. **Always test locally** before deploying
2. **Use preview deployments** for testing changes
3. **Monitor error logs** after deployment
4. **Keep environment variables** secure and documented
5. **Tag releases** in Git for easy rollbacks
6. **Set up alerts** for failed deployments

## Deployment Checklist

Before each deployment:

- [ ] All tests passing locally
- [ ] Environment variables updated if needed
- [ ] Database migrations run (if applicable)
- [ ] HubSpot webhook URLs updated (if changed)
- [ ] No sensitive data in code
- [ ] Build succeeds locally: `npm run build`
- [ ] Type checking passes: `npm run type-check`

## Support

For deployment issues:
- Check [Vercel Status](https://vercel-status.com)
- Review [Vercel Documentation](https://vercel.com/docs)
- Contact Vercel Support (Pro accounts)

For application issues:
- See [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Check application logs
- Test with `/api/verify` endpoint