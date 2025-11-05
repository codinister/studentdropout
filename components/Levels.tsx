'use client';

import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Levels = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="level"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Level</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value?.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Level 100">Level 100</SelectItem>
              <SelectItem value="Level 200">Level 200</SelectItem>
              <SelectItem value="Level 300">Level 300</SelectItem>
              <SelectItem value="Level 400">Level 400</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Levels;
