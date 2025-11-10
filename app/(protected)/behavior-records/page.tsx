'use client';

import PageHeader from '@/components/PageHeader';
import BehaviorRecordForm from '@/components/behaviorrecord/BehaviorRecordForm';
import BehaviorRecordDataTable from '@/components/tableRows/BehaviorRecordDataTable';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchBehaviorRecord } from '@/state/redux/slice/asyncThunkFn';
import { behaviorSchema } from '@/types/types';
import useBehaviorRecordColumns from '@/components/tableColumns/useBehaviorRecordColumns';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';

const BehaviorRecord = () => {
  const { behaviorColumn } = useBehaviorRecordColumns();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchBehaviorRecord());
  }, [dispatch]);

  const behavior_record = selector((state) => state?.behaviorrecord);

  const data: behaviorSchema[] = behavior_record;

  const tableColumn = [
    'ID',
    'Name',
    'Description'
  ];

  const tableRows = data.map((v) => [
    v.studentId,
    v.studentName,
    v.description,
  ]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Behavior Record',
  });

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Behavior"
          component={BehaviorRecordForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Behavior Record"
        />

        <BehaviorRecordDataTable columns={behaviorColumn} data={data} />
      </div>
    </>
  );
};

export default BehaviorRecord;
