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
import { editStudentFormType } from '@/state/schemas/schemas';
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
import { useTransition } from 'react';
import { BeatLoader } from 'react-spinners';
import updateStudent from '@/state/actions/students/updateStudent';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import { fetchStudents } from '@/state/redux/slice/appReducer';
const EditStudentForm = ({
  data,
}: {
  data: z.infer<typeof editStudentFormType>;
}) => {
  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof editStudentFormType>>({
    resolver: zodResolver(editStudentFormType),
    defaultValues: {
      studentId: data.studentId,
      studentName: data.studentName,
      level: data.level,
      totalAttendance: data.totalAttendance,
      score: data.score,
    },
  });

  const [pending, startTransition] = useTransition();

  const handleSubmit = (data: z.infer<typeof editStudentFormType>) => {
    startTransition(() => {
      updateStudent(data)
        .then((res) => {
          if (res.success) {
            successResult(res.success, 'Student Updated', fetchStudents);
          } else if (res.error) {
            errorResult(res.error);
          }
        })
        .catch((err) => console.log(err));
    });
  };

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
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">Level 100</SelectItem>
                      <SelectItem value="200">Level 200</SelectItem>
                      <SelectItem value="300">Level 300</SelectItem>
                      <SelectItem value="400">Level 400</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalAttendance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Attendance %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total attendance"
                      {...field}
                    />
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
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Entter total score"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pending} variant="default">
              {' '}
              Update student {pending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditStudentForm;
