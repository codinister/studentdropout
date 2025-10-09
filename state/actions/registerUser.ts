'use server';

import z from 'zod';
import { registrationSchema } from '../schemas/schemas';
import { fromZodError } from 'zod-validation-error';

const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  const result = registrationSchema.safeParse(data);

  if (!result.success) {
    return {
      error: fromZodError(result.error).toString(),
      success: ''
    };
  }

  const { name, roleId, email, password } = result.data;

  return {
    success: 'You have added a new user',
    error: ''
  }
};

export default registerUser;
