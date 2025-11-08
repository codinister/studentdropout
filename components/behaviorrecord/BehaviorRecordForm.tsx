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
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchBehaviorRecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { useEffect, useState } from 'react';
import { behaviorRecordsFormSchema } from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { Textarea } from '../ui/textarea';


const BehaviorRecordForm = () => {
  const form = useForm<z.infer<typeof behaviorRecordsSchema>>({
    resolver: zodResolver(behaviorRecordsSchema),
    defaultValues: {
      ...behaviorRecordsFormSchema({}),
    },
  });

  const { successResult, errorResult } = useFormSubmitResult();
  const { isError, isSuccess, isPending, error, mutate } = useMutations({
    key: 'add-behaviorrecord',
    url: '/behaviorrecord/add-behaviorrecord',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Behavior added successfully!',
        'Behavior Record Added',
        fetchBehaviorRecord
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof behaviorRecordsSchema>) => {
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} placeholder="Type your message here." />
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

export default BehaviorRecordForm;
