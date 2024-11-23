import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";


export const SingleSelector = ({
  items,
  value,
  setValue,
  placeholder,
  searchPlaceholder,
}: {
  items: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="justify-between">
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
          <CommandList>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => setValue(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
