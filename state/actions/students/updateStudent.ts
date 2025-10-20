'use server';
import { db } from '@/db';
import z from 'zod';
import { editStudentFormType } from '../../schemas/schemas';
import { fromZodError } from 'zod-validation-error';


const updateStudent = async (data: z.infer<typeof editStudentFormType>) => {
  const result = editStudentFormType.safeParse(data);

  if (!result.success) {
    return {
      error: fromZodError(result.error).toString(),
      success: '',
    };
  }

  const { studentId, studentName, level, totalAttendance, score } = result.data;

  const checkStudent = await db.student.findUnique({
    where: { studentName, NOT: { studentId } },
  });

  if (checkStudent) {
    return {
      success: '',
      error: `${studentName} is already in use!`,
    };
  }

  try {
    const user = await db.student.update({
      where: { studentId },
      data: {
        studentName,
        level,
        totalAttendance,
        score,
      },
    });

    return {
      success: `${studentName} has been updated successfully!`,
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

export default updateStudent;
