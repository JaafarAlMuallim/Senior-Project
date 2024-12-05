"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const quizzes = [
  { title: "General Knowledge Quiz", id: "1" },
  { title: "Math Quiz", id: "2" },
  { title: "Science Quiz", id: "3" },
];

const AllQuizzes = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="bg-white p-6 rounded shadow-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">All Quizzes</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <Button
              key={quiz.id}
              className=" justify-start h-12 bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white"
              onClick={() => router.push(`/material/courses/${quiz.id}`)}
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
