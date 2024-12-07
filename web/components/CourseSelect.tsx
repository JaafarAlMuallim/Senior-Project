import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COURSES } from "@/validators/Placeholders";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Book, Check, ChevronsUpDown } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

export default function CourseSelect({
  field,
  className,
  data,
}: {
  field: ControllerRenderProps<any, "course">;
  className?: string;
  data: any[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild id="course">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "flex justify-between items-center",
            !field.value && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex gap-2 items-center">
            <Book className="h-4 w-4" />
            {field.value
              ? data.find((c) => c.value === field.value)?.label
              : "Select Course"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0 z-10", className)}>
        <Command>
          <CommandInput placeholder="Search Courses..." />
          <CommandList>
            <CommandEmpty>No Courses Available</CommandEmpty>
            <CommandGroup>
              {data.map((course) => (
                <CommandItem
                  key={course.value}
                  value={course.value}
                  onSelect={field.onChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      course.value === field.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {course.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
