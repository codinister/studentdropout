'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useMutations from '@/state/query/useMutations';
import { settingsSchema } from '@/state/schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { z } from 'zod';
import { useEffect } from 'react';
import { fetchSettings } from '@/state/redux/slice/asyncThunkFn';
import useDispatchselector from '@/state/redux/useDispatchselector';
import useFormSubmitResult from '@/utils/useFormSubmitResult';
import Modal from '@/components/Modal';

const Settings = () => {
  const { dispatch, selector } = useDispatchselector();

  const res = selector((state) => state.settings);

  const { isPending, isError, isSuccess, mutate, error } = useMutations({
    key: 'settings',
    url: '/settings/update-settings/' + res[0]?.settingsId,
    method: 'Patch',
  });

  const { successResult, errorResult } = useFormSubmitResult();

  useEffect(() => {
    dispatch(fetchSettings());

    if (isError) {
      const message = error?.message || '';
      errorResult(message);
    }
    if (isSuccess) {
      errorResult('');
      successResult(
        'Settings updated successfully!',
        'Settings Updated',
        fetchSettings
      );
    }
  }, [dispatch,isError,isSuccess]);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      schoolName: res[0]?.schoolName || '',
      schoolPhone: res[0]?.schoolPhone || '',
      schoolWebsite: res[0]?.schoolWebsite || '',
      schoolLocation: res[0]?.schoolLocation || '',
      schoolPostalAddress: res[0]?.schoolPostalAddress || '',
    },
  });

  const handleSubmit = (data: z.infer<typeof settingsSchema>) => {
    mutate(data);
  };

  return (
    <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="shadow-lg mx-auto p-10 bg-white rounded-lg w-[400px] mt-4 "
      >
        <h6 className="bg-gray-200 p-4 mb-6">Settings Page</h6>
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Name of institution</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolPhone"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Institution Contact Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolWebsite"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolLocation"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolPostalAddress"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Postal Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} variant="default">
          {' '}
          Save settings {isPending ? <BeatLoader /> : ''}
        </Button>
      </form>
    </Form>
    </>
  );
};

export default Settings;
