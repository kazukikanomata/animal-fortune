import { useState } from "react";

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };
  const resetAnswers = () => {
    setAnswers({});
  };
  return { answers, handleAnswerChange, resetAnswers };
};
