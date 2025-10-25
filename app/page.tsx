"use client";

import { MainScreen } from "./components/mainScreen";
import { useNicknameModal } from "./hooks/useNicknameModal";
import { useAnswers } from "./hooks/useAnswers";
import { useFortuneLogic } from "./hooks/useFortuneLogic";
import { ResultModal } from "./components/resultModal";
import { NicknameModal } from "./components/nicknameModal";
import { useState } from "react";

export default function Home() {
  const { nickname, setNickname, showNicknameModal, closeNicknameModal } =
    useNicknameModal();

  const { answers, handleAnswerChange, resetAnswers } = useAnswers();
  const [resetCounter, setResetCounter] = useState(0);
  const { result, resetResult, isLoading, handleSubmit } = useFortuneLogic(
    nickname,
    answers
  );

  /** 機能：もう一度占うボタン
   * ニックネームは保持し、toastやモーダル表示をSKIPして入力に専念させる。
   */

  const handleReset = () => {
    resetAnswers();
    resetResult();
    setResetCounter((prev) => prev + 1);
  };

  if (showNicknameModal) {
    return (
      <div
        className=" 
        p-4
        flex 
        flex-col 
        items-center"
        style={{
          backgroundImage: "url('/images/pastel.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NicknameModal
          nickname={nickname}
          setNickname={setNickname}
          onClose={closeNicknameModal}
        />
      </div>
    );
  }

  return (
    <div
      className=" 
        p-4
        flex 
        flex-col 
        items-center"
      style={{
        backgroundImage: "url('/images/pastel.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MainScreen
        isLoading={isLoading}
        result={result}
        onComplete={handleSubmit}
        resetTrigger={resetCounter}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
      {result?.success && (
        <ResultModal
          nickname={nickname}
          result={result}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
