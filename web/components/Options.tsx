"use client";

import { Button } from "@/components/ui/button";

const Options = ({ options, handleAnswer }) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleAnswer(option)}
          className="bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default Options;
