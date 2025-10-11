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
import { EditUserFormType } from '@/state/schemas/schemas';
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
import { useTransition, useState } from 'react';
import { fetchUsers, modalShow } from '@/state/redux/slice/appReducer';
import SuccessMessage from '../SuccessMessage';
import WarningMessage from '../WarningMessage';
import { BeatLoader } from 'react-spinners';
import useDispatchselector from '@/state/redux/useDispatchselector';
import updateUser from '@/state/actions/updateUser';
import useFormSubmitResult from '@/utils/useFormSubmitResult';

const EditUserForm = ({ data }: { data: z.infer<typeof EditUserFormType> }) => {
  const { dispatch } = useDispatchselector();

  const { successResult, errorResult } = useFormSubmitResult();

  const form = useForm<z.infer<typeof EditUserFormType>>({
    resolver: zodResolver(EditUserFormType),
    defaultValues: {
      userId: data.userId,
      name: data.name,
      roleId: data.roleId,
      password: '',
      email: data.email,
    },
  });

  const [pending, startTransition] = useTransition();

  const handleSubmit = (data: z.infer<typeof EditUserFormType>) => {
    startTransition(() => {
      updateUser(data)
        .then((res) => {
          if (res.success) {
            successResult(res.success);
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
            {/* Role Select */}
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Administrators</SelectItem>
                      <SelectItem value="2">Academic Advisors</SelectItem>
                      <SelectItem value="3">Counselors</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pending} variant="default">
              {' '}
              Save user {pending ? <BeatLoader /> : ''}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditUserForm;
