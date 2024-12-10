"use client";

import React, { useState, useCallback, useMemo } from "react";
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

interface MultiSelectorProps {
  title: string;
  items: Item[];
  selected: string[];
  setSelected: (value: string[]) => void;
  searchPlaceholder: string;
  className?: string;
}

export const MultiSelector: React.FC<MultiSelectorProps> = ({
  title,
  items,
  selected,
  setSelected,
  searchPlaceholder,
  className,
}) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [open, setOpen] = useState(false);

  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items]);

  const handleSelect = useCallback(
    (value: string) => {
      setLocalSelected((prev) => {
        const newSelected = prev.includes(value)
          ? prev.filter((i) => i !== value)
          : [...prev, value];

        // Debounce the update to parent component
        setTimeout(() => setSelected(newSelected), 100);

        return newSelected;
      });
    },
    [setSelected],
  );

  // Update local state when props change
  React.useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            className,
            localSelected.length === 0 ? "text-muted-foreground" : "",
          )}
        >
          {`${title} (${localSelected.length})`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
          <CommandList>
            {memoizedItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    localSelected.includes(item.value)
                      ? "opacity-100"
                      : "opacity-0",
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
// export const MultiSelector = ({
//   title,
//   items,
//   selected,
//   setSelected,
//   searchPlaceholder,
//   className,
// }: {
//   title: string;
//   items: {
//     value: string;
//     label: string;
//   }[];
//   selected: string[];
//   setSelected: (value: string[]) => void;
//   searchPlaceholder: string;
//   className?: string;
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           className={cn(
//             `justify-between`,
//             className,
//             selected.length === 0 ? "text-muted-foreground" : "",
//           )}
//         >
//           {`${title} (${selected.length})`}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className={cn(`p-0`, className)}>
//         <Command>
//           <CommandInput placeholder={searchPlaceholder} />
//           <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
//           <CommandList>
//             {items
//               ? items.map((item) => (
//                   <CommandItem
//                     key={item.value}
//                     value={item.value}
//                     onSelect={() => {
//                       if (selected.includes(item.value)) {
//                         setSelected(selected.filter((i) => i !== item.value));
//                       } else {
//                         setSelected([...selected, item.value]);
//                       }
//                     }}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         selected.includes(item.value)
//                           ? "opacity-100"
//                           : "opacity-0",
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
