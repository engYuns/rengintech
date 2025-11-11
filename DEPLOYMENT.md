# Rengin Tech Agency - Deployment Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (optional, uses file storage without it)

### Local Setup

1. **Clone and Install**
```bash
git clone https://github.com/engYuns/rengintech.git
cd rengintech/CaseStudyGuru-3
npm install
```

2. **Configure Environment**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings
# For local development without PostgreSQL, you can skip DATABASE_URL
```

3. **Setup Database (Optional)**
```bash
# If using PostgreSQL, push the schema
npm run db:push
```

4. **Run Development Server**
```bash
npm run dev
```

The app will run on `http://localhost:5000`

---

## 🗄️ Database Setup Options

### Option 1: PostgreSQL (Recommended for Production)

The app automatically uses PostgreSQL if `DATABASE_URL` is set.

**Local PostgreSQL:**
```bash
# Install PostgreSQL, then create database
createdb rengintech

# Set in .env
DATABASE_URL=postgresql://username:password@localhost:5432/rengintech

# Push schema
npm run db:push
```

### Option 2: File Storage (Quick Start)

Without `DATABASE_URL`, the app uses `data/storage.json` for storage.
- ✅ Easy setup
- ✅ No database needed
- ⚠️ Not recommended for high-traffic sites

---

## 🌐 Hosting Options

### Option 1: Render.com (Easiest - Recommended)

**Best for:** Full-stack apps with database

1. **Create Account**: Go to [render.com](https://render.com)

2. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `rengintech-db`
   - Plan: Free or Starter
   - Copy the "Internal Database URL"

3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `engYuns/rengintech`
   - Settings:
     - **Name**: rengintech
     - **Root Directory**: `CaseStudyGuru-3`
     - **Build Command**: `npm install && npm run build && npm run db:push`
     - **Start Command**: `npm start`
     - **Plan**: Free or Starter

4. **Environment Variables**:
   ```
   DATABASE_URL=<paste-internal-database-url-from-step-2>
   SESSION_SECRET=<generate-random-string>
   NODE_ENV=production
   ```

5. **Deploy**: Click "Create Web Service" - Done! 🎉

**File Uploads**: Create a disk at `/uploads` in Render (Settings → Disks)

---

### Option 2: Railway.app (Similar to Render)

**Best for:** Quick deployments with database

1. **Create Account**: [railway.app](https://railway.app)

2. **New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `engYuns/rengintech`

3. **Add PostgreSQL**:
   - In project, click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-sets `DATABASE_URL`

4. **Configure Service**:
   - Select your service
   - Settings → Root Directory: `CaseStudyGuru-3`
   - Add environment variables:
     ```
     SESSION_SECRET=your-secret-key
     NODE_ENV=production
     ```

5. **Build Settings**:
   - Build Command: `npm install && npm run build && npm run db:push`
   - Start Command: `npm start`

6. **Deploy**: Automatic! Railway deploys on push 🚀

---

### Option 3: Vercel (Frontend-focused)

**Note**: Vercel is optimized for frontend. You'll need external database.

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd CaseStudyGuru-3
vercel
```

3. **Setup Database**: Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for PostgreSQL

4. **Set Environment Variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

⚠️ **File uploads won't persist** on Vercel. Use S3 or Cloudinary for images.

---

### Option 4: Heroku

1. **Install Heroku CLI**: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. **Create App**:
```bash
cd CaseStudyGuru-3
heroku create rengintech
```

3. **Add PostgreSQL**:
```bash
heroku addons:create heroku-postgresql:essential-0
```

4. **Set Environment Variables**:
```bash
heroku config:set SESSION_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

5. **Deploy**:
```bash
git subtree push --prefix CaseStudyGuru-3 heroku main
# or if that fails:
git push heroku `git subtree split --prefix CaseStudyGuru-3 main`:main --force
```

6. **Push Database Schema**:
```bash
heroku run npm run db:push
```

---

### Option 5: DigitalOcean App Platform

1. **Create Account**: [cloud.digitalocean.com](https://cloud.digitalocean.com)

2. **Create App**:
   - Apps → Create App → GitHub
   - Select `engYuns/rengintech`
   - Source Directory: `CaseStudyGuru-3`

3. **Add Database**:
   - Add Resource → Database → PostgreSQL

4. **Configure Build**:
   - Build Command: `npm install && npm run build && npm run db:push`
   - Run Command: `npm start`

5. **Environment Variables**:
   - `DATABASE_URL` (auto-set)
   - `SESSION_SECRET`
   - `NODE_ENV=production`

---

## 🔐 Security Checklist

Before deploying:

- [ ] Change admin password in `server/routes.ts` (line 50)
- [ ] Set strong `SESSION_SECRET` in environment variables
- [ ] Enable HTTPS (most platforms auto-enable)
- [ ] Review CORS settings if needed
- [ ] Set up database backups

---

## 📦 File Upload Configuration

### For Render/Railway/Heroku:
- Create persistent disk/volume at `/uploads`

### For Vercel/Serverless:
- Use external storage: [Cloudinary](https://cloudinary.com) or [AWS S3](https://aws.amazon.com/s3/)

---

## 🔧 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Optional | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Recommended | Secret key for sessions | Random 32+ character string |
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Auto-set | Server port | `5000` (auto on most platforms) |

---

## 📱 Admin Access

After deployment:
- Login: `https://your-domain.com/admin`
- Password: `rengin@luna3234!$` (Change this!)
- Dashboard: Manage clients, reviews, bookings

---

## 🛠️ Troubleshooting

### Database Connection Errors
```bash
# Verify DATABASE_URL format
echo $DATABASE_URL

# Test connection
npm run db:push
```

### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Issues
Most platforms set `PORT` automatically. If manual:
```bash
export PORT=5000
npm start
```

---

## 📚 Additional Resources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

---

## 🎉 Recommended Setup for Beginners

**Easiest Path**:
1. Use **Render.com** (free tier available)
2. Add PostgreSQL database
3. Connect GitHub repo
4. Set environment variables
5. Deploy! ✨

**Total time**: ~15 minutes

---

Need help? Open an issue on GitHub! 🚀
