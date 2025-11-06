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
import { interventionSchema } from '@/state/schemas/validationSchemas';
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
import { fetchIntervention } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { interventionFormSchema } from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
import { ymd } from '@/utils/dateFormats';
const EditInterventionForm = ({
  data,
}: {
  data: { interventionId: number } & z.infer<typeof interventionSchema>;
}) => {
  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof interventionSchema>>({
    resolver: zodResolver(interventionSchema),
    defaultValues: {
      ...interventionFormSchema({...data, date: ymd(new Date(data?.date))}),
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-intervention',
    url: '/intervention/update-intervention/' + data?.interventionId,
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
        'Intervention updated successfully!',
        'Intervention Updated',
        fetchIntervention
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof interventionSchema>) => {
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intervention Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Intervention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic Interventions">
                        Academic Interventions
                      </SelectItem>
                      <SelectItem value="Behavioral & Engagement Interventions">
                        Behavioral & Engagement Interventions
                      </SelectItem>
                      <SelectItem value="Financial Interventions">
                        Financial Interventions
                      </SelectItem>
                      <SelectItem value="Advisory & Counseling Interventions">
                        Advisory & Counseling Interventions
                      </SelectItem>
                      <SelectItem value="Institutional or System-Level">
                        Institutional or System-Level Interventions
                      </SelectItem>
                      <SelectItem value="Technology-Based Interventions">
                        Technology-Based Interventions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outcome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} placeholder="Choose date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} variant="default">
              {' '}
              Save intervention {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditInterventionForm;
