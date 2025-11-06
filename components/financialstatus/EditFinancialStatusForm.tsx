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
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchFinancialStatus } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { financialStatusFormSchema } from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
const EditFinancialRecordForm = ({
  data,
}: {
  data: { financialId: number } & z.infer<typeof financialStatuschema>;
}) => {
  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof financialStatuschema>>({
    resolver: zodResolver(financialStatuschema),
    defaultValues: {
      ...financialStatusFormSchema(data),
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-financialstatus',
    url: '/financialstatus/update-financialstatus/' + data?.financialId,
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
        'Financial status updated successfully!',
        'Financial Status Updated',
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
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Exempt">Exempt</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <Input type="number" {...field}  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} variant="default">
              {' '}
              Update Financial {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditFinancialRecordForm;
