import { z } from "zod";


const Priority = {
  L1: 1,
  L2: 2,
  L3: 3,
  L4: 4,
  L5: 5,
};



 const ProjectSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
  creatorId: z.string().cuid(), // Required: Creator cannot be null
  leadId: z.string().cuid().nullable().optional(), // Lead is optional and can be changed
  customerId: z.string().cuid().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { Priority, ProjectSchema };


export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote: "TaskForge has been a game-changer for me. It's so easy to keep track of my tasks and deadlines. I highly recommend it!"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    quote: "As a product manager, I love how TaskForge helps me coordinate with different teams. The project tracking features are exceptional!"
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "Team Lead",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    quote: "Managing multiple projects has never been easier. The intuitive interface and collaboration features have improved our team's efficiency by 30%."
  }
];