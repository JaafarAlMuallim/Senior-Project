import Quiz from "@/components/Quiz";

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <Quiz />
    </div>
  );
};

export default QuizPage;
