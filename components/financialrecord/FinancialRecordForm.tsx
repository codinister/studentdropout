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
import {   financialRecordSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import {   fetchFinancialrecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { useEffect } from 'react';
import {   financialRecordsFormSchema } from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { Textarea } from '../ui/textarea';


const FinancialRecordForm = () => {
  const form = useForm<z.infer<typeof financialRecordSchema>>({
    resolver: zodResolver(financialRecordSchema),
    defaultValues: {
      ...financialRecordsFormSchema({}),
    },
  });

  const { successResult, errorResult } = useFormSubmitResult();
  const { isError, isSuccess, isPending, error, mutate } = useMutations({
    key: 'add-financialrecord',
    url: '/financialrecord/add-financialrecord',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Financial status added successfully!',
        'Financial Status Added',
        fetchFinancialrecord
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof financialRecordSchema>) => {
    mutate(data);
  };


    const { StudentInput } = useStudentInput();


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


            <StudentInput form={form}  />

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

export default FinancialRecordForm








