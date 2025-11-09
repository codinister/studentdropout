import {
  userSchema,
  studentSchema,
  subjectSchema,
  academicRecordSchema,
  settingsSchema,
  interventionSchema,
  behaviorRecordsSchema,
  financialStatuschema,
  healthRecordSchema,
} from '@/state/schemas/validationSchemas';

import { z } from 'zod';

export type userSchema = z.infer<typeof userSchema> & { userId: string};
export type studentSchema = z.infer<typeof studentSchema> & {
  studentId: string;
  birthdate: string;
  score: string;
  gpa: string;
  attendance: string;
  dropoutRisk: string;
  roleView: string[];
  financialStatus: string;
  intervention: {
    interventionId: string;
    type: string;
    date: string;
    outcome: string;
  };
};
export type behaviorSchema = z.infer<typeof behaviorRecordsSchema> & {
  behaviorId: string;
  studentName: string;
};
export type subjectSchema = z.infer<typeof subjectSchema> & {
  subjectId: string;
};
export type academicRecordSchema = z.infer<typeof academicRecordSchema> & {
  recordId: string;
  studentName: string;
  level: string;
  subjectName: string;
};
export type settingsSchema = z.infer<typeof settingsSchema> & {
  settingsId: string;
};
export type interventionSchema = z.infer<typeof interventionSchema> & {
  interventionId: string;
  status: string;
  type: string;
  studentName: string;
};

export type financialSchema = z.infer<typeof financialStatuschema> & {
  financialId: string;
  studentName: string;
};
export type healthSchema = z.infer<typeof healthRecordSchema> & {
  healthId: string;

  studentName: string;
};

export type AppState = {
  modalStatus: 'show' | 'hide';
  modalComponent: React.ElementType | null;
  users: userSchema[];
  students: studentSchema[];
  subject: subjectSchema[];
  intervention: interventionSchema[];
  settings: settingsSchema[];
  academicrecord: academicRecordSchema[];
  behaviorrecord: behaviorSchema[];
  financialstatus: financialSchema[];
  healthrecord: healthSchema[];
  error?: any;
};

export type userDatasetType = {
  userId: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  password: string;
  roleId: number;
} | null;
