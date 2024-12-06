import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import Quiz from "@/components/Quiz";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";

const QuizPage = async ({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) => {
  const { quizId } = await params;
  const questions = await trpc.courses.getQuiz({ quizId });
  if (!questions) {
    return <NoDataFound />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Quiz questions={questions.Question} />
    </Suspense>
  );
};

export default QuizPage;
