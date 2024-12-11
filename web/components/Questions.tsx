"use client";

const Questions = ({ question }: { question: string }) => {
  return (
    <div>
      <p className="mb-4 text-lg">{question}</p>
    </div>
  );
};

export default Questions;
