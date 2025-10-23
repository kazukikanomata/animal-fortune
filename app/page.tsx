"use client";

import { MainScreen } from "./components/mainScreen";
import { useNicknameModal } from "./hooks/useNicknameModal";
import { useAnswers } from "./hooks/useAnswers";
import { useFortuneLogic } from "./hooks/useFortuneLogic";
import { ResultScreen } from "./components/resultScreen";
import { NicknameModal } from "./components/nicknameModal";

export default function Home() {
  const { nickname, setNickname, showNicknameModal, closeNicknameModal } =
    useNicknameModal();

  const { answers, resetAnswers } = useAnswers();
  const { result, resetResult } = useFortuneLogic(nickname, answers);

  /** 機能：もう一度占うボタン
   * ニックネームは保持し、toastやモーダル表示をSKIPして入力に専念させる。
   */

  const handleReset = () => {
    resetAnswers();
    resetResult();
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

  if (result?.success) {
    return (
      <ResultScreen nickname={nickname} result={result} onReset={handleReset} />
    );
  }

  return (
    <>
      <MainScreen nickname={nickname} />
    </>
  );
}
