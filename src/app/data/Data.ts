import { Priority, ProjectStatus, TaskStatus } from '@prisma/client';

export const sampleProjects = [
  {
    id: 'proj_1',
    title: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: new Date('2024-05-15'),
    creatorId: 'user_1', // Assume this is an admin
    leadId: 'user_2',
    customerId: 'user_7', // A customer
    tasks: ['task_1', 'task_2', 'task_3']
  },
  {
    id: 'proj_2',
    title: 'Mobile App Development',
    description: 'Develop cross-platform mobile application for task management',
    status: ProjectStatus.OPEN,
    dueDate: new Date('2024-06-30'),
    creatorId: 'user_1',
    leadId: 'user_3',
    tasks: ['task_4', 'task_5', 'task_6']
  },
  {
    id: 'proj_3',
    title: 'Data Migration',
    description: 'Migrate legacy system data to new cloud infrastructure',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: new Date('2024-04-20'),
    creatorId: 'user_2',
    leadId: 'user_4',
    customerId: 'user_8',
    tasks: ['task_7', 'task_8', 'task_9']
  },
  {
    id: 'proj_4',
    title: 'Security Audit',
    description: 'Comprehensive security assessment and implementation of recommendations',
    status: ProjectStatus.OPEN,
    dueDate: new Date('2024-07-15'),
    creatorId: 'user_1',
    leadId: 'user_5',
    tasks: ['task_10', 'task_11', 'task_12']
  },
  {
    id: 'proj_5',
    title: 'Customer Portal',
    description: 'Build customer self-service portal with authentication and dashboard',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: new Date('2024-05-30'),
    creatorId: 'user_2',
    leadId: 'user_6',
    customerId: 'user_9',
    tasks: ['task_13', 'task_14', 'task_15']
  }
];

export const sampleTasks = [
  {
    id: 'task_1',
    title: 'Design System Creation',
    description: 'Create comprehensive design system including colors, typography, and components',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.L4,
    progress: 75,
    dueDate: new Date('2024-04-01'),
    projectId: 'proj_1',
    assignedId: 'user_3'
  },
  {
    id: 'task_2',
    title: 'Homepage Redesign',
    description: 'Implement new homepage design with improved navigation',
    status: TaskStatus.OPEN,
    priority: Priority.L3,
    progress: 30,
    dueDate: new Date('2024-04-15'),
    projectId: 'proj_1',
    assignedId: 'user_4'
  },
  {
    id: 'task_3',
    title: 'Content Migration',
    description: 'Migrate existing content to new CMS system',
    status: TaskStatus.OPEN,
    priority: Priority.L2,
    progress: 0,
    dueDate: new Date('2024-05-01'),
    projectId: 'proj_1',
    assignedId: 'user_5'
  },
  {
    id: 'task_4',
    title: 'UI/UX Design',
    description: 'Design mobile app user interface and experience',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.L5,
    progress: 60,
    dueDate: new Date('2024-05-15'),
    projectId: 'proj_2',
    assignedId: 'user_2'
  },
  {
    id: 'task_5',
    title: 'Core Features Development',
    description: 'Implement core app features using React Native',
    status: TaskStatus.OPEN,
    priority: Priority.L4,
    progress: 20,
    dueDate: new Date('2024-06-01'),
    projectId: 'proj_2',
    assignedId: 'user_6'
  },
  // ... continuing with more tasks following similar pattern
  {
    id: 'task_15',
    title: 'User Documentation',
    description: 'Create comprehensive user documentation for the portal',
    status: TaskStatus.OPEN,
    priority: Priority.L2,
    progress: 15,
    dueDate: new Date('2024-05-25'),
    projectId: 'proj_5',
    assignedId: 'user_4'
  },
  {
    id: 'task_16',
    title: 'API Documentation',
    description: 'Create detailed API documentation with Swagger/OpenAPI specifications',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.L3,
    progress: 45,
    dueDate: new Date('2024-06-10'),
    projectId: 'proj_2',
    assignedId: 'user_3'
  },
  {
    id: 'task_17',
    title: 'Performance Optimization',
    description: 'Optimize database queries and implement caching strategy',
    status: TaskStatus.OPEN,
    priority: Priority.L4,
    progress: 0,
    dueDate: new Date('2024-06-15'),
    projectId: 'proj_3',
    assignedId: 'user_5'
  },
  {
    id: 'task_18',
    title: 'Vulnerability Assessment',
    description: 'Conduct thorough vulnerability assessment using industry-standard tools',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.L5,
    progress: 80,
    dueDate: new Date('2024-07-01'),
    projectId: 'proj_4',
    assignedId: 'user_6'
  },
  {
    id: 'task_19',
    title: 'Analytics Dashboard',
    description: 'Implement real-time analytics dashboard with charts and filters',
    status: TaskStatus.OPEN,
    priority: Priority.L3,
    progress: 25,
    dueDate: new Date('2024-05-20'),
    projectId: 'proj_5',
    assignedId: 'user_2'
  },
  {
    id: 'task_20',
    title: 'User Testing',
    description: 'Organize and conduct user testing sessions with key stakeholders',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.L4,
    progress: 35,
    dueDate: new Date('2024-05-28'),
    projectId: 'proj_1',
    assignedId: 'user_4'
  }
];


export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  dueDate: Date
  creatorId: string
  leadId: string
  customerId?: string
  tasks: string[]
}