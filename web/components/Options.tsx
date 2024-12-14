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
    <div className="flex flex-col space-y-2 mb-4 text-left">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleAnswer(option)}
          className={cn(
            "mx-0 flex justify-start items-center bg-option-default text-primary-black hover:bg-primary-light hover:text-white-default text-left",
            selectedOption === option
              ? "bg-primary-light text-white-default"
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
