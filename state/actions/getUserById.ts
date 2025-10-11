'use server';
import { db } from '@/db';
const getUserById = async (userId: number) => {
  try {
    const user = await db.user.findFirst({
      where: { userId },
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return err;
  }
};

export default getUserById;
