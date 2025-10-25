import { questions } from "@/app/types/questions";
import { useAnswers } from "@/app/hooks/useAnswers";
import { StepQuestionForm } from "../stepQuestionForm";
import { FortuneResult } from "@/app/hooks/useFortuneLogic";
import Image from "next/image";

type MainScreenProps = {
  isLoading: boolean;
  result: FortuneResult | null;
  resetTrigger?: number;
  onComplete: () => void;
};

export const MainScreen = ({
  isLoading,
  result,
  onComplete,
  resetTrigger,
}: MainScreenProps) => {
  const { answers, handleAnswerChange } = useAnswers();
  return (
    <div className="">
      <main className="py-8">
        <StepQuestionForm
          questions={questions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onComplete={onComplete}
          resetTrigger={resetTrigger}
        />

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4">
                <Image
                  width={150}
                  height={200}
                  src="/awaawa.png"
                  alt="みにしみローディング"
                />
              </div>
              <p className="text-lg font-medium text-gray-700">占い中...</p>
              <p className="text-sm text-gray-500 mt-2">
                しばらくお待ちください
              </p>
            </div>
          </div>
        )}

        {result && !result.success && (
          <div className="max-w-3xl mx-auto px-4 mt-8">
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="text-red-500 mr-3">⚠️</div>
                <div>
                  <h3 className="font-semibold">エラーが発生しました</h3>
                  <p className="text-sm mt-1">{result.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
