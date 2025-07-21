# Environment Variables Documentation

This guide provides detailed information about all environment variables used in the Hawaii Business Growth Calculator.

## Quick Start

Copy the example file and configure:
```bash
cp .env.example .env.local
```

## Required Variables

### HubSpot Integration

#### `HUBSPOT_ACCESS_TOKEN`
- **Type**: String
- **Required**: Yes
- **Format**: `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Description**: Private app access token from HubSpot
- **How to get**: 
  1. Go to Settings → Integrations → Private Apps
  2. Create a new private app
  3. Copy the access token after creation
- **Example**: `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

#### `HUBSPOT_PORTAL_ID`
- **Type**: String
- **Required**: Yes (if using form submission)
- **Format**: Numeric string
- **Description**: Your HubSpot account/portal ID
- **How to get**: Found in your HubSpot account settings
- **Example**: `242173134`

### Site Configuration

#### `NEXT_PUBLIC_SITE_URL`
- **Type**: String
- **Required**: Yes
- **Format**: Full URL including protocol
- **Description**: The full URL where your calculator is hosted
- **Used for**: Generating absolute URLs, social sharing, emails
- **Example**: `https://calculator.lenilani.com`
- **Note**: No trailing slash

#### `NEXT_PUBLIC_SITE_NAME`
- **Type**: String
- **Required**: No
- **Default**: `Hawaii Business Growth Calculator`
- **Description**: Display name for the calculator
- **Used for**: Page titles, emails, meta tags
- **Example**: `Hawaii Business Growth Calculator`

### Contact Information

#### `NEXT_PUBLIC_PHONE`
- **Type**: String
- **Required**: No
- **Default**: `808-555-0123`
- **Format**: Any phone format
- **Description**: Contact phone number displayed on site
- **Example**: `815-641-6689`

#### `NEXT_PUBLIC_EMAIL`
- **Type**: String
- **Required**: No
- **Default**: `info@example.com`
- **Format**: Valid email address
- **Description**: Contact email displayed on site
- **Example**: `info@lenilani.com`

## Optional Variables

### Database Configuration

#### `DATABASE_URL`
- **Type**: String
- **Required**: No (only if using database backup)
- **Format**: PostgreSQL connection string
- **Description**: Database connection for lead backup
- **Examples**:
  - PostgreSQL: `postgresql://user:password@localhost:5432/hawaii_growth?schema=public`
  - PostgreSQL with SSL: `postgresql://user:password@host:5432/db?sslmode=require`
  - SQLite (dev): `file:./dev.db`
- **Note**: If not provided, leads only go to HubSpot

### Email Notifications

#### `SMTP_HOST`
- **Type**: String
- **Required**: No
- **Description**: SMTP server hostname
- **Examples**: 
  - Gmail: `smtp.gmail.com`
  - SendGrid: `smtp.sendgrid.net`
  - AWS SES: `email-smtp.us-east-1.amazonaws.com`

#### `SMTP_PORT`
- **Type**: String
- **Required**: No
- **Default**: `587`
- **Description**: SMTP server port
- **Common values**:
  - `587` - TLS (recommended)
  - `465` - SSL
  - `25` - Unencrypted (not recommended)

#### `SMTP_USER`
- **Type**: String
- **Required**: No
- **Description**: SMTP authentication username
- **Example**: `your-email@gmail.com`

#### `SMTP_PASS`
- **Type**: String
- **Required**: No
- **Description**: SMTP authentication password
- **Note**: For Gmail, use app-specific password, not regular password

#### `EMAIL_FROM`
- **Type**: String
- **Required**: No
- **Default**: `noreply@example.com`
- **Description**: From address for notification emails
- **Example**: `calculator@lenilani.com`

#### `EMAIL_TO`
- **Type**: String
- **Required**: No
- **Description**: Email address to receive notifications
- **Example**: `sales@lenilani.com`
- **Note**: Can be comma-separated for multiple recipients

### Feature Flags

#### `NEXT_PUBLIC_ENABLE_EMAIL`
- **Type**: String
- **Required**: No
- **Default**: `true`
- **Values**: `true` | `false`
- **Description**: Enable/disable email notifications
- **Note**: Useful for testing without sending emails

#### `NEXT_PUBLIC_ENABLE_ADMIN`
- **Type**: String
- **Required**: No
- **Default**: `false`
- **Values**: `true` | `false`
- **Description**: Enable/disable admin dashboard
- **Warning**: Only enable in production with proper authentication

#### `NEXT_PUBLIC_DEBUG_MODE`
- **Type**: String
- **Required**: No
- **Default**: `false`
- **Values**: `true` | `false`
- **Description**: Enable debug logging and verbose errors
- **Warning**: Never enable in production

### HubSpot Form Submission (Alternative)

#### `HUBSPOT_FORM_GUID`
- **Type**: String
- **Required**: No (only if not using API)
- **Format**: UUID
- **Description**: HubSpot form ID for fallback submission
- **Example**: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`

### Advanced Configuration

#### `HUBSPOT_MARKETING_LIST_ID`
- **Type**: String
- **Required**: No
- **Format**: Numeric string
- **Description**: HubSpot list ID for marketing consent
- **Example**: `123`

#### `NODE_ENV`
- **Type**: String
- **Required**: No
- **Default**: Automatically set by Next.js
- **Values**: `development` | `production` | `test`
- **Description**: Current environment
- **Note**: Usually set automatically, don't override

## Environment-Specific Configuration

### Development (.env.local)

```env
# Minimal configuration for local development
HUBSPOT_ACCESS_TOKEN="your-sandbox-token"
HUBSPOT_PORTAL_ID="sandbox-portal-id"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_DEBUG_MODE="true"
```

### Staging (.env.staging)

```env
# Staging environment with test services
HUBSPOT_ACCESS_TOKEN="staging-token"
HUBSPOT_PORTAL_ID="staging-portal"
NEXT_PUBLIC_SITE_URL="https://staging.calculator.lenilani.com"
DATABASE_URL="postgresql://user:pass@staging-db:5432/hawaii_growth"
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="staging-user"
SMTP_PASS="staging-pass"
```

### Production (.env.production)

```env
# Production configuration
HUBSPOT_ACCESS_TOKEN="production-token"
HUBSPOT_PORTAL_ID="production-portal"
NEXT_PUBLIC_SITE_URL="https://calculator.lenilani.com"
DATABASE_URL="postgresql://user:pass@prod-db:5432/hawaii_growth?sslmode=require"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="sendgrid-api-key"
EMAIL_FROM="noreply@lenilani.com"
EMAIL_TO="sales@lenilani.com"
NEXT_PUBLIC_ENABLE_EMAIL="true"
NEXT_PUBLIC_DEBUG_MODE="false"
```

## Platform-Specific Notes

### Vercel

- Add variables in Project Settings → Environment Variables
- Variables are encrypted at rest
- Can set different values per environment (Production, Preview, Development)
- Changes require redeployment

### Railway

- Add via CLI: `railway variables set KEY=value`
- Or use web UI: Variables tab in project
- Automatically injected at runtime
- Supports variable references: `${{SHARED_SECRET}}`

### Docker

Pass via docker run:
```bash
docker run -e HUBSPOT_ACCESS_TOKEN=token -e HUBSPOT_PORTAL_ID=id app
```

Or use env file:
```bash
docker run --env-file .env.production app
```

### Traditional Hosting

- Use `.env.local` file in project root
- Or export in shell: `export HUBSPOT_ACCESS_TOKEN=token`
- Or set in PM2 ecosystem file

## Security Best Practices

1. **Never commit .env files**
   - Add to `.gitignore`
   - Use `.env.example` for documentation

2. **Use different values per environment**
   - Separate tokens for dev/staging/prod
   - Different email addresses
   - Sandbox accounts for testing

3. **Rotate secrets regularly**
   - Update tokens every 90 days
   - Use strong passwords
   - Monitor for unauthorized usage

4. **Limit token permissions**
   - Only grant required HubSpot scopes
   - Use read-only where possible
   - Separate tokens for different features

5. **Secure storage**
   - Use platform secret management
   - Encrypt sensitive values
   - Audit access logs

## Troubleshooting

### Variable not loading

1. Check exact spelling (case-sensitive)
2. Restart development server after changes
3. Verify file is named `.env.local` not `.env`
4. Check for quotes around values
5. Look for trailing spaces

### HubSpot token invalid

1. Verify token hasn't expired
2. Check token has required scopes
3. Ensure using private app token, not API key
4. Verify portal ID matches token

### Email not sending

1. Check SMTP credentials
2. Verify port is correct
3. Enable "less secure apps" if using Gmail
4. Check firewall rules
5. Test with tool like `swaks`

### Database connection failed

1. Check connection string format
2. Verify database is accessible
3. Check SSL requirements
4. Test with `psql` or database client
5. Verify credentials are correct

## Getting Help

- Review example file: `.env.example`
- Check deployment docs: `docs/DEPLOYMENT.md`
- GitHub issues: [Report problems](https://github.com/rprovine/hawaii-growth-calculator/issues)
- Email support: info@lenilani.com