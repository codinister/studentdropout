'use server';
import { db } from '@/db';



const getStudentById = async (studentId: number) => {
  try {
    const students = await db.student.findFirst({
      where: { studentId },
    });

    if (!students) return null;

    return students;
  } catch (err) {
    return err;
  }
};

export default getStudentById;
