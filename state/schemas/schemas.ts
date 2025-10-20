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


export const studentSchema = z.object({
  studentName : z.string().min(2, 'Student Name field required!'),
  totalAttendance: z.string().min(1, 'Total Attendance filed required!'),
  level: z.number().min(1, 'Level field required!'),
  score: z.string().min(1, 'Score field required!'),
});

export const editStudentFormType = z.object({
  studentId: z.number(),
  studentName : z.string().min(2, 'Student Name field required!'),
  totalAttendance: z.string().min(1, 'Total Attendance filed required!'),
  level: z.number().min(1, 'Level field required!'),
  score: z.string().min(1, 'Score field required!'),
});



