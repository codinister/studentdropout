'use client';

import PageHeader from '@/components/PageHeader';
import SubjectDataTable from '@/components/tableRows/SubjectDataTable';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchSubject } from '@/state/redux/slice/asyncThunkFn';
import { subjectSchema} from '@/types/types';
import useSubjectColumn from '@/components/tableColumns/useSubjectColumn';
import subjectForm from '@/components/subject/SubjectForm';


const SubjectPage = () => {

const {subjectColumn} = useSubjectColumn()

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchSubject());
  }, [dispatch]);

  const subjects = selector((state) => state?.subject);

  const data: subjectSchema[]  = subjects;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Subject"
          component={subjectForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Subject"
        />

        <SubjectDataTable columns={subjectColumn} data={data} />
      </div>
    </>
  );
};

export default SubjectPage
