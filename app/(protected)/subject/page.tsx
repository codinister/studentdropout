'use client';

import PageHeader from '@/components/PageHeader';
import SubjectDataTable from '@/components/tableRows/SubjectDataTable';
import { useEffect } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchSubject } from '@/state/redux/slice/asyncThunkFn';
import { subjectSchema} from '@/types/types';
import useSubjectColumn from '@/components/tableColumns/useSubjectColumn';
import subjectForm from '@/components/subject/SubjectForm';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';


const SubjectPage = () => {

const {subjectColumn} = useSubjectColumn()



  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchSubject());
  }, [dispatch]);

  const subjects = selector((state) => state?.subject);

  const data: subjectSchema[]  = subjects;


    const tableColumn = [
      'ID',
      'Name'
    ];
  
    const tableRows = data.map((v) => [
      v.subjectId,
      v.subjectName
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
          modalButtonName="Add Programme"
          component={subjectForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Programme"
        />

        <SubjectDataTable columns={subjectColumn} data={data} />
      </div>
    </>
  );
};

export default SubjectPage
