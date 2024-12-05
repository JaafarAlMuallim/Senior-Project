"use client";

import { Button } from "@/components/ui/button";

const quizzes = [
  { title: "General Knowledge Quiz" },
  { title: "Math Quiz" },
  { title: "Science Quiz" },
];

const AllQuizzes = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-white p-6 rounded shadow-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">All Quizzes</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <Button
            className=" justify-start h-12 bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white"
          >
            {quiz.title}
          </Button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllQuizzes;
