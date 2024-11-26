import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GRADES } from "@/validators/option-validators";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, UserRound } from "lucide-react";

export function TutorSelect({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild id="tutor">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between w-[420px]",
            !field.value && "text-muted-foreground",
          )}
        >
          <div className="flex gap-2 items-center w-[420px]">
            <UserRound className="h-4 w-4" />
            {field.value || "Select a Tutor"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[440px]">
        <Command>
          <CommandList>
            <CommandEmpty>No Tutors Available</CommandEmpty>
            <CommandGroup>
              {GRADES.options.map((grade) => (
                <CommandItem
                  key={grade}
                  value={grade}
                  onSelect={field.onChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      grade === field.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {grade}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
