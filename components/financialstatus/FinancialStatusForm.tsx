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
import { financialStatuschema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchFinancialStatus } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { useEffect } from 'react';
import { financialStatusFormSchema } from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const financialstatusForm = () => {
  const form = useForm<z.infer<typeof financialStatuschema>>({
    resolver: zodResolver(financialStatuschema),
    defaultValues: {
      ...financialStatusFormSchema({}),
    },
  });

  const { successResult, errorResult } = useFormSubmitResult();
  const { isError, isSuccess, isPending, error, mutate } = useMutations({
    key: 'add-financialstatus',
    url: '/financialstatus/add-financialstatus',
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
        fetchFinancialStatus
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof financialStatuschema>) => {
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
            <StudentInput form={form} />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stable">Stable</SelectItem>
                      <SelectItem value="Needs Aid">Needs Aid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} variant="default">
              {' '}
              Save Financial {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default financialstatusForm;
