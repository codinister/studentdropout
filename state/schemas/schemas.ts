import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name field required!'),
  roleId: z.number().min(1, 'Role filed required!'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const EditUserFormType = z.object({
  userId: z.number(),
  name: z.string().min(2, 'Name field required!'),
  roleId: z.number().min(1, 'Role filed required!'),
  email: z.string().email('Enter a valid email'),
  password: z.string(),
});



