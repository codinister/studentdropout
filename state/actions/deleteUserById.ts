'use server';
import { db } from '@/db';

const deleteUserById = async (userId: number) => {
  try {
    const user = await db.user.delete({
      where: { userId },
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return err;
  }
};

export default deleteUserById;
