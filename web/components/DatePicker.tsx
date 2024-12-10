import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import TimePicker from "@/components/TimePicker";
import { ControllerRenderProps } from "react-hook-form";

const DatePicker = ({
  field,
}: {
  field: ControllerRenderProps<any, "date">;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-full relative flex justify-between items-center text-start",
          !field.value && "text-muted-foreground",
        )}
      >
        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
        <CalendarIcon className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
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
            <TimePicker
              type="hours"
              getValue={() => field.value.getHours()}
              setValue={(hour) => {
                const newDate = new Date(field.value);
                newDate.setHours(hour);
                field.onChange(newDate);
              }}
            />
            <TimePicker
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
);
export default DatePicker;
