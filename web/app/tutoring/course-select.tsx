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
import { Book, Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

type CourseSelectProps = {
  form: UseFormReturn<FormValues>;
};

export const CourseSelect = ({ form }: CourseSelectProps) => (
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
                  "relative flex justify-between items-center text-start w-full",
                  !field.value && "text-muted-foreground",
                )}
              >
                <div className="flex gap-2 items-center">
                  <Book />
                  {field.value
                    ? `${COURSES.find((c) => c.value === field.value)?.label}`
                    : "Select Course"}
                </div>
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
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);