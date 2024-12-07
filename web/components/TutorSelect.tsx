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
import { ControllerRenderProps } from "react-hook-form";

export default function TutorSelect({
  field,
  className,
  data,
}: {
  field: ControllerRenderProps<any, "tutor">;
  className?: string;
  data: any[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild id="tutor">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "flex justify-between items-center",
            !field.value && "text-muted-foreground",
            className,
          )}
        >
          <div className={cn("flex gap-2 items-center", className)}>
            <UserRound className="h-4 w-4" />
            {field.value || "Select a Tutor"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command>
          <CommandList>
            <CommandEmpty>No Tutors Available</CommandEmpty>
            <CommandGroup>
              {data.map((grade) => (
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
