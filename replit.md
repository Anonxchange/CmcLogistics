# Shipment Tracking Website

## Overview

CMC Logistics is a professional logistics and shipment tracking platform that provides comprehensive shipping services including air freight, sea freight, road transportation, and warehousing. The application features a public-facing website for tracking shipments and an admin dashboard for managing shipments and tracking updates. Built with modern web technologies, it offers real-time tracking capabilities and a professional user experience inspired by industry leaders like FedEx, DHL, and UPS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application built with React and TypeScript
- **Routing**: Wouter for client-side routing with main routes: Home (`/`), Admin (`/admin`), and Tracking (`/track`)
- **UI Framework**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following professional logistics industry standards
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Storage Layer**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful API endpoints for admin authentication, shipment management, and tracking
- **Development Setup**: Hot module replacement and development middleware integration

### Database Schema
- **Users Table**: Basic user authentication (currently minimal)
- **Admin Users Table**: Admin authentication with role-based access, email, and account status
- **Shipments Table**: Comprehensive shipment data including sender/recipient information, service types, package details, status tracking, and cost management
- **Tracking Updates Table**: Historical tracking events with status changes, location updates, and descriptions

### Authentication and Authorization
- **Admin Authentication**: Simple username/password authentication for admin users
- **Session Management**: Basic session handling without persistent storage
- **Role-Based Access**: Admin role system with account activation status

### Design System
- **Color Palette**: Professional navy blue primary colors with supporting grays and status colors (green for success, orange for warnings)
- **Typography**: Inter font family with structured weight hierarchy
- **Layout System**: Consistent Tailwind spacing units (4, 6, 8, 12, 16) for professional appearance
- **Component Library**: Comprehensive UI components following logistics industry design patterns

## External Dependencies

### Core Technologies
- **Database**: Configured for PostgreSQL with Drizzle ORM and Neon Database serverless connection
- **Email Service**: SendGrid integration for notifications and communications
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Date Handling**: date-fns for date formatting and manipulation

### Development Tools
- **Database Management**: Drizzle Kit for schema migrations and database operations
- **Session Storage**: Connect-pg-simple for PostgreSQL session store
- **Development Environment**: Replit-specific plugins for development banner and error handling
- **Build Process**: esbuild for server bundling and Vite for client bundling

### Styling and Assets
- **CSS Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts integration (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Asset Management**: Custom asset resolution for generated images and static resources