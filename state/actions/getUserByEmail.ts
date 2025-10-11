'use server';
import { db } from '@/db';
const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return err;
  }
};

export default getUserByEmail;
