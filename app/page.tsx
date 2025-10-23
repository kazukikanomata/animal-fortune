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

  const { answers, resetAnswers } = useAnswers();
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
      <NicknameModal
        nickname={nickname}
        setNickname={setNickname}
        onClose={closeNicknameModal}
      />
    );
  }

  return (
    <>
      <MainScreen
        isLoading={isLoading}
        result={result}
        onComplete={handleSubmit}
        resetTrigger={resetCounter}
      />
      {result?.success && (
        <ResultModal
          nickname={nickname}
          result={result}
          onReset={handleReset}
        />
      )}
    </>
  );
}
