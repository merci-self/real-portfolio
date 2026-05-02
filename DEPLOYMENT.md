# Portfolio Deployment Guide

## Local Development Access

### Problem: Site can't be reached externally
**Solution**: The server is now configured to bind to all interfaces (0.0.0.0) for external access.

### Access URLs:
- **Local**: http://localhost:5000
- **Network**: http://[YOUR-LOCAL-IP]:5000
- **External**: http://0.0.0.0:5000

### Find Your Local IP:
```bash
# Windows
ipconfig

# Mac/Linux  
ifconfig | grep "inet "

# Or visit: https://whatismyip.com/
```

### Start Server:
```bash
npm run dev
```

## Production Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Your site will be available at: https://your-portfolio.vercel.app
```

### Option 2: Netlify
```bash
# Build and deploy
npm run build
npx netlify deploy --prod --dir=public

# Your site will be available at: https://your-portfolio.netlify.app
```

### Option 3: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway deploy

# Your site will be available at: https://your-portfolio.up.railway.app
```

### Option 4: DigitalOcean
```bash
# Create droplet and deploy
# Configure nginx proxy
# Your site will be available at: https://your-domain.com
```

## Environment Variables
Set these in your hosting platform:
- `DB_HOST` - Database host
- `DB_USER` - Database user  
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `PORT` - Server port (usually 3000 for hosting)

## Database Setup
For production, you'll need:
1. **MySQL Database** (or PostgreSQL)
2. **Environment Variables** configured
3. **Run seed script** once deployed

## Quick Deploy Commands
```bash
# For testing locally with external access
npm run dev

# Check server status
curl http://localhost:5000/api/health

# Test API endpoints
curl http://localhost:5000/api/portfolio/personal-info
```

## Troubleshooting
- **Firewall**: Allow port 5000 through firewall
- **Antivirus**: Add exception for Node.js
- **Network**: Check if port 5000 is blocked
- **Database**: Ensure MySQL is running and accessible
