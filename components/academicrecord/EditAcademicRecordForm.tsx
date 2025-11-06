'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { academicRecordSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { academicRecordFormSchema } from '@/state/schemas/formSchema';
import { Autocomplete } from '../Autocomplete';
import Semester from '../Semester';
import Year from '../Year';
import useGetQuery from '@/state/query/useGetQuery';
import replaceDot from '@/utils/replaceDot';
import getValue from '../getValue';
import useStudentInput from '@/utils/useStudentInput';
import useSubjectInput from '@/utils/useSubjectInput';

const EditAcademicRecordForm = ({
  data,
}: {
  data: { recordId: number } & z.infer<typeof academicRecordSchema>;
}) => {
  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof academicRecordSchema>>({
    resolver: zodResolver(academicRecordSchema),
    defaultValues: {
      ...academicRecordFormSchema(data),
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-academicrecord',
    url: '/academicrecord/update-academicrecord/'+data?.recordId,
    method: 'Patch',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Academic record updated successfully!',
        'Academic Record Updated',
        fetchAcademicrecord
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof academicRecordSchema>) => {
    mutate(data);
  };

  const { StudentInput } = useStudentInput();
  const { SubjectInput } = useSubjectInput();

  return (
    <>
      <div className="bg-white p-10 rounded-3xl w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <SubjectInput form={form} subjectId={data?.subjectId} />

            <Semester form={form} />
            <Year form={form} />

            <StudentInput form={form} studentId={data?.studentId} />

            <Button disabled={isPending} variant="default">
              {' '}
              Update record {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditAcademicRecordForm;
