# TaskForge

TaskForge is a comprehensive project management tool designed specifically for web and app development teams. It helps teams efficiently track projects, manage tasks, and collaborate with clients while maintaining an organized workflow.

## Features

### Project Management
- Create, manage, and track projects with customizable statuses
- Monitor project progress through intuitive dashboards
- Set project deadlines and milestones
- Assign project leads (creator by default) and team members
- Track ongoing, completed, and pending projects

### Task Management
- Create and organize tasks within projects
- Group tasks by project
- Set task priorities based on urgency and due dates
- Track task completion status
- Customizable task statuses
- Task filtering and sorting capabilities

### Team Collaboration
- User and team management
- Role-based task assignment
- Assign tasks to teams or individual team members
- In-app commenting system on tasks
- Activity tracking and notifications
- Team collaboration spaces

### Kanban & Task Organization
- Kanban-style drag-and-drop interface (React DnD Kit) for visual task management
- Organize tasks visually for better workflow

### Customer Portal
- Dedicated customer access to view project progress
- Simplified interface for client communication
- Project approval workflows
- Keep records of customers and their projects

### Communication
- Email notifications for task assignments and updates (via Resend)
- Due date reminders
- Status update notifications
- Authentication emails

### Financial Tracking
- Customer information management
- Track payments made for each project
- Payment history and reporting
- Invoice generation

### Authentication & Access Control
- BetterAuth for authentication
- Role-based access control (RBAC) with predefined roles:
  - **Admin**: Full access to all features
  - **Lead**: Manages assigned projects and team members
  - **Member**: Works on assigned tasks
  - **Customer**: Views project progress
- Onboarding process for new users

## Tech Stack

TaskForge is built using modern web technologies:

- **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: TanStack Query (React Query)
- **Authentication**: BetterAuth
- **Email Service**: Resend
- **Drag and Drop**: React DnD Kit
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
NEXT_PUBLIC_API_KEY="your_api_key"
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
- [TanStack Query](https://tanstack.com/query)
- [React DnD Kit](https://dndkit.com/)

## Contact

For questions or suggestions, please reach out to [your contact info].
