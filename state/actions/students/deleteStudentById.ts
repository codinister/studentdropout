'use server';
import { db } from '@/db';

const deleteStudentById = async (studentId: number) => {
  try {
    const user = await db.student.delete({
      where: { studentId },
    });

    if (!user) return null;

    return user;
  } catch (err) {
    return err;
  }
};

export default deleteStudentById;
