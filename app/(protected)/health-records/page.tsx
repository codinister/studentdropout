'use client';

import PageHeader from '@/components/PageHeader';
import HealthRecordForm from '@/components/healthrecord/HealthRecordForm';
import HealthRecordDataTable from '@/components/tableRows/HealthRecordDataTable';
import { useEffect} from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchHealthrecord } from '@/state/redux/slice/asyncThunkFn';
import {  healthSchema} from '@/types/types';
import useHealthRecordColumns  from '@/components/tableColumns/useHealthRecordColumns';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';

const HealthRecord = () => {

  const { healthColumn } = useHealthRecordColumns();



  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchHealthrecord());
  }, [dispatch]);

  const health_record = selector((state) => state?.healthrecord);

  const data: healthSchema[] = health_record;


    const tableColumn = [
    'ID',
    'Name',
    'Condition'
  ];

  const tableRows = data.map((v) => [
    v.studentId,
       v.studentName,
    v.condition
  ]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Health Record',
  });

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Health"
          component={HealthRecordForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Health Record"
        />

        <HealthRecordDataTable columns={healthColumn} data={data} />
      </div>
    </>
  );
};

export default HealthRecord
