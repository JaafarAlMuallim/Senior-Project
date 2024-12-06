"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Options = ({
  options,
  handleAnswer,
  selectedOption,
}: {
  options: string[];
  handleAnswer: (selectedOption: string) => void;
  selectedOption: string;
}) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleAnswer(option)}
          className={cn(
            "bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white",
            selectedOption === option
              ? "bg-primary-light text-primary-white"
              : "",
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default Options;
