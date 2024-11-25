import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export const TimeSelector = ({
  field,
  type,
  getValue,
  setValue
}: {
  field: any;
  type: "hours" | "minutes";
  getValue: () => number;
  setValue: (value: number) => void;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`w-[${type === "hours" ? "80" : "70"}px] flex justify-between items-center`}
      >
        {getValue().toString().padStart(2, "0") || (type === "hours" ? "Hour" : "Min")}
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="p-0 w-[100px]">
      <Command>
        <CommandList>
          <CommandGroup>
            {Array.from({ length: type === "hours" ? 24 : 60 }).map((_, index) => (
              <CommandItem
                key={index}
                value={index.toString().padStart(2, "0")}
                onSelect={(value) => setValue(parseInt(value))}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    index === getValue() ? "opacity-100" : "opacity-0"
                  )}
                />
                {index.toString().padStart(2, "0")}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);