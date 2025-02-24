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

---

### Contact
For questions or suggestions, reach out to [your contact info].

