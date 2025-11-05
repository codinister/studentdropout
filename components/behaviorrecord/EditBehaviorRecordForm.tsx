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
import { behaviorRecordsSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import {  fetchBehaviorRecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { behaviorRecordsFormSchema} from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { Textarea } from '../ui/textarea';
const EditBehaviorRecordForm = ({
  data,
}: {
  data: {behaviorId: number} & z.infer<typeof behaviorRecordsSchema>;
}) => {

  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof behaviorRecordsSchema>>({
    resolver: zodResolver(behaviorRecordsSchema),
    defaultValues: {
      ...behaviorRecordsFormSchema(data)
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-behaviorrecord',
    url: '/behaviorrecord/update-behaviorrecord/'+data?.behaviorId,
    method: 'Patch',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult('Behavior updated successfully!', 'Behavior Updated', fetchBehaviorRecord);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof behaviorRecordsSchema>) => {
    mutate(data);
  };



  const {StudentInput} = useStudentInput()

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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Choose date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <StudentInput form={form} studentId={data?.studentId}  />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Type your message here." />
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <Button disabled={isPending} variant="default">
              {' '}
              Save Behavior {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditBehaviorRecordForm



