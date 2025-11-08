import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const userSchema = z.object({
  name: z.string().min(2, 'Name field required!'),
  roleId: z.number().min(1, 'Role filed required!'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2, 'Name field required!'),
  roleId: z.number().min(1, 'Role filed required!'),
  email: z.string().email('Enter a valid email'),
  password: z.string().optional(),
});

//STUDENTS
export const studentSchema = z.object({
  studentName: z.string().min(1, 'Stundent name field required!'),
  level: z.string().min(1, 'Level field required!'),
  birthdate: z.string().min(1, 'Birthdate field required!'),
  phone: z.string().min(10, 'Phone field required!'),
  nationality: z.string().min(1, 'Nationality field required!'),
  residence: z.string().min(1, 'Level field required!'),
  gender: z.string().min(1, 'Gender field required!'),
  admissiondate: z.string().min(1, 'Admission date field required!'),
});

//SUBJECTS
export const subjectSchema = z.object({
  subjectName: z.string().min(2, 'Subject Name field required!'),
});

//AcademicRecord
export const academicRecordSchema = z.object({
  subjectId: z.number().min(2, 'Subject Name field required!'),
  semester: z.string().min(2, 'Semester field required!'),
  year: z.number().min(2, 'Year field required!'),
  studentId: z.number().min(1, 'Student Name field required!'),
  department: z.string().min(1, 'Department field required!'),
  gpa: z.string().min(1, 'GPA field required!'),
  attendance: z.string().min(1, 'Attendance field required!'),
  score: z.string().min(1, 'Score attendance field required!'),
});

export const behaviorRecordsSchema = z.object({
  date: z.string().min(2, 'Date field required!'),
  studentId: z.number().min(1, 'Student Name field required!'),
  description: z.string().min(2, 'Description field required!'),
});

export const healthRecordSchema = z.object({
  date: z.string().min(2, 'Date field required!'),
  studentId: z.number().min(1, 'Student Name field required!'),
  condition: z.string().min(2, 'Condition field required!'),
});

export const financialStatuschema = z.object({
  status: z.string().min(2, 'Status field required!'),
  studentId: z.number().min(1, 'Student Name field required!'),
});

//Settings
export const settingsSchema = z.object({
  schoolName: z.string().min(2, 'School Name field required!'),
  schoolPhone: z.string().min(10, 'School Phone field required!'),
  schoolWebsite: z.string().min(2, 'School Website field required!'),
  schoolLocation: z.string().min(2, 'School Location field required!'),
  schoolPostalAddress: z.string().min(2, 'Postal Address field required!'),
});

//intervention
export const interventionSchema = z.object({
  type: z.string().min(2, 'Type field required!'),
  date: z.string().min(2, 'Date field required!'),
  outcome: z.string().min(2, 'Outcome field required!'),
  studentId: z.number().min(1, 'Student Name field required!'),
});
