import { AnimalType, ANIMAL_TYPE_MAP } from "@/app/config";
import { FortuneResult } from "@/app/hooks/useFortuneLogic";

type ResultModalProps = {
  nickname: string;
  result: FortuneResult;
  onReset: () => void;
};

export const ResultModal = ({
  nickname,
  result,
  onReset,
}: ResultModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl text-center">
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-2xl font-bold mb-4 text-blue-600">
          {nickname}さんは
          <strong>
            {ANIMAL_TYPE_MAP[result.animalType as AnimalType] || "不明なタイプ"}
          </strong>
          です！
        </div>
        {result.resultUrl && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">診断結果はこちら</p>
            <a
              href={result.resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline break-all"
            >
              {result.resultUrl}
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
