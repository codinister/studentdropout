'use server';

import { db } from '@/db';

const getUsers = async (): Promise<unknown> => {
  try {
    const users = await db.user.findMany();
    return users || [];
  } catch (error) {
    return error;
  }
};

export default getUsers;
