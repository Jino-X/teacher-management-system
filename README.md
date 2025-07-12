# Teacher Management System

<div align="center">
  
![Teacher Management System](https://img.shields.io/badge/TeacherMS-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06b6d4)

</div>

A comprehensive system for educational institutions to manage teachers, classes, schedules, performance metrics, and more. Built with Next.js, TypeScript, and Tailwind CSS, this application provides a robust platform for streamlining administrative tasks in educational settings.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Authentication](#-authentication)
- [Performance Optimization](#-performance-optimization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

The Teacher Management System includes the following key features:

### Dashboard
- **Overview Statistics**: Real-time metrics on teachers, classes, subjects, and attendance rates
- **Recent Activity**: Log of system events with contextual icons
- **Quick Actions**: Shortcuts to common tasks with visual indicators
- **Performance Charts**: Visual representation of teacher evaluations and attendance

### Teacher Management
- **Teacher Directory**: Searchable and filterable list of all teachers
- **Teacher Profiles**: Detailed information about each teacher's credentials, subjects, and classes
- **Performance Tracking**: Individual and comparative performance metrics

### Performance Analytics
- **Department Performance**: Compare performance across different academic departments
- **Monthly Trends**: Track performance trends over time with visual charts
- **Performance Criteria**: Define and visualize assessment standards
- **Evaluation Records**: Manage and review teacher evaluations

### Schedule Management
- **Class Timetables**: Visual representation of daily and weekly schedules
- **Room Assignments**: Track classroom and lab usage
- **Schedule Conflicts**: Automatic detection of scheduling conflicts

### Subject & Class Management
- **Subject Directory**: Catalog of all subjects with assigned teachers
- **Class Groups**: Organize students into classes with designated teachers
- **Assignment Tracking**: Monitor assignments and completion rates

### Attendance System
- **Daily Attendance**: Track teacher attendance with statistical analysis
- **Leave Management**: Process and approve leave requests
- **Attendance Reports**: Generate detailed attendance reports

## 🛠 Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: JWT tokens with HTTP-only cookies
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Modal Dialogs**: [React Responsive Modal](https://react-responsive-modal.leopradel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- [npm](https://www.npmjs.com/) (v9.0.0 or later) or [yarn](https://yarnpkg.com/) (v1.22.0 or later)
- [Git](https://git-scm.com/)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/teacher-management-system.git
   cd teacher-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the required environment variables (see [Environment Variables](#-environment-variables) section).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=8h
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password

# API Configuration
API_BASE_URL=/api
```

For production deployments, ensure you set proper secure values for all environment variables, especially `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.

## 📖 Usage

### Authentication

1. Navigate to the login page at `/login`
2. Enter your credentials (default admin credentials can be found in your environment variables)
3. Upon successful authentication, you will be redirected to the dashboard

### Dashboard Navigation

The system includes a sidebar navigation with links to all major sections:

- **Dashboard**: Overview of key metrics and recent activities
- **Teachers**: Manage teacher profiles and information
- **Subjects**: Create and manage subject offerings
- **Classes**: Organize and monitor class groups
- **Schedule**: View and manage timetables
- **Attendance**: Track and report on attendance
- **Assignments**: Monitor teaching assignments
- **Performance**: Analyze teacher performance metrics
- **Settings**: Configure system preferences

### Key Operations

- **Adding a Teacher**: Navigate to Teachers and click "Add Teacher" button
- **Recording Attendance**: Access the Attendance section and select the relevant date
- **Viewing Performance**: Check individual or departmental performance in the Performance section
- **Managing Schedule**: Create and modify schedules in the Schedule section

## 📁 Project Structure

```
teacher-management-system/
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── components/    # Page components
│   │   ├── login/         # Authentication pages
│   │   └── ...            # Feature pages (teachers, schedule, etc.)
│   ├── components/        # Reusable components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── teachers/      # Teacher management components
│   │   └── ...            # Other feature-specific components
│   ├── constants/         # Application constants
│   ├── custom-hooks/      # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── middleware.ts      # Next.js middleware for auth
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── .env.local             # Environment variables (not in repo)
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔒 Authentication

The system uses JWT (JSON Web Tokens) for authentication with the following flow:

1. User submits credentials via the login form
2. Server validates credentials and issues a JWT stored in an HTTP-only cookie
3. JWT is automatically sent with subsequent requests to authenticated routes
4. The middleware validates the JWT for protected routes
5. On logout, the JWT cookie is cleared

For security reasons, all authentication logic is handled server-side with proper HTTP-only cookies to prevent XSS attacks.

## ⚡ Performance Optimization

The application implements several performance optimizations:

- **Code Splitting**: Automatic code splitting by Next.js
- **Image Optimization**: Next.js Image component for optimized image loading
- **Client-Side Data Fetching**: Using React Query for efficient API calls
- **Lazy Loading**: Components are loaded only when needed
- **Memoization**: React's useMemo and useCallback to prevent unnecessary re-renders
- **CSS Optimization**: Tailwind CSS purges unused styles in production

## 🌐 Deployment

The recommended way to deploy this application is using [Vercel](https://vercel.com), which is optimized for Next.js applications:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy the application

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Developed with ❤️ for educational institutions