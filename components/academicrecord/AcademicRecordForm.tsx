'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { academicRecordSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { useEffect } from 'react';
import { academicRecordFormSchema } from '@/state/schemas/formSchema';
import { Autocomplete } from '../Autocomplete';
import useGetQuery from '@/state/query/useGetQuery';
import Semester from '../Semester';
import Year from '../Year';
import useStudentInput from '@/utils/useStudentInput';
import useSubjectInput from '@/utils/useSubjectInput';

const AcademicRecordForm = () => {
  const form = useForm<z.infer<typeof academicRecordSchema>>({
    resolver: zodResolver(academicRecordSchema),
    defaultValues: academicRecordFormSchema({}),
  });

  const { successResult, errorResult } = useFormSubmitResult();
  const { isError, isSuccess, isPending, error, mutate } = useMutations({
    key: 'add-academicrecord',
    url: '/academicrecord/add-academicrecord',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Academicrecord added successfully!',
        'Academicrecord Added',
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
            <SubjectInput form={form} />
            <Semester form={form} />
            <Year form={form} />
            <StudentInput form={form} />
            <Button disabled={isPending} variant="default">
              {' '}
              Save Academicrecord {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AcademicRecordForm;
