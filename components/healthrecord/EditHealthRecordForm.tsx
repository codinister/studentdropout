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
import {healthRecordSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import {  fetchHealthrecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { healthRecordsFormSchema} from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { Textarea } from '../ui/textarea';
import { ymd } from '@/utils/dateFormats';
const EditBehaviorRecordForm = ({
  data,
}: {
  data: {healthId: number} & z.infer<typeof healthRecordSchema>;
}) => {

  const { successResult, errorResult } = useFormSubmitResult();


  const form = useForm<z.infer<typeof healthRecordSchema>>({
    resolver: zodResolver(healthRecordSchema),
    defaultValues: {
      ...healthRecordsFormSchema({...data, date: ymd(new Date(data?.date))})
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-healthrecord',
    url: '/healthrecord/update-healthrecord/'+data?.healthId,
    method: 'Patch',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult('Health updated successfully!', 'Health Updated', fetchHealthrecord);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof healthRecordSchema>) => {
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
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input  type="date" {...field} placeholder="Choose date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <StudentInput form={form} />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Textarea {...field} placeholder="Type your message here." />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} variant="default">
              {' '}
              Update Health {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditBehaviorRecordForm



