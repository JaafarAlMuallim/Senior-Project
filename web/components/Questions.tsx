const Questions = ({ question }: { question: string }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Question</h2>
      <p className="mb-4 text-lg">{question}</p>
    </div>
  );
};

export default Questions;
