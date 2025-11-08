'client';

import { Autocomplete } from '@/components/Autocomplete';
import getValue from '@/components/getValue';
import useGetQuery from '@/state/query/useGetQuery';

type SubjectInputType = {
  form: any;
  subjectId?: number;
};

const useSubjectInput = () => {
  const subject = useGetQuery('subject', '/subject/get-subjects');

  //Subject items
  const subjectItems = subject.map(
    (v: { subjectId: number; subjectName: string }) => ({
      label: v.subjectName,
      value: v.subjectId,
    })
  );

  const SubjectInput = ({ form, subjectId = 9 }: SubjectInputType) => {
    const subjectDefault = getValue({ data: subjectItems, value: subjectId });

    const defaultValue = subjectId > 0 ? subjectDefault : '';

    return (
      <Autocomplete
        form={form}
        dataList={subjectItems}
        fieldName="subjectId"
        label="Programme"
        placeholder="Enter programme..."
        defaultValue={defaultValue}
      />
    );
  };

  return { SubjectInput };
};

export default useSubjectInput;
