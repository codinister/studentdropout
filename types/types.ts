export type tableType = {
  userId: string;
  roleId: number;
  name: string;
  email: string;
};

export type studentTableType = {
  studentId: string;
  studentName: string;
  level: number;
  totalAttendance: string;
  score: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  roleId: number;
  passwrod: string;
};

export type userSchema = {
  name: string;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  password: string;
  roleId: number;
} | null;

export type userDatasetType = {
  userId: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  password: string;
  roleId: number;
} | null;
