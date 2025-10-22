'use client';

import PageHeader from '@/components/PageHeader';
import StudentForm from '@/components/students/StudentForm';
import StudentDataTable from '@/components/tableRows/StudentDataTable';
import { useEffect, useState } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchStudents } from '@/state/redux/slice/appReducer';
import { studentTableType} from '@/types/types';
import useStudentColumn from '@/components/tableColumns/useStudentColumn';


const StudentsPage = () => {

const {studentColumn} = useStudentColumn()

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const students = selector((state) => state?.students);

  const data: studentTableType[]  = students;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Student"
          component={StudentForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Students"
        />

        <StudentDataTable columns={studentColumn} data={data} />
      </div>
    </>
  );
};

export default StudentsPage
