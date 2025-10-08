# Rengin Tech Agency Website

## Overview

A full-stack digital marketing agency website for Rengin Tech, showcasing their services, portfolio, and client testimonials. The application features a modern, dark-themed design with smooth animations and a complete admin dashboard for content management. Built with React, Express, and PostgreSQL, it provides both a public-facing marketing site and administrative tools for managing clients, reviews, and booking inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)
- File structure separates pages (`client/src/pages/`), reusable components (`client/src/components/`), and UI primitives (`client/src/components/ui/`)

**UI Component System**
- Radix UI primitives (@radix-ui/*) provide accessible, unstyled base components
- shadcn/ui design system with customized theme configuration (components.json defines style as "new-york")
- Tailwind CSS for utility-first styling with extensive custom color palette defined in tailwind.config.ts
- Design follows a dark-mode-first approach with electric blue/cyan accents per design_guidelines.md
- Framer Motion for declarative animations throughout the site

**State Management & Data Fetching**
- TanStack Query (React Query) handles all server state with automatic caching and refetching
- Custom query client configuration in `client/src/lib/queryClient.ts` with infinite stale time
- Local storage for simple admin authentication state
- React hooks for component-level state (useState, useEffect)

**Form Handling**
- React Hook Form with Zod resolvers for type-safe form validation
- Form schemas mirror database schemas from shared/schema.ts

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with ESM modules
- TypeScript for type safety across the entire stack
- Development uses tsx for running TypeScript directly; production builds with esbuild

**API Design**
- RESTful API endpoints under `/api` prefix
- Routes defined in `server/routes.ts` handle CRUD operations for clients, reviews, and bookings
- Simple password-based admin authentication (hardcoded for now - production should use hashed passwords in database)
- Error handling middleware catches and formats errors consistently

**Data Layer**
- Drizzle ORM for type-safe database queries
- Schema definitions in `shared/schema.ts` shared between client and server
- In-memory storage implementation (`server/storage.ts`) provides interface that can be swapped for database implementation
- PostgreSQL dialect configured but can work with any Drizzle-supported database

**Build & Deployment**
- Development: Vite dev server proxies API requests to Express backend
- Production: Express serves static Vite build from `dist/public`
- Single server handles both API routes and static file serving
- Custom Vite setup in `server/vite.ts` for HMR and SSR-like template rendering

### Data Storage Solutions

**Database Schema**
- Four main tables: admins, clients, reviews, bookings
- All tables use UUID primary keys generated via `gen_random_uuid()`
- PostgreSQL-specific features (via @neondatabase/serverless for connection pooling)
- Drizzle Kit manages migrations in `migrations/` directory

**Key Entities**
- **Admins**: Username/password authentication (needs proper hashing)
- **Clients**: Portfolio entries with name, category, description, optional logo URL
- **Reviews**: Customer testimonials with approval workflow (approved boolean flag)
- **Bookings**: Service inquiry form submissions with contact details and message

**Schema Validation**
- Zod schemas (createInsertSchema from drizzle-zod) provide runtime validation
- Shared between frontend forms and backend API validation
- Omits auto-generated fields (id, createdAt) from insert schemas

### Authentication & Authorization

**Current Implementation**
- Basic password check against hardcoded value in `/api/admin/login` endpoint
- localStorage flag (`adminAuth`) tracks login state on client
- useEffect guards in AdminDashboard check for auth flag and redirect if missing

**Security Considerations**
- No session management or JWT tokens currently
- No password hashing (plaintext comparison)
- No CSRF protection
- Production needs: bcrypt for password hashing, proper session management (connect-pg-simple is installed for session store), HTTP-only cookies

### External Dependencies

**Third-Party Services**
- Neon Database (serverless PostgreSQL hosting) via @neondatabase/serverless
- WebSocket support for database connections (ws package)
- Google Fonts CDN for Inter and Space Grotesk typography

**Key NPM Packages**
- **UI/Components**: All @radix-ui packages, framer-motion, cmdk, class-variance-authority, clsx, tailwind-merge
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-kit
- **Date Handling**: date-fns
- **Development**: Replit-specific plugins for vite (@replit/vite-plugin-*) provide enhanced dev experience

**Build Dependencies**
- TypeScript for type checking (noEmit mode in development)
- PostCSS with Tailwind and Autoprefixer for CSS processing
- esbuild for fast production server bundling