import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import { GRADES } from "@/validators/option-validators";
import { Check, ChevronsUpDown, GraduationCap } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

type GradeSelectProps = {
  form: UseFormReturn<FormValues>;
};

export const GradeSelect = ({ form }: GradeSelectProps) => (
  <FormField
    control={form.control}
    name="grade"
    render={({ field }) => (
      <FormItem className="w-full flex gap-4 justify-start items-center">
        <FormLabel htmlFor="grade" className="w-24">Grade</FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild id="grade">
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "relative flex justify-between items-center text-start w-full",
                  !field.value && "text-muted-foreground",
                )}
              >
                <div className="flex gap-2 items-center">
                  <GraduationCap />
                  {field.value ?? "Select Your Grade"}
                </div>
                <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No Grades Available</CommandEmpty>
                  <CommandGroup>
                    {GRADES.options.map((grade) => (
                      <CommandItem
                        value={grade}
                        key={grade}
                        onSelect={field.onChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            grade === field.value
                              ? "opacity-100"
                              : "opacity-0",
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
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);