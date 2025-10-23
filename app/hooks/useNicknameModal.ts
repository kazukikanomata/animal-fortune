import { showDaisyToast } from "../components/toast";
import { useState } from "react";

export const useNicknameModal = () => {
  const [nickname, setNickname] = useState("");
  const [showNicknameModal, setShowNicknameModal] = useState(true);

  // 外部からモーダル状態の制御をかける
  const openNicknameModal = () => {
    if (nickname) {
      setShowNicknameModal(true);
    }
  };

  const closeNicknameModal = () => {
    if (nickname) {
      setShowNicknameModal(false);
      showDaisyToast(`ようこそ${nickname}さん！`);
    }
  };

  return {
    nickname,
    setNickname,
    showNicknameModal,
    closeNicknameModal,
    openNicknameModal,
  };
};
