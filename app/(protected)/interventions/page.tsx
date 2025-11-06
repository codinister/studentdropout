'use client';

import PageHeader from '@/components/PageHeader';
import InterventionForm from '@/components/intervention/InterventionForm';
import InterventionDataTable from '@/components/tableRows/InterventionDataTable';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchIntervention } from '@/state/redux/slice/asyncThunkFn';
import {  interventionSchema } from '@/types/types';
import useInterventionColumns from '@/components/tableColumns/useInterventionColumns ';

const Intervention = () => {
  const { interventionColumn } = useInterventionColumns();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchIntervention());
  }, [dispatch]);

  const interventin_record = selector((state) => state?.intervention);

  const data: interventionSchema[] = interventin_record;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Intervention"
          component={InterventionForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Interventions"
        />

        <InterventionDataTable columns={interventionColumn} data={data} />
      </div>
    </>
  );
};

export default Intervention;
