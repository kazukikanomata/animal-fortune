import { Question } from "@/app/types/questions";
import { useState, useEffect, useCallback } from "react";

type Props = {
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  onComplete: () => void;
  resetTrigger?: number;
};

export const StepQuestionForm = ({
  questions,
  answers,
  onAnswerChange,
  onComplete,
  resetTrigger = 0,
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
  }, [resetTrigger]);

  // 回答時に自動で次の質問に遷移
  const handleAnswerChange = (questionId: string, value: string) => {
    onAnswerChange(questionId, value);

    // アニメーション効果
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // 最後の質問の場合は完了処理
        onComplete();
      }
      setIsTransitioning(false);
    }, 300);
  };

  // 前の質問に戻る
  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentStep]);

  // 次の質問に進む（回答済みの場合のみ）
  const goToNext = useCallback(() => {
    const currentQuestion = questions[currentStep];
    if (answers[currentQuestion.id] && currentStep < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [answers, currentStep, questions]);

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentStep > 0) {
        goToPrevious();
      } else if (
        e.key === "ArrowRight" &&
        answers[questions[currentStep]?.id]
      ) {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, answers, questions]);

  const currentQuestion = questions[currentStep];
  const progressPercentage = ((currentStep + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* 質問カード */}
      <div
        className={`transition-all duration-300 ${
          isTransitioning
            ? "opacity-0 transform translate-x-4"
            : "opacity-100 transform translate-x-0"
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 text-gray-600 rounded-full text-lg font-bold mb-4">
              {currentStep + 1}
            </div>
            <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.title}
            </h2>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`block p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                  answers[currentQuestion.id] === option.value
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, option.value)
                    }
                    className="radio radio-neutral mt-1 mr-4 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-base leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {/* ここにたしていいんじゃね */}
          {/* 進捗バー */}
          <div className="mb-8 mt-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
              <span className="font-medium">
                質問 {currentStep + 1} / {questions.length}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {answeredCount}問回答済み
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gray-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {Math.round(progressPercentage)}% 完了
            </div>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between items-center">
            <button
              onClick={goToPrevious}
              disabled={currentStep === 0}
              className={`px-4 py-3 rounded-lg text-sm font-normal transition-all duration-200 flex items-center justify-center ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              前の質問
            </button>

            <div className="text-sm text-gray-500">
              {currentStep > 0 && <span>← 矢印キーでナビゲーション</span>}
            </div>

            <button
              onClick={goToNext}
              disabled={
                !answers[currentQuestion.id] ||
                currentStep === questions.length - 1
              }
              className={`px-4 py-3 rounded-lg text-sm font-normal transition-all duration-200 flex items-center justify-center ${
                !answers[currentQuestion.id] ||
                currentStep === questions.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-md"
              }`}
            >
              次の質問
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
