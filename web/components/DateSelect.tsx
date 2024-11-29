import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function DateSelect({ field, dates }: { field: any; dates: any[] }) {
  return (
    <ScrollArea className="w-[420px] whitespace-nowrap backdrop-blur-lg">
      <div className="flex w-max space-x-4">
        <div className="flex gap-2">
          {dates.map((item) => (
            <Button
              key={item.date.toISOString()}
              type="button"
              variant="outline"
              onClick={() => field.onChange(item.date)}
              className={cn(
                "flex-shrink-0 h-20 w-16 flex flex-col gap-1 justify-center items-center p-1",
                item.date.toISOString() === field.value?.toISOString()
                  ? "bg-primary-light text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground"
                  : "",
              )}
            >
              <span className="text-lg font-semibold">
                {item.date.getDate()}
              </span>
              <span className="text-xs">
                {item.date.toLocaleString("default", {
                  month: "short",
                })}
              </span>
            </Button>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
