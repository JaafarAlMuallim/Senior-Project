"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isSubmitting: boolean;
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SubmitButton = ({
  isSubmitting,
  text = "Submit Application",
  className = "w-full bg-primary-light hover:bg-primary-dark",
  onClick,
}: SubmitButtonProps) => (
  <Button
    type="submit"
    className={buttonVariants({
      variant: "default",
      className,
    })}
    onClick={onClick}
    disabled={isSubmitting}
  >
    {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : text}
  </Button>
);
export default SubmitButton;

