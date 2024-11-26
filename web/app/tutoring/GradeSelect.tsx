import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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
import { GRADES } from "@/validators/option-validators";
import { Check, ChevronsUpDown, GraduationCap } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

export const GradeSelect = ({
  field,
  className,
}: {
  field: ControllerRenderProps<any, "grade">;
  className?: string;
}) => (
  <Popover>
    <PopoverTrigger asChild id="grade">
      <Button
        variant="outline"
        role="combobox"
        className={cn(
          "relative flex justify-between items-center text-start w-full",
          !field.value && "text-muted-foreground",
          className,
        )}
      >
        <div className="flex gap-2 items-center">
          <GraduationCap />
          {field.value ?? "Select Your Grade"}
        </div>
        <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className={cn("p-0", className)}>
      <Command>
        <CommandList>
          <CommandEmpty>No Grades Available</CommandEmpty>
          <CommandGroup>
            {GRADES.options.map((grade) => (
              <CommandItem value={grade} key={grade} onSelect={field.onChange}>
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
