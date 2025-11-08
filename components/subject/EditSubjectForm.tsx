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
import { subjectSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchSubject} from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { subjectFormSchema } from '@/state/schemas/formSchema';






const EditSubjectForm = ({
  data,
}: {
  data: {subjectId: number} & z.infer<typeof subjectSchema>;
}) => {

  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      ...subjectFormSchema(data)
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-subject',
    url: '/subject/update-subject/'+data?.subjectId,
    method: 'Patch',
  });

  useEffect(() => {
    if (isError) {
      console.log(error)
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult('Programme updated successfully!', 'Programme Updated', fetchSubject);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof subjectSchema>) => {
    mutate(data);
  };

  return (
    <>
      <div className="bg-white p-10 rounded-3xl w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programme Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter programme name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} variant="default">
              {' '}
              Update program {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};



export default EditSubjectForm
