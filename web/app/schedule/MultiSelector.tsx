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

export const MultiSelector = ({
  title,
  items,
  selected,
  setSelected,
  searchPlaceholder,
  className,
}: {
  title: string;
  items: string[];
  selected: string[];
  setSelected: (value: string[]) => void;
  searchPlaceholder: string;
  className?: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            `justify-between`,
            className,
            selected.length === 0 ? "text-muted-foreground" : "",
          )}
        >
          {`${title} (${selected.length})`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`p-0`, className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
          <CommandList>
            {items.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={() => {
                  setSelected(
                    selected.includes(item)
                      ? selected.filter((i) => i !== item)
                      : [...selected, item],
                  );
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(item) ? "opacity-100" : "opacity-0",
                  )}
                />
                {item}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
