'use server';

import { db } from '@/db';



const getStudents = async (): Promise<unknown> => {
  try {
    const student = await db.student.findMany();
    return student || [];
  } catch (error) {
    return error;
  }
};

export default getStudents
