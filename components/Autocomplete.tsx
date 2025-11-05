'use client';

import { useState } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

type AutocompleteType = {
  form: any;
  dataList: { label: string; value: string }[];
  label: string;
  fieldName: string;
  placeholder: string;
  defaultValue?: string
};

export function Autocomplete({ form, dataList, fieldName, label, placeholder, defaultValue='' }: AutocompleteType) {


  
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {

        const [open, setOpen] = useState(false);
        const selected = dataList.find((fw) => fw.value === field.value);


        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      'w-[200px] justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    { selected ? selected.label : defaultValue ? defaultValue:  placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={`Search ${label}...`} />
                  <CommandList>
                    <CommandEmpty>No {label} found.</CommandEmpty>
                    <CommandGroup>
                      {dataList.map((fw) => (
                        <CommandItem
                          key={fw.value}
                          value={fw.value}
                          onSelect={() => {
                            field.onChange(fw.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              fw.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {fw.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
