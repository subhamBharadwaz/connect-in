9# ConnectIn 🚀

A modern social networking platform built with cutting-edge technologies for seamless user connections and content sharing.

![ConnectIn](https://img.shields.io/badge/ConnectIn-Social%20Platform-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## 🌟 Features

- **🔐 Secure Authentication** - Email & password authentication with Better Auth
- **📝 Social Posts** - Create, view, and interact with posts
- **👤 User Profiles** - Personalized user profiles with bio and avatar
- **🎨 Modern UI** - Beautiful, responsive design with shadcn/ui components
- **🌙 Dark/Light Mode** - Theme switching with next-themes
- **📱 Mobile Responsive** - Optimized for all device sizes
- **⚡ Real-time Updates** - WebSocket support for live interactions
- **🔍 Type Safety** - Full TypeScript coverage for better development experience

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Full-stack React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable UI components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching and caching
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Backend
- **[Express.js 5](https://expressjs.com/)** - Fast, unopinionated web framework
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript-first SQL ORM
- **[NeonDB](https://neon.com)** - Robust relational database
- **[Better Auth](https://auth.better-auth.com/)** - Modern authentication solution
- **[Pino](https://getpino.io/)** - High-performance logging

### Development Tools
- **[Turborepo](https://turbo.build/)** - Optimized monorepo build system
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ConnectIn
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env` file in `apps/server/`:
   ```env
   NODE_ENV=development
   PORT=3000
   LOG_LEVEL=info
   CORS_ORIGIN=http://localhost:3001
   BETTER_AUTH_SECRET=your-super-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   DATABASE_URL_POOLER=postgresql://username:password@localhost:5432/connectin (neon)
   DATABASE_URL=postgresql://username:password@localhost:5432/connectin (neon)
   ```

   Create `.env.local` file in `apps/web/`:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate new migration (when schema changes)
   npx drizzle-kit generate
   
   # Push schema changes to database
   npx drizzle-kit push
   
   # (Optional) Open database studio
   pnpm db:studio
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start them separately
   pnpm dev:web    # Frontend on http://localhost:3001
   pnpm dev:server # Backend on http://localhost:3000
   ```

6. **Open your browser**
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Database Studio: [http://localhost:4983](http://localhost:4983) (if running)

## 📁 Project Structure

```
ConnectIn/
├── apps/
│   ├── web/                    # Frontend application (Next.js)
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── features/      # Feature-based modules
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   └── lib/           # Utility functions and configs
│   │   └── package.json
│   └── server/                 # Backend API (Express)
│       ├── src/
│       │   ├── db/            # Database schema and migrations
│       │   ├── modules/       # Feature modules (users, posts)
│       │   ├── middlewares/   # Express middlewares
│       │   ├── utils/         # Utility functions
│       │   └── types/         # TypeScript type definitions
│       └── package.json
├── package.json               # Root package.json with workspace config
├── turbo.json                # Turborepo configuration
└── biome.json               # Biome linting/formatting config
```

## 🎯 Available Scripts

### Development
```bash
pnpm dev              # Start all applications in development mode
pnpm dev:web          # Start only the web application
pnpm dev:server       # Start only the server
```

### Database
```bash
npx drizzle-kit generate  # Generate new migration (when schema changes)
npx drizzle-kit push      # Push schema changes to database
npx drizzle-kit studio    # Open database studio UI
pnpm db:push             # Alternative: Push schema changes to database
pnpm db:studio           # Alternative: Open database studio UI
pnpm db:generate         # Alternative: Generate new migration
pnpm db:migrate          # Run database migrations
```

### Build & Deploy
```bash
pnpm build            # Build all applications
pnpm check-types      # Check TypeScript types across all apps
```

### Code Quality
```bash
pnpm check            # Run Biome formatting and linting
```

## 🔧 Development Workflow

1. **Create a new feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code structure
   - Use TypeScript for type safety
   - Add proper error handling
   - Write meaningful commit messages

3. **Run quality checks**
   ```bash
   pnpm check          # Format and lint code
   pnpm check-types    # Verify TypeScript types
   ```

4. **Test your changes**
   - Test both frontend and backend
   - Verify database operations
   - Check for any console errors

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

## 🗄️ Database Schema

### Users
- `id` - Unique user identifier
- `name` - Display name
- `email` - Email address (unique)
- `emailVerified` - Email verification status
- `image` - Profile picture URL
- `bio` - User biography
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Posts
- `id` - Unique post identifier
- `content` - Post content
- `authorId` - Reference to user who created the post
- `createdAt` - Post creation timestamp

### Authentication
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verifications` - Email verification tokens

## 🔐 Authentication

ConnectIn uses Better Auth for secure authentication:

- **Email/Password** - Traditional authentication
- **Session Management** - Secure session handling
- **Email Verification** - Account verification system
- **Password Reset** - Secure password recovery

## 🎨 UI Components

Built with shadcn/ui components:
- **Button** - Various button styles and states
- **Card** - Content containers
- **Input** - Form inputs with validation
- **Avatar** - User profile pictures
- **Badge** - Status indicators
- **Dropdown Menu** - Context menus
- **Theme Toggle** - Dark/light mode switching

## 📱 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `GET /auth/session` - Get current session

### Users
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `GET /posts/:id` - Get specific post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## 🚀 Deployment

This project is deployed using:
- **Frontend**: Vercel
- **Backend**: Railway

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push to main

### Backend (Railway)
1. Connect your repository
2. Set environment variables
3. Configure PostgreSQL database
4. Deploy

### Database
- Use a managed PostgreSQL service (Neon, Supabase, Railway)
- Set up connection pooling for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of an internship assignment.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure your database is running
4. Check the documentation for your specific issue

---

