export type tableType = {
  userId: string;
  roleId: number;
  name: string;
  email: string;
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
