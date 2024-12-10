import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

export function TimeSelect({
  field,
  times,
}: {
  field: ControllerRenderProps<
    {
      tutor: string;
      course: string;
      date: Date;
      time: string;
    },
    "time"
  >;
  times: string[];
}) {
  return (
    <ScrollArea className="w-[420px] whitespace-nowrap backdrop-blur-lg">
      <div className="flex w-max space-x-4">
        <div className="flex gap-2 justify-center items-center w-full">
          {times.map((item) => (
            <Button
              key={item}
              type="button"
              variant="outline"
              onClick={() => field.onChange(item)}
              className={cn(
                "flex-shrink-0 h-20 w-16 flex flex-col gap-1 justify-center items-center p-1",
                item === field.value
                  ? "bg-primary-light text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground"
                  : "",
              )}
            >
              <span className="text-lg font-semibold">{item}</span>
            </Button>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
