"use client";

import { useState } from "react";
import Options from "@/components/Options";
import Questions from "@/components/Questions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";

type Question = {
  quizId: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  options: string[];
  question: string;
  correctAnswer: string;
};

const Quiz = ({ questions }: { questions: Question[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null),
  );

  const router = useRouter();

  const handleAnswer = (selectedOption: string) => {
    const newUserAnswers = [...userAnswers];
    const oldAnswer = newUserAnswers[currentQuestionIndex];
    newUserAnswers[currentQuestionIndex] = selectedOption;

    setUserAnswers(newUserAnswers);

    // Update score
    if (oldAnswer !== selectedOption) {
      if (oldAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score - 1);
      }
      if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleQuestions = (add: number) => {
    const newIndex = currentQuestionIndex + add;
    if (newIndex >= 0 && newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex);
    }
    if (newIndex === questions.length) {
      setIsQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(Array(questions.length).fill(null));
    setIsQuizCompleted(false);
  };

  return (
    <MaxWidthWrapper className="flex flex-col items-center sm:p-6 min-h-screen justify-center w-full">
      {isQuizCompleted ? (
        <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-base sm:text-lg mb-4">
            Your score: {score} out of {questions.length}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Review Your Answers:</h3>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <p className="font-semibold text-base sm:text-lg">{question.question}</p>
                <ul className="ml-5 list-none">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={cn(
                        "py-1",
                        option === question.correctAnswer
                          ? "text-green-600"
                          : "",
                        userAnswers[index] === option &&
                          userAnswers[index] !== question.correctAnswer
                          ? "text-red-600"
                          : "",
                      )}
                    >
                      {option}
                      {userAnswers[index] === option && " (Your answer)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row">
            <Button
              onClick={restartQuiz}
              className="bg-primary-light text-primary-white hover:bg-primary-dark"
            >
              Re-Take Quiz
            </Button>
            <Button
              onClick={() => {
                router.push("/home/");
              }}
              className="bg-secondary-light text-secondary-black hover:bg-secondary-dark"
            >
              Return to Home
            </Button>
          </div>
        </div>
      ) : (
        <Card className="w-full max-w-md sm:max-w-lg">
          <CardContent className="p-4 sm:p-6">
            <Questions question={questions[currentQuestionIndex].question} />
            <Options
              options={questions[currentQuestionIndex].options}
              handleAnswer={handleAnswer}
              selectedOption={userAnswers[currentQuestionIndex]!}
            />
            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
              <Button
                onClick={() => handleQuestions(-1)}
                disabled={currentQuestionIndex === 0}
                className="bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white sm:w-auto"
              >
                Previous
              </Button>
              <Button
                onClick={() => handleQuestions(1)}
                className="bg-primary-light text-white-default hover:bg-primary-dark sm:w-auto"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </MaxWidthWrapper>
  );
};

export default Quiz;
