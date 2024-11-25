import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COURSES } from "@/validators/Placeholders";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Book, Check, ChevronsUpDown, Command } from "lucide-react";

export function CourseSelect({ field }: { field: any; }) {
  return (
    <Popover>
      <PopoverTrigger asChild id="course">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between w-[420px]",
            !field.value && "text-muted-foreground"
          )}
        >
          <div className="flex gap-2 items-center">
            <Book className="h-4 w-4" />
            {field.value
              ? COURSES.find((c) => c.value === field.value)
                ?.label
              : "Select Course"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[420px]">
        <Command>
          <CommandInput placeholder="Search Courses..." />
          <CommandList>
            <CommandEmpty>No Courses Available</CommandEmpty>
            <CommandGroup>
              {COURSES.map((course) => (
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
                        : "opacity-0"
                    )} />
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
