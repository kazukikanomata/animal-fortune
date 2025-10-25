import { AnimalType, ANIMAL_TYPE_MAP } from "@/app/config";
import { FortuneResult } from "@/app/hooks/useFortuneLogic";
import Image from "next/image";

const UNKNOWN_TYPE_TEXT = "不明なタイプ";
const RESULT_LINK_TEXT = "診断結果はこちら";
const RESET_BUTTON_TEXT = "もう一度占う";
const ANIMAL_TYPE_KEYS = Object.keys(ANIMAL_TYPE_MAP) as AnimalType[];

type ResultModalProps = {
  nickname: string;
  result: FortuneResult;
  onReset: () => void;
};

const getAnimalTypeName = (animalType: FortuneResult["animalType"]): string => {
  if (ANIMAL_TYPE_KEYS.includes(animalType as AnimalType)) {
    const typeKey = animalType as AnimalType;
    return ANIMAL_TYPE_MAP[typeKey];
  }
  return UNKNOWN_TYPE_TEXT;
};

/**
 * 外部リンクアイコンコンポーネント
 */
const ExternalLinkIcon = () => (
  <div className="mr-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  </div>
);

/**
 * 診断結果のURLを表示するサブコンポーネント
 */

const ResultButton = ({ resultUrl }: { resultUrl: string }) => (
  // ボタンにしたい
  <div className="mb-6">
    {/* 診断結果はこちら */}
    <div className="flex justify-center">
      <a
        href={resultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center 
          bg-green-500 text-white 
          px-6 py-3 rounded-xl 
          hover:bg-green-600 
          shadow-md transition-colors 
          text-decoration-none
          w-full sm:w-auto"
      >
        <ExternalLinkIcon />
        <span className="break-all">{RESULT_LINK_TEXT}</span>
      </a>
    </div>
  </div>
);

const ModalContent = ({ nickname, result, onReset }: ResultModalProps) => {
  const animalTypeName = getAnimalTypeName(result.animalType);
  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-2xl text-center">
      <div className="flex items-center justify-center mb-2">
        <Image
          src="/pesipesi.png"
          alt="ぺしぺし画像"
          width={300}
          height={400}
        />
      </div>
      <div className="text-xl font-bold mb-6 text-black">
        \ {nickname}さんは
        <span className="text-red-400">{animalTypeName}</span>
        です！！/
      </div>
      {result.resultUrl && <ResultButton resultUrl={result.resultUrl} />}
      <button
        onClick={onReset}
        className="bg-transparent text-gray-500 underline pb-2 hover:bg-gray-200"
      >
        {RESET_BUTTON_TEXT}
      </button>
    </div>
  );
};

export const ResultModal = (props: ResultModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ModalContent {...props} />
    </div>
  );
};
