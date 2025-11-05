'use client';

import PageHeader from '@/components/PageHeader';
import AcademicRecordForm from '@/components/academicrecord/AcademicRecordForm';
import { useEffect} from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import { academicRecordSchema } from '@/types/types';
import useAcademicRecordColumns from '@/components/tableColumns/useAcademicRecordColumns';
import AcademicRecordDataTable from '@/components/tableRows/AcademicRecordDataTable';

const AcademicRecords = () => {

  const { academicColumn } = useAcademicRecordColumns();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchAcademicrecord());
  }, [dispatch]);

  const academic = selector((state) => state?.academicrecord);

  const data: academicRecordSchema[] = academic;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Academic Records"
          component={AcademicRecordForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Academic Records"
        />

        <AcademicRecordDataTable columns={academicColumn} data={data} />
      </div>
    </>
  );
};

export default AcademicRecords;


