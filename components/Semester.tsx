'use client';

import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Semester = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="semester"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Semester</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value?.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="First Semester">First Semester</SelectItem>
              <SelectItem value="Second Semester">Second Semester</SelectItem>
              <SelectItem value="Third Semester">Third Semester</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};



export default Semester
