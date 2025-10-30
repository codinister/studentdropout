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

export type userSchema = z.infer<typeof userSchema> & { userId: string };
export type studentSchema = z.infer<typeof studentSchema> & { studentId: string };
export type subjectSchema = z.infer<typeof subjectSchema> & { subjectId: string };
export type academicRecordSchema = z.infer<typeof academicRecordSchema> &
  { recordId: string };
export type attendanceRecordSchema = z.infer<typeof attendanceRecordSchema> &
  { attendanceId: string };
export type settingsSchema = z.infer<typeof settingsSchema> & { settingsId: string };
export type dropoutPredictionSchema = z.infer<typeof dropoutPredictionSchema> &
  { predictionId: string };
export type interventionSchema = z.infer<typeof interventionSchema> &
  { interventionId: string };
export type demographicInfoSchema = z.infer<typeof demographicInfoSchema> &
  { demoId: string };
export type roleSchema = z.infer<typeof roleSchema> & { roleId: string };

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
