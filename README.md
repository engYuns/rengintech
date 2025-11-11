# Rengin Tech Agency Website

A modern, full-stack web application for Rengin Tech creative agency featuring portfolio showcase, client reviews, and service booking system.

## ✨ Features

- 🎨 **Modern UI**: Built with React, Tailwind CSS, and Framer Motion animations
- 📱 **Responsive Design**: Mobile-first approach for all devices
- 🗄️ **Flexible Storage**: PostgreSQL or file-based storage
- 🔐 **Admin Dashboard**: Manage clients, reviews, and bookings
- 📸 **Image Uploads**: Client logo management
- ⭐ **Review System**: User-submitted reviews with approval workflow
- 📞 **Contact Forms**: Service booking with email/phone collection
- 🚀 **Production Ready**: Built for deployment on modern platforms

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- TanStack Query
- Wouter (routing)

**Backend:**
- Node.js + Express
- PostgreSQL + Drizzle ORM
- Multer (file uploads)
- Zod (validation)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server (uses file storage by default)
npm run dev

# Access the app
open http://localhost:5000
```

## 📖 Full Documentation

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete setup and hosting instructions.

## 🗄️ Database Setup

```bash
# Copy environment template
cp .env.example .env

# Add your PostgreSQL connection string to .env
DATABASE_URL=postgresql://user:pass@localhost:5432/rengintech

# Push database schema
npm run db:push

# Run with database
npm run dev
```

## 🌐 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step guides for:
- Render.com (Recommended)
- Railway.app
- Vercel
- Heroku
- DigitalOcean

## 🔑 Admin Access

- **URL**: `/admin`
- **Default Password**: `rengin@luna3234!$`
- ⚠️ **Important**: Change the password in `server/routes.ts` before deploying!

## 📂 Project Structure

```
CaseStudyGuru-3/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   ├── lib/         # Utilities
│   │   └── hooks/       # Custom hooks
├── server/              # Express backend
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Data layer
│   ├── db.ts            # Database config
│   └── index.ts         # Server entry
├── shared/              # Shared types
│   └── schema.ts        # Database schema
└── uploads/             # Uploaded files
```

## 🎯 Available Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Production server
npm run check     # Type checking
npm run db:push   # Push database schema
```

## 🌟 Key Features

### Public Website
- Dynamic hero section with agency stats
- 6 service offerings
- Portfolio/client showcase
- Client review system
- Contact/booking form
- Responsive navigation

### Admin Dashboard
- Client management (add/edit/delete with logo upload)
- Review moderation (approve/reject)
- Booking management (view/mark as read)
- Secure authentication

## 📞 Contact Information

- **Phone**: +964 750 431 3705, +964 751 140 1782
- **Instagram**: [@rengintech]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Design inspired by modern creative agencies
- Built with modern React best practices
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting guides! 🚀
