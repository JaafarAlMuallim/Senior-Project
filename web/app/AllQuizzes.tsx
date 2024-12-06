"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const QUIZZES = [
  { id: 1, title: "Chapter 1 Quiz" },
  { id: 2, title: "Chapter 2 Quiz" },
  { id: 3, title: "Chapter 3 Quiz" },
  { id: 4, title: "Chapter 4 Quiz" },
];

interface Quiz {
  id: number;
  title: string;
}

const Quiz = ({ quiz }: { quiz: Quiz }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white-default shadow-md rounded-lg p-6 flex items-center hover:shadow-lg hover:bg-primary-light cursor-pointer"
      onClick={() => router.push(`/material/courses/quizzes/${quiz.id}`)}
    >
      <span className="quiz-icon mr-2 text-3xl">📚</span>
      <span className="quiz-title flex-grow font-semibold text-lg hover:text-white">
        {quiz.title}
      </span>
      <div className="quiz-options relative mb-4">
        <Link href={`/material/courses/quizzes/${quiz.id}`}></Link>
      </div>
    </div>
  );
};

const QuizzesPage = () => {
  const [sorted, setSorted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSort = () => {
    setSorted((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuizzes = QUIZZES.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedQuizzes = sorted
    ? [...filteredQuizzes].sort((a, b) => a.title.localeCompare(b.title))
    : filteredQuizzes;

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Math</h1>
        <h2 className="text-xl">Quizzes</h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-md"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSort}
              className="text-black hover:bg-blue-100 font-bold py-2 px-4 rounded flex items-center"
            >
              <span className="material-icons">☰⬇</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col item-center gap-4">
          {sortedQuizzes.map((quiz) => (
            <Quiz key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default QuizzesPage;
