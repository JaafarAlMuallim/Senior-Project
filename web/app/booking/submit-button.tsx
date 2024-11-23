import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({ isSubmitting }: { isSubmitting: boolean; }) {
  return (
    <Button
      type="submit"
      className={buttonVariants({
        variant: "default",
        className: "w-full bg-primary-light hover:bg-primary-dark",
      })}
    >
      {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Submit Application"}
    </Button>
  );
}
