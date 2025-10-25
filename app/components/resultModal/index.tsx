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
);

/**
 * 診断結果のURLを表示するサブコンポーネント
 */

const ResultLink = ({ resultUrl }: { resultUrl: string }) => (
  <div className="mb-6">
    <p className="text-gray-600 mb-2">{RESULT_LINK_TEXT}</p>
    <div className="flex justify-center">
      <a
        href={resultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 underline flex items-center"
      >
        <ExternalLinkIcon />
        <span className="break-all max-w-full">{resultUrl}</span>
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
      {/* TODO: textの色を編集する */}
      <div className="text-2xl font-bold mb-4 text-blue-600">
        \ {nickname}さんは
        <strong>{animalTypeName}</strong>
        です！！/
      </div>
      {result.resultUrl && <ResultLink resultUrl={result.resultUrl} />}
      {/* TODO: bg-colorと文字色を編集する */}
      <button
        onClick={onReset}
        className="btn-wide bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
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
