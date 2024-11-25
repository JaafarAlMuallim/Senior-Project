import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { COURSES } from "@/validators/Placeholders";
import { Check, ChevronsUpDown } from "lucide-react";

export const CourseSelect = ({
  field,
  form
}: {
  field: any; // TODO: Need to add a type
  form: any; // TODO: Need to add a type
}) => (
  <FormField
    control={form.control}
    name="course"
    render={({ field }) => (
      <FormItem className="w-full flex gap-4 justify-start items-center">
        <FormLabel htmlFor="course" className="w-24">Course</FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild id="course">
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full relative flex justify-between items-center text-start",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? `${COURSES.find((c) => c.value === field.value)?.label}`
                  : "Select Course"}
                <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search Courses..." />
                <CommandList>
                  <CommandEmpty>No Courses Available</CommandEmpty>
                  <CommandGroup>
                    {COURSES.map((course) => (
                      <CommandItem
                        value={course.value}
                        key={course.value}
                        onSelect={field.onChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            course.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
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
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
