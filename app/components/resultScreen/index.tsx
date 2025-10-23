import { AnimalType, ANIMAL_TYPE_MAP } from "@/app/config";
import { FortuneResult } from "@/app/hooks/useFortuneLogic";

type ResultScreenProps = {
  nickname: string;
  result: FortuneResult;
  onReset: () => void;
};

export const ResultScreen = ({
  nickname,
  result,
  onReset,
}: ResultScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl text-center">
        <div className="text-6xl mb-4">🎉</div>
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>ようこそ{nickname}さん！</span>
          </div>
        </div>
        <div className="text-2xl font-bold mb-4 text-blue-600">
          あなたは
          <strong>
            {ANIMAL_TYPE_MAP[result.animalType as AnimalType] || "不明なタイプ"}
          </strong>
          です！
        </div>
        {result.url && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">診断結果はこちら</p>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline break-all"
            >
              {result.url}
            </a>
          </div>
        )}
        <button
          onClick={onReset}
          className="btn-wide bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          もう一度占う
        </button>
      </div>
    </div>
  );
};
