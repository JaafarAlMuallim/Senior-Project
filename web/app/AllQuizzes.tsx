"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const Quiz: React.FC<{ quiz: Quiz; onDelete: (id: number) => void }> = ({
  quiz,
  onDelete,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleQuizClick = () => {
    console.log(`Navigating to quiz: ${quiz.title}`);
  };

  const handleDeleteWithConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const confirmDelete = () => {
    setIsConfirmationOpen(false);
    onDelete(quiz.id);
  };

  const cancelDelete = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div
      className="bg-white-default shadow-md rounded-lg p-6 flex items-center hover:shadow-lg hover:bg-primary-light cursor-pointer"
      onClick={handleQuizClick}
    >
      <span className="quiz-icon mr-2 text-3xl">📚</span>
      <span className="quiz-title flex-grow font-semibold text-lg hover:text-white">
        {quiz.title}
      </span>
      <div className="quiz-options relative mb-4">
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOptionsOpen((prev) => !prev);
          }}
        >
          ...
        </button>
        {isOptionsOpen && (
          <ul className="absolute bg-white-default shadow-md rounded-lg p-2">
            <li>
              <button
                className="bg-white-default rounded-md text-black w-20 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-primary-light cursor-pointer"
                onClick={() => {
                  setIsOptionsOpen(false);
                  handleDeleteWithConfirmation();
                }}
              >
                Delete
              </button>
            </li>
            <li>
              <button
                className="bg-white rounded-md text-black w-20 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-primary-light cursor-pointer"
                onClick={() => setIsOptionsOpen(false)}
              >
                Close
              </button>
            </li>
          </ul>
        )}
        {isConfirmationOpen && (
          <Dialog
            open={isConfirmationOpen}
            onOpenChange={setIsConfirmationOpen}
          >
            <DialogContent>
              <DialogTitle>Delete Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this quiz?
              </DialogDescription>
              <div className="mt-4 flex justify-end gap-4">
                <Button onClick={cancelDelete} variant="outline">
                  Cancel
                </Button>
                <Button onClick={confirmDelete} className="bg-primary-light">
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

const QuizzesPage = () => {
  const [sorted, setSorted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState(QUIZZES);

  const toggleSort = () => {
    setSorted((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteQuiz = (id: number) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Quiz key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default QuizzesPage;
