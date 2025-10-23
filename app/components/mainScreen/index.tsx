import { questions } from "@/app/types/questions";
import { useAnswers } from "@/app/hooks/useAnswers";
import { useFortuneLogic } from "@/app/hooks/useFortuneLogic";
import { StepQuestionForm } from "../stepQuestionForm";

export const MainScreen = ({ nickname }: { nickname: string }) => {
  const { answers, handleAnswerChange } = useAnswers();
  const { isLoading, result, handleSubmit } = useFortuneLogic(
    nickname,
    answers
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">みにしみ動物占い🔮</h1>
          <p className="text-blue-100">あなたの性格を12の質問で診断します</p>
        </div>
      </header>

      <main className="py-8">
        <StepQuestionForm
          questions={questions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onComplete={handleSubmit}
        />

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
