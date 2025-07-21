# Troubleshooting Guide

This guide helps diagnose and resolve common issues with the Hawaii Business Growth Calculator.

## Table of Contents

1. [Quick Diagnostics](#quick-diagnostics)
2. [Common Issues](#common-issues)
3. [Development Issues](#development-issues)
4. [Production Issues](#production-issues)
5. [HubSpot Integration Issues](#hubspot-integration-issues)
6. [API Issues](#api-issues)
7. [Form & Validation Issues](#form--validation-issues)
8. [Performance Issues](#performance-issues)
9. [Deployment Issues](#deployment-issues)
10. [Debug Tools](#debug-tools)

## Quick Diagnostics

### Health Check Endpoints

Test these endpoints to quickly diagnose issues:

```bash
# Check if deployment is working
curl https://hawaii-growth-calculator.vercel.app/api/verify

# Test basic API functionality
curl https://hawaii-growth-calculator.vercel.app/api/test

# Test HubSpot connection
curl https://hawaii-growth-calculator.vercel.app/api/test-hubspot
```

### Environment Check

```bash
# Local environment
npm run env:check

# Production (via Vercel dashboard)
# Settings → Environment Variables → Check all are set
```

## Common Issues

### Issue: Calculator Not Loading

**Symptoms:**
- Blank page
- Loading spinner stuck
- Console errors

**Solutions:**

1. **Check browser console**
   ```
   F12 → Console tab → Look for red errors
   ```

2. **Clear browser cache**
   - Chrome: Cmd/Ctrl + Shift + R
   - Safari: Cmd + Option + R

3. **Check network tab**
   - F12 → Network → Reload page
   - Look for failed requests (red)

4. **Verify deployment**
   ```bash
   curl https://hawaii-growth-calculator.vercel.app/api/verify
   ```

### Issue: Form Not Submitting

**Symptoms:**
- Submit button not working
- Form validation errors
- No response after submission

**Solutions:**

1. **Check validation errors**
   - Look for red error messages
   - Ensure all required fields filled
   - Check email format is valid

2. **Test API directly**
   ```javascript
   // In browser console
   fetch('/api/calculate', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       // ... your test data
     })
   }).then(r => r.json()).then(console.log)
   ```

3. **Check console for errors**
   - Network errors
   - CORS issues
   - 500 errors

### Issue: Results Not Showing

**Symptoms:**
- Form submits but no results
- Blank results page
- Calculation errors

**Solutions:**

1. **Check API response**
   - F12 → Network → Find 'calculate' request
   - Check response status and body

2. **Verify calculation logic**
   - Test with known values
   - Check for division by zero
   - Validate input ranges

3. **Check state management**
   ```javascript
   // In browser console
   localStorage.getItem('calculator-storage')
   ```

## Development Issues

### Issue: npm install Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

### Issue: TypeScript Errors

**Error:**
```
Type error: Cannot find module '@/components/...'
```

**Solutions:**

1. **Restart TypeScript server**
   - VS Code: Cmd/Ctrl + Shift + P → "Restart TS Server"

2. **Check tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

3. **Clear TypeScript cache**
   ```bash
   rm -rf .next
   npm run build
   ```

### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: Prisma Client Errors

**Error:**
```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Reset database (caution!)
npx prisma db push --force-reset
```

## Production Issues

### Issue: Environment Variables Not Working

**Symptoms:**
- HubSpot integration fails
- API returns 500 errors
- Missing configuration errors

**Solutions:**

1. **Verify in Vercel dashboard**
   - Settings → Environment Variables
   - Check variable names match exactly
   - No quotes around values

2. **Test specific variable**
   ```typescript
   // Add to api/verify/route.ts temporarily
   console.log('HubSpot Token exists:', !!process.env.HUBSPOT_ACCESS_TOKEN);
   ```

3. **Redeploy after changes**
   ```bash
   vercel --prod --force
   ```

### Issue: API Routes Return 404

**Symptoms:**
- `/api/calculate` returns 404
- All API routes fail
- Works locally but not in production

**Solutions:**

1. **Check file structure**
   ```
   app/
   └── api/
       └── calculate/
           └── route.ts  # Must be named 'route.ts'
   ```

2. **Verify exports**
   ```typescript
   // route.ts must export named functions
   export async function POST(request: Request) {
     // ...
   }
   ```

3. **Check vercel.json**
   ```json
   {
     "functions": {
       "app/api/*/route.ts": {
         "maxDuration": 10
       }
     }
   }
   ```

### Issue: CORS Errors

**Error:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Solution:**

Add CORS headers to API routes:

```typescript
// In route.ts
export async function POST(request: Request) {
  // ... handle request

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

## HubSpot Integration Issues

### Issue: Contacts Not Created

**Symptoms:**
- Form submits successfully
- No contact in HubSpot
- No error messages

**Solutions:**

1. **Check API credentials**
   ```bash
   # Test connection
   curl https://hawaii-growth-calculator.vercel.app/api/test-hubspot
   ```

2. **Verify access token**
   - HubSpot → Settings → Private Apps
   - Check token hasn't expired
   - Verify scopes include contacts write

3. **Check for duplicates**
   - HubSpot deduplicates by email
   - Search for email in HubSpot
   - Check "All contacts" not just "My contacts"

4. **Review API logs**
   - Vercel → Functions → Logs
   - Look for HubSpot API errors

### Issue: Custom Properties Not Saving

**Symptoms:**
- Contact created but fields empty
- Some properties work, others don't
- No error but data missing

**Solutions:**

1. **Verify property names**
   ```typescript
   // Property names must match exactly
   const properties = {
     firstname: data.firstName,  // HubSpot uses lowercase
     custom_property: data.value // Must match internal name
   };
   ```

2. **Check property exists**
   - HubSpot → Settings → Properties
   - Verify internal name matches code
   - Check property type matches data

3. **Test with API directly**
   ```bash
   curl -X PATCH \
     https://api.hubapi.com/crm/v3/objects/contacts/{contactId} \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"properties": {"custom_property": "test value"}}'
   ```

### Issue: Rate Limit Errors

**Error:**
```
429 Too Many Requests
```

**Solutions:**

1. **Implement retry logic**
   ```typescript
   async function retryRequest(fn: Function, retries = 3) {
     try {
       return await fn();
     } catch (error) {
       if (retries > 0 && error.status === 429) {
         await new Promise(r => setTimeout(r, 1000));
         return retryRequest(fn, retries - 1);
       }
       throw error;
     }
   }
   ```

2. **Check current usage**
   - HubSpot → Settings → Private Apps → Your App
   - View API call metrics

3. **Optimize requests**
   - Batch operations when possible
   - Cache frequently accessed data
   - Use webhooks instead of polling

## API Issues

### Issue: Timeout Errors

**Error:**
```
504 Gateway Timeout
```

**Solutions:**

1. **Increase function timeout**
   ```json
   // vercel.json
   {
     "functions": {
       "app/api/calculate/route.ts": {
         "maxDuration": 30
       }
     }
   }
   ```

2. **Optimize calculation logic**
   - Move heavy computations to background
   - Cache results when possible
   - Simplify complex calculations

3. **Add progress indication**
   ```typescript
   // Return early with job ID
   return Response.json({ 
     jobId: 'abc123',
     status: 'processing' 
   });
   ```

### Issue: Memory Errors

**Error:**
```
Error: Runtime exited with error: out of memory
```

**Solutions:**

1. **Increase memory limit**
   ```json
   // vercel.json
   {
     "functions": {
       "app/api/calculate/route.ts": {
         "memory": 3008
       }
     }
   }
   ```

2. **Optimize data handling**
   - Stream large responses
   - Paginate results
   - Reduce payload size

## Form & Validation Issues

### Issue: Validation Not Working

**Symptoms:**
- Form submits with invalid data
- Error messages not showing
- Required fields can be skipped

**Solutions:**

1. **Check Zod schemas**
   ```typescript
   // Ensure schema matches form
   const schema = z.object({
     email: z.string().email("Invalid email"),
     phone: z.string().regex(/^\d{10}$/, "Invalid phone")
   });
   ```

2. **Verify form integration**
   ```typescript
   const form = useForm({
     resolver: zodResolver(schema),
     mode: 'onChange' // Show errors immediately
   });
   ```

3. **Test validation**
   ```javascript
   // In console
   const testData = { email: 'invalid' };
   schema.parse(testData); // Should throw
   ```

### Issue: Form State Lost on Refresh

**Symptoms:**
- Progress lost when page refreshes
- Have to start over
- Data not persisting

**Solutions:**

1. **Enable persistence**
   ```typescript
   // Use Zustand persist middleware
   const useStore = create(
     persist(
       (set) => ({
         // ... store config
       }),
       {
         name: 'calculator-storage',
       }
     )
   );
   ```

2. **Save to sessionStorage**
   ```typescript
   // Save on each step
   useEffect(() => {
     sessionStorage.setItem('form-step', currentStep);
     sessionStorage.setItem('form-data', JSON.stringify(data));
   }, [currentStep, data]);
   ```

## Performance Issues

### Issue: Slow Page Load

**Symptoms:**
- Long white screen
- Slow Time to Interactive
- Poor Lighthouse scores

**Solutions:**

1. **Optimize bundle size**
   ```bash
   # Analyze bundle
   npm run build
   npm run analyze
   ```

2. **Lazy load components**
   ```typescript
   const HeavyComponent = dynamic(
     () => import('./HeavyComponent'),
     { ssr: false }
   );
   ```

3. **Optimize images**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/large-image.jpg"
     width={800}
     height={600}
     loading="lazy"
     placeholder="blur"
   />
   ```

### Issue: Slow API Responses

**Symptoms:**
- Long wait for results
- Timeout errors
- Poor user experience

**Solutions:**

1. **Add caching**
   ```typescript
   // Cache calculation results
   const cacheKey = JSON.stringify(data);
   const cached = cache.get(cacheKey);
   if (cached) return cached;
   ```

2. **Optimize database queries**
   ```typescript
   // Use select to limit fields
   const result = await prisma.lead.findMany({
     select: {
       id: true,
       email: true,
       createdAt: true
     }
   });
   ```

3. **Use edge functions**
   ```typescript
   export const runtime = 'edge'; // Faster cold starts
   ```

## Deployment Issues

### Issue: Build Fails on Vercel

**Error:**
```
Error: Command "npm run build" exited with 1
```

**Solutions:**

1. **Check build logs**
   - Vercel dashboard → View build logs
   - Look for specific error

2. **Test locally**
   ```bash
   # Exact same as Vercel
   npm run vercel-build
   ```

3. **Clear cache and retry**
   ```bash
   vercel --prod --force
   ```

4. **Check Node version**
   ```json
   // package.json
   {
     "engines": {
       "node": ">=18.17.0"
     }
   }
   ```

### Issue: Preview Deployments Failing

**Symptoms:**
- PRs not generating previews
- Preview URLs 404
- Different behavior than production

**Solutions:**

1. **Check branch settings**
   - Vercel → Settings → Git
   - Ensure PR previews enabled

2. **Verify environment variables**
   - Set for "Preview" environment
   - May need different values than production

3. **Check git integration**
   - Reconnect GitHub if needed
   - Verify webhook is active

## Debug Tools

### Enable Debug Mode

1. **Set environment variable**
   ```bash
   NEXT_PUBLIC_DEBUG_MODE=true
   ```

2. **Add debug logging**
   ```typescript
   if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
     console.log('Debug:', data);
   }
   ```

### Browser DevTools

1. **Console** - JavaScript errors
2. **Network** - API requests/responses  
3. **Application** - LocalStorage, cookies
4. **Performance** - Profiling
5. **React DevTools** - Component state

### Vercel Logs

```bash
# View function logs
vercel logs

# Filter by function
vercel logs --filter calculate

# Follow logs
vercel logs --follow
```

### Testing Tools

1. **Postman** - API testing
2. **Lighthouse** - Performance audit
3. **React Testing Library** - Component tests
4. **Playwright** - E2E tests

## Getting Help

If issues persist:

1. **Check existing issues**
   - [GitHub Issues](https://github.com/rprovine/hawaii-growth-calculator/issues)

2. **Create detailed bug report**
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Console errors
   - Network requests

3. **Contact support**
   - Technical: dev-support@lenilani.com
   - HubSpot: [Developer Forum](https://community.hubspot.com/t5/Developers/ct-p/developers)
   - Vercel: [Support](https://vercel.com/support)

## Prevention Tips

1. **Always test locally first**
2. **Use TypeScript for type safety**
3. **Write tests for critical paths**
4. **Monitor error logs regularly**
5. **Keep dependencies updated**
6. **Document any workarounds**
7. **Use preview deployments**
8. **Set up error alerting**