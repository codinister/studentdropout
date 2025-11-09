'use client';

import PageHeader from '@/components/PageHeader';
import InterventionForm from '@/components/intervention/InterventionForm';
import InterventionDataTable from '@/components/tableRows/InterventionDataTable';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchIntervention } from '@/state/redux/slice/asyncThunkFn';
import { interventionSchema } from '@/types/types';
import useInterventionColumns from '@/components/tableColumns/useInterventionColumns ';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';

const Intervention = () => {
  const { interventionColumn } = useInterventionColumns();

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchIntervention());
  }, [dispatch]);

  const interventin_record = selector((state) => state?.intervention);

  const data: interventionSchema[] = interventin_record;

  const tableColumn = [
    'ID',
    'Name',
    'Type',
    'Status'
  ];

  const tableRows = data.map((v) => [
    v.studentId,
    v.studentName,
    v.type,
    v.status,
  ]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Students',
  });

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Intervention"
          component={InterventionForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Interventions"
        />

        <InterventionDataTable columns={interventionColumn} data={data} />
      </div>
    </>
  );
};

export default Intervention;
