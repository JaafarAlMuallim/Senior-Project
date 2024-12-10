"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
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

interface Item {
  value: string;
  label: string;
}

interface SingleSelectorProps {
  items: Item[];
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  className?: string;
  field: string;
}

export const SingleSelector = ({
  items,
  value,
  setValue,
  placeholder,
  searchPlaceholder,
  className,
  field,
}: SingleSelectorProps) => {
  const [localValue, setLocalValue] = useState<string>(value);
  const [open, setOpen] = useState(false);

  const memoizedItems = useMemo(() => items, [items]);

  const handleSelect = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      setOpen(false);
      // Debounce the update to parent component
      setTimeout(() => setValue(newValue), 100);
    },
    [setValue],
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const selectedItem = useMemo(
    () => memoizedItems.find((item) => item.value === localValue),
    [memoizedItems, localValue],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            !localValue ? "text-muted-foreground" : "",
            className,
          )}
        >
          {selectedItem ? selectedItem.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No {field} found.</CommandEmpty>
          <CommandList>
            <CommandItem key="all" value="" onSelect={() => handleSelect("")}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  localValue === "" ? "opacity-100" : "opacity-0",
                )}
              />
              All Courses
            </CommandItem>
            {memoizedItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    localValue === item.value ? "opacity-100" : "opacity-0",
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

// import { Check, ChevronsUpDown } from "lucide-react";
//
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
//
// export const SingleSelector = ({
//   items,
//   value,
//   setValue,
//   placeholder,
//   searchPlaceholder,
//   className,
//   field,
// }: {
//   items: { value: string; label: string }[];
//   value: string;
//   setValue: (value: string) => void;
//   placeholder: string;
//   searchPlaceholder: string;
//   className?: string;
//   field: string;
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           className={cn(
//             "justify-between",
//             !!value ? "" : "text-muted-foreground",
//             className,
//           )}
//         >
//           {value
//             ? items.find((item) => item.value === value)?.label
//             : placeholder}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className={cn("p-0")}>
//         <Command>
//           <CommandInput placeholder={searchPlaceholder} />
//           <CommandEmpty>No {field} found.</CommandEmpty>
//           <CommandList>
//             {items
//               ? items.map((item) => (
//                   <CommandItem
//                     key={item.value}
//                     value={item.value}
//                     onSelect={() => setValue(item.value)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         value === item.value ? "opacity-100" : "opacity-0",
//                       )}
//                     />
//                     {item.label}
//                   </CommandItem>
//                 ))
//               : null}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };
