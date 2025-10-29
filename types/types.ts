import {
  userSchema,
  studentSchema,
  subjectSchema,
  academicRecordSchema,
  attendanceRecordSchema,
  settingsSchema,
  dropoutPredictionSchema,
  interventionSchema,
  demographicInfoSchema,
  roleSchema,
} from '@/state/schemas/validationSchemas';

import { z } from 'zod';

type userSchema = z.infer<typeof userSchema> & { userId: string }[];
type studentSchema = z.infer<typeof studentSchema> & { studentId: string }[];
type subjectSchema = z.infer<typeof subjectSchema> & { subjectId: string }[];
type academicRecordSchema = z.infer<typeof academicRecordSchema> &
  { recordId: string }[];
type attendanceRecordSchema = z.infer<typeof attendanceRecordSchema> &
  { attendanceId: string }[];
type settingsSchema = z.infer<typeof settingsSchema> & { settingsId: string }[];
type dropoutPredictionSchema = z.infer<typeof dropoutPredictionSchema> &
  { predictionId: string }[];
type interventionSchema = z.infer<typeof interventionSchema> &
  { interventionId: string }[];
type demographicInfoSchema = z.infer<typeof demographicInfoSchema> &
  { demoId: string }[];
type roleSchema = z.infer<typeof roleSchema> & { roleId: string }[];

export type AppState = {
  modalStatus: 'show' | 'hide';
  modalComponent: React.ElementType | null;
  users: userSchema[];
  students: studentSchema[];
  role: roleSchema[];
  subject: subjectSchema[];
  demographicinfo: demographicInfoSchema[];
  intervention: interventionSchema[];
  dropoutprediction: dropoutPredictionSchema[];
  settings: settingsSchema[];
  attendancerecord: attendanceRecordSchema[];
  academicrecord: academicRecordSchema[];
  error?: any;
};
