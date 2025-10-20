'use server';
import { db } from '@/db';
import z from 'zod';
import { studentSchema } from '../../schemas/schemas';
import { fromZodError } from 'zod-validation-error';


const addStudent = async (data: z.infer<typeof studentSchema>) => {
  const result = studentSchema.safeParse(data);

  if (!result.success) {
    return {
      error: fromZodError(result.error).toString(),
      success: '',
    };
  }

  const { studentName, level, totalAttendance, score } = result.data;

  const checkStudentName = await db.student.findUnique({
    where: { studentName },
  });

  if (checkStudentName) {
    return {
      success: '',
      error: `${studentName} is already in use!`,
    };
  }

  try {
    const user = await db.student.create({
      data: {
        studentName: studentName,
        level,
        totalAttendance: totalAttendance,
        score,
      },
    });

    return {
      success: `${studentName} has been added successfully!`,
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

export default addStudent;
