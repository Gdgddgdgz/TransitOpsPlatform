# TransitOps Platform

TransitOps Platform is a role-based transportation operations management application designed for fleet management, driver coordination, safety compliance, and financial oversight. The project is split into a modern Next.js frontend and a Node.js/Express backend with Prisma and PostgreSQL support.

This repository provides a complete full-stack starter for managing transport operations with role-specific dashboards, mock and real-style data workflows, and an extensible modular architecture.

## Overview

TransitOps brings together the following business areas:

- Fleet management and vehicle operations
- Driver trip tracking and dispatch workflows
- Safety officer compliance monitoring
- Financial analysis for expenses, fuel costs, and reporting
- Role-based workspaces for different users and responsibilities

The application is organized so each role has its own dashboard and feature area, making it easier to extend the platform for real production use.

## Key Features

### Frontend
- Role-based workspaces for:
  - Fleet Manager
  - Driver
  - Safety Officer
  - Financial Analyst
  - Admin
- Modern responsive UI built with Next.js and Tailwind CSS
- Modular feature-first structure
- Mock data-driven dashboard views for demonstration and prototype development
- Authentication-ready integration with Clerk

### Backend
- Express.js REST API architecture
- Prisma ORM for database access
- PostgreSQL-ready configuration
- Role-aware route structure
- Organized controllers, services, middleware, and routes for maintainability

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Clerk authentication
- Lucide icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Clerk middleware
- dotenv

## Project Structure

```text
backend/
  prisma/
  src/
    controllers/
    middleware/
    routes/
    service/
    utils/
    server.js

client/
  app/
  features/
  lib/
  public/
```

## Prerequisites

Before running the project locally, make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm
- PostgreSQL database
- Git

## Environment Setup

### Backend
Create a `.env` file inside the `backend` folder with values similar to the following:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/transitops
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Frontend
Create a `.env.local` file inside the `client` folder with values such as:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Gdgddgdgz/TransitOpsPlatform.git
cd TransitOpsPlatform
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Set up the database

If Prisma is configured for your database, run:

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Install frontend dependencies

```bash
cd ../client
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

- http://localhost:5000

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will run on:

- http://localhost:3000

## Role-Based Workspaces

The frontend includes dedicated workspaces for the following roles:

- Admin
- Fleet Manager
- Driver
- Safety Officer
- Financial Analyst

Each workspace is built as a self-contained section with its own navigation and feature pages.

## API Structure

The backend exposes REST endpoints under the `/api/v1` namespace, grouped by role and feature area. Common route groups include:

- `/api/v1/admin`
- `/api/v1/fleet`
- `/api/v1/driver`
- `/api/v1/safety`
- `/api/v1/financial`
- `/api/v1/me`

## Development Notes

- The frontend currently includes mock data for demo purposes.
- The backend is structured to support future production integrations such as real authentication, database persistence, and additional business logic.
- Prisma schema updates should be followed by a migration to keep the database in sync.

## Contributing

Contributions are welcome. If you would like to improve the platform:

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

This project is distributed under the ISC license.
