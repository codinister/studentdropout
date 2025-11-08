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
import { studentSchema } from '@/state/schemas/validationSchemas';
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
import { fetchStudents } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { studentFormSchema } from '@/state/schemas/formSchema';
import Levels from '../Levels';
import CountryDropdown from '../CountryDropdown';
import { ymd } from '@/utils/dateFormats';
const EditStudentForm = ({
  data,
}: {
  data: { studentId: number } & z.infer<typeof studentSchema>;
}) => {
  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      ...studentFormSchema({
        ...data,
        birthdate: ymd(new Date(data?.birthdate)),
        admissiondate: ymd(new Date(data?.admissiondate)),
      }),
    },
  });

  const { isPending, isSuccess, isError, error, mutate } = useMutations({
    key: 'update-student',
    url: '/students/update-student/' + data?.studentId,
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
        'Student updated successfully!',
        'Student Updated',
        fetchStudents
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof studentSchema>) => {
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
            <div className="flex gap-10">
              <div className="flex flex-col gap-4 ">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter student full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Levels form={form} />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          placeholder="Choose date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Entter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <CountryDropdown form={form} />

                <FormField
                  control={form.control}
                  name="residence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence</FormLabel>
                      <FormControl>
                        <Input placeholder="Entter residence" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admissiondate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admission Date</FormLabel>
                      <FormControl>
                        <Input placeholder="Entter admission date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isPending} variant="default">
              {' '}
              Save student {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditStudentForm;
