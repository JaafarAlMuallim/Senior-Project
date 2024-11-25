import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { TimeSelector } from "./TimeSelector";

export const DateSelect = ({
  field,
  form
}: {
  field: any;
  form: any;
}) => (
  <FormField
    control={form.control}
    name="date"
    render={({ field }) => (
      <FormItem className="w-full flex gap-4 justify-start items-center">
        <FormLabel htmlFor="grade" className="w-24">Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full relative flex justify-between items-center text-start",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date()}
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between">
                <Clock className="h-4 w-4 opacity-50" />
                <div className="flex flex-row gap-2">
                  <TimeSelector
                    field={field}
                    type="hours"
                    getValue={() => field.value.getHours()}
                    setValue={(hour) => {
                      const newDate = new Date(field.value);
                      newDate.setHours(hour);
                      field.onChange(newDate);
                    }}
                  />
                  <TimeSelector
                    field={field}
                    type="minutes"
                    getValue={() => field.value.getMinutes()}
                    setValue={(minute) => {
                      const newDate = new Date(field.value);
                      newDate.setMinutes(minute);
                      field.onChange(newDate);
                    }}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);