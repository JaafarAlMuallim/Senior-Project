const preprocess = (rawString: string) => {
  // Step 1: Remove the markdown-like code block syntax
  let cleanedString = rawString.replace(/```json|```/g, "").trim();

  // Step 2: Replace invalid escape sequences and unnecessary symbols
  cleanedString = cleanedString.replace(/\\[^\ntrbfu"'\\]/g, ""); // Remove invalid escape sequences
  cleanedString = cleanedString.replace(/\\n/g, ""); // Remove literal newlines (\n)

  // Step 3: Parse the cleaned string into JSON
  try {
    const parsedQuestions = JSON.parse(cleanedString);

    // Define TypeScript type for validation
    type Question = {
      question: string;
      options: string[];
      answer: string;
    };

    // Validate and type-check
    const typedQuestions: Question[] = parsedQuestions;

    return typedQuestions;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
};
export default preprocess;
