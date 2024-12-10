import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

export function DateSelect({
  field,
  dates,
}: {
  field: ControllerRenderProps<
    {
      tutor: string;
      course: string;
      date: Date;
      time: string;
    },
    "date"
  >;
  dates: Date[];
}) {
  return (
    <div className="flex w-full space-x-4">
      <div className="flex gap-2 justify-center items-center w-full">
        {dates.map((item) => (
          <Button
            key={item.toISOString()}
            type="button"
            variant="outline"
            onClick={() => field.onChange(item)}
            className={cn(
              "flex-shrink-0 h-20 w-16 flex flex-col gap-1 justify-center items-center p-1",
              item.toISOString() === field.value?.toISOString()
                ? "bg-primary-light text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground"
                : "",
            )}
          >
            <span className="text-lg font-semibold">{item.getDate()}</span>
            <span className="text-xs">
              {item.toLocaleString("default", {
                month: "short",
              })}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
