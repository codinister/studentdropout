'use client';

import PageHeader from '@/components/PageHeader';
import AcademicRecordForm from '@/components/academicrecord/AcademicRecordForm';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import { academicRecordSchema } from '@/types/types';
import useAcademicRecordColumns from '@/components/tableColumns/useAcademicRecordColumns';
import AcademicRecordDataTable from '@/components/tableRows/AcademicRecordDataTable';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';

const AcademicRecords = () => {
  const { academicColumn } = useAcademicRecordColumns();

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchAcademicrecord());
  }, [dispatch]);

  const academic = selector((state) => state?.academicrecord);

  const data: academicRecordSchema[] = academic;

  const tableColumn = ['ID', 'Name', 'Department', 'Level', 'Program'];

  const tableRows = data.map((v) => [
    v.studentId,
    v.studentName,
    v.department,
    v.level,
    v.subjectName,
  ]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Academic Records',
  });

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Academic Records"
          component={AcademicRecordForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Academic Records"
        />

        <AcademicRecordDataTable columns={academicColumn} data={data} />
      </div>
    </>
  );
};

export default AcademicRecords;
