'use client';

import { Autocomplete } from '@/components/Autocomplete';
import getValue from '@/components/getValue';
import useGetQuery from '@/state/query/useGetQuery';

type StudentInputType = {
  form: any;
  studentId?: number;
};

const useStudentInput = () => {
  const students = useGetQuery('students', '/students/get-students');

  const studentsItems = students.map(
    (v: { studentId: number; studentName: string }) => ({
      label: v.studentName,
      value: v.studentId,
    })
  );

  const StudentInput = ({ form, studentId = 0 }: StudentInputType) => {
    const studentDefault = getValue({ data: studentsItems, value: studentId });

    const defaultValue = studentId > 0 ? studentDefault : '';

    return (
      <Autocomplete
        form={form}
        dataList={studentsItems}
        fieldName="studentId"
        label="Student"
        placeholder="Select student..."
        defaultValue={defaultValue}
      />
    );
  };

  return { StudentInput };
};

export default useStudentInput;
