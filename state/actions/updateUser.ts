'use server';
import { db } from '@/db';
import z from 'zod';
import { EditUserFormType } from '../schemas/schemas';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcryptjs';

const updateUser = async (data: z.infer<typeof EditUserFormType>) => {
  const result = EditUserFormType.safeParse(data);

  if (!result.success) {
    return {
      error: fromZodError(result.error).toString(),
      success: '',
    };
  }

  const { name, roleId, email, password, userId } = result.data;

  const checkEmail = await db.user.findFirst({
    where: { email, NOT: { userId } },
  });

  if (checkEmail) {
    return {
      success: '',
      error: `${email} is already in use!`,
    };
  }

  try {
    let user;
    if (password) {
      const pass = await bcrypt.hash(password, 10);
      user = db.user.update({
        where: { userId },
        data: {
          name,
          roleId,
          email,
          password: pass,
        },
      });
    } else {
      user = db.user.update({
        where: { userId },
        data: {
          name,
          roleId,
          email,
        },
      });
    }

    return {
      success: `${name} has been updated successfully!`,
      data: user,
      error: '',
    };
  } catch (err) {
    console.log(err);
  }
  return {
    success: '',
    error: 'An error occured',
  };
};

export default updateUser;
