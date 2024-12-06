"use client";

import { useState } from "react";
import Options from "@/components/Options";
import Questions from "@/components/Questions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([] as string[]);

  const router = useRouter();

  const handleAnswer = (selectedOption: string) => {
    setUserAnswers([...userAnswers, selectedOption]);
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };
  const handleQuestions = (add: number) => {
    if (currentQuestionIndex === 0 && add === -1) {
      return;
    }
    if (currentQuestionIndex === questions.length - 1 && add === 1) {
      setIsQuizCompleted(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + add);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen justify-center">
      {isQuizCompleted ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">
            Your score: {score} out of {questions.length}
          </p>
          <h3 className="text-lg font-semibold mb-4">Review Your Answers:</h3>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <p className="font-semibold">{question.question}</p>
                <ul className="list-disc ml-5">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={`py-1 ${
                        userAnswers[index] === option
                          ? userAnswers[index] === question.answer
                            ? "text-green-600"
                            : "text-red-600"
                          : ""
                      }`}
                    >
                      {option}
                      {userAnswers[index] === option && (
                        <span
                          className={`ml-2 font-semibold ${
                            userAnswers[index] === question.answer
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {userAnswers[index] === question.answer
                            ? "Correct"
                            : "Incorrect"}
                        </span>
                      )}
                      {option === question.answer && (
                        <span className="ml-2 text-green-600 font-semibold">
                          Correct Answer
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              onClick={restartQuiz}
              className="bg-primary-light text-primary-white hover:bg-primary-dark"
            >
              Re-Take Quiz
            </Button>
            <Button
              onClick={() => {
                router.push("/material/courses");
              }}
              className="bg-secondary-light text-secondary-black hover:bg-secondary-dark"
            >
              Return to Quizzes
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <Questions question={questions[currentQuestionIndex].question} />
          <Options
            options={questions[currentQuestionIndex].options}
            handleAnswer={handleAnswer}
            selectedOption={userAnswers[currentQuestionIndex]}
          />
          <div className="flex justify-between">
            <Button
              disabled={currentQuestionIndex === 0}
              onClick={handleQuestions.bind(null, -1)}
              className="bg-white-light text-primary-black hover:bg-primary-light hover:text-primary-white"
            >
              Previous
            </Button>
            <Button
              onClick={handleQuestions.bind(null, 1)}
              disabled={userAnswers.length < currentQuestionIndex + 1}
              className="bg-primary-light text-primary-white"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
