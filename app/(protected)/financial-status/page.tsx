'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect} from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchFinancialStatus } from '@/state/redux/slice/asyncThunkFn';
import {  financialSchema} from '@/types/types';
import useFinancialStatus from '@/components/tableColumns/useFinancialStatus';
import financialstatusForm from '@/components/financialstatus/FinancialStatusForm';
import FinancialStatusDataTable from '@/components/tableRows/FinancialStatusDataTable';

const FinancialStatus = () => {

  const { financialColumn } = useFinancialStatus();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchFinancialStatus());
  }, [dispatch]);

  const financial_record = selector((state) => state?.financialstatus);

  const data: financialSchema[] = financial_record;


  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Financial Status"
          component={financialstatusForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Financial Status"
        />

        <FinancialStatusDataTable columns={financialColumn} data={data} />
      </div>
    </>
  );
};

export default FinancialStatus
