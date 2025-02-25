# Taskforge

Taskforge is a project management tool designed for web and app development teams. It helps teams efficiently track projects, manage tasks, and collaborate with clients while maintaining an organized workflow.

## Features

### Project & Task Management
- Track projects, tasks, and progress.
- Group tasks within a project.
- Assign tasks to teams or individuals.
- Designate a project lead (default: creator).
- Set task priorities based on urgency and due dates.

### Collaboration & Communication
- Comment on tasks.
- Send email notifications for updates (via Resend).

### Kanban & Task Organization
- Drag-and-drop Kanban board (React DnD Kit).
- Organize tasks visually for better workflow.

### Dashboard & Overview
- Projects dashboard for a quick overview.
- Track ongoing, completed, and pending projects.

### Customer Management & Transparency
- Customer portal to track project progress.
- Keep records of customers and their projects.

### Payments & Financial Tracking
- Track payments made for each project.

### Authentication & Access Control
- BetterAuth for authentication.
- Role-based access control (RBAC) with predefined roles:
  - **Admin**: Full access to all features.
  - **Lead**: Manages assigned projects and team members.
  - **Member**: Works on assigned tasks.
  - **Customer**: Views project progress.

### Additional Features
- Onboarding process for new users.
- Customizable task statuses.

## Tech Stack
- **Next.js** - React framework for the frontend & backend.
- **Prisma ORM** - Database management.
- **PostgreSQL** - Relational database.
- **Tailwind CSS** - UI styling.
- **ShadCN UI** - Prebuilt UI components.
- **Resend** - Email notifications.
- **React DnD Kit** - Drag-and-drop functionality.
- **TanStack Query** - Client-side state management.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/taskforge.git
   ```
2. Navigate to the project directory:
   ```sh
   cd taskforge
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (create a `.env` file and add required keys):
   ```env
   DATABASE_URL=your_postgres_url
   NEXT_PUBLIC_API_KEY=your_api_key
   ```
5. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
6. Start the development server:
   ```sh
   npm run dev
   ```

## Contributing
Contributions are welcome! Feel free to open issues and submit pull requests.

## License
MIT License
# TaskForge

TaskForge is a comprehensive task and project management web application designed to help teams and individuals organize, track, and collaborate on projects efficiently.

## Features

### Project Management
- Create, manage, and track projects with customizable statuses
- Monitor project progress through intuitive dashboards
- Set project deadlines and milestones
- Assign project leads and team members

### Task Management
- Create and organize tasks within projects
- Set task priorities and due dates
- Track task completion status
- Kanban-style drag-and-drop interface for visual task management
- Task filtering and sorting capabilities

### Team Collaboration
- User and team management
- Role-based task assignment
- In-app commenting system on tasks
- Activity tracking and notifications

### Customer Portal
- Dedicated customer access to view project progress
- Simplified interface for client communication
- Project approval workflows

### Communication
- Email notifications for task assignments and updates
- Due date reminders
- Status update notifications
- Authentication emails

### Financial Tracking
- Customer information management
- Project payment tracking
- Payment history and reporting

## Tech Stack

TaskForge is built using modern web technologies:

- **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Query
- **Authentication**: BetterAuth
- **Email Service**: Resend
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskforge.git
cd taskforge
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/taskforge"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
RESEND_API_KEY="your-resend-api-key"
```

4. Set up the database
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
taskforge/
├── components/        # Reusable UI components
├── lib/               # Utility functions and shared code
├── pages/             # Next.js pages and API routes
│   ├── api/           # Backend API endpoints
│   └── ...            # Frontend pages
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── styles/            # Global styles
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Resend](https://resend.com/)
### Contact
For questions or suggestions, reach out to [your contact info].

