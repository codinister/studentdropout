'use server';
import { db } from '@/db';
import z from 'zod';
import { registrationSchema } from '../schemas/schemas';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcryptjs'

const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  const result = registrationSchema.safeParse(data);

  if (!result.success) {
    return {
      error: fromZodError(result.error).toString(),
      success: '',
    };
  }

  const { name, roleId, email, password } = result.data;


  const checkEmail = await db.user.findFirst({
    where: {email}
  })

  if(checkEmail){
      return {
    success: '',
    error: `${email} is already in use!`,
  };
  }

  const pass = await bcrypt.hash(password, 10)

  try {
    const user = await db.user.create({
      data: {
        name,
        roleId,
        email,
        password: pass,
      },
    });


    return {
      success: `${name} has been added successfully!`,
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

export default registerUser;
