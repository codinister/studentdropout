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
import {  attendanceRecordSchema } from '@/state/schemas/validationSchemas';
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
import { fetchAttendancerecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { attendanceRecordFormSchema} from '@/state/schemas/formSchema';
import useStudentInput from '@/utils/useStudentInput';
const EditAttendanceRecordForm = ({
  data,
}: {
  data: {studentId: number} & z.infer<typeof attendanceRecordSchema>;
}) => {

  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof attendanceRecordSchema>>({
    resolver: zodResolver(attendanceRecordSchema),
    defaultValues: {
      ...attendanceRecordFormSchema(data)
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-attendancerecord',
    url: '/attendancerecord/update-attendancerecord',
    method: 'Patch',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult('Attendance updated successfully!', 'Student Updated', fetchAttendancerecord);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof attendanceRecordSchema>) => {
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


            <StudentInput form={form} studentId={data?.studentId} />

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
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <Button disabled={isPending} variant="default">
              {' '}
              Update Attendance {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditAttendanceRecordForm
