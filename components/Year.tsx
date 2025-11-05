'use client';

import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Year = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="year"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Year</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value?.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2028">2028</SelectItem>
              <SelectItem value="2029">2029</SelectItem>
              <SelectItem value="2030">2030</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Year;
