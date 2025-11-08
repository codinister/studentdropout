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
import { academicRecordSchema } from '@/state/schemas/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import useMutations from '@/state/query/useMutations';
import { useEffect } from 'react';
import { academicRecordFormSchema } from '@/state/schemas/formSchema';
import Semester from '../Semester';
import Year from '../Year';
import useStudentInput from '@/utils/useStudentInput';
import useSubjectInput from '@/utils/useSubjectInput';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const AcademicRecordForm = () => {
  const form = useForm<z.infer<typeof academicRecordSchema>>({
    resolver: zodResolver(academicRecordSchema),
    defaultValues: academicRecordFormSchema({}),
  });

  const { successResult, errorResult } = useFormSubmitResult();
  const { isError, isSuccess, isPending, error, mutate } = useMutations({
    key: 'add-academicrecord',
    url: '/academicrecord/add-academicrecord',
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Academicrecord added successfully!',
        'Academicrecord Added',
        fetchAcademicrecord
      );
    }
  }, [isError, isSuccess]);

  const handleSubmit = (data: z.infer<typeof academicRecordSchema>) => {
    mutate(data);
  };

  const { StudentInput } = useStudentInput();
  const { SubjectInput } = useSubjectInput();

  return (
    <>
      <div className="bg-white p-10 rounded-3xl w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-10">
              <div className="flex-col gap-4 flex">
                <SubjectInput form={form} />
                <Semester form={form} />
                <Year form={form} />
                <StudentInput form={form} />
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="School of Technology">School of Technology</SelectItem>
                            <SelectItem value="School of Business & Communication">School of Business & Communication</SelectItem>
                            <SelectItem value="School of Fashion & Design">School of Fashion & Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter GPA" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attendance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendance</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter attendance" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exams Score</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter total score" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isPending} variant="default">
              {' '}
              Save Academicrecord {isPending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AcademicRecordForm;
