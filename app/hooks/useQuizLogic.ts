"use client";

import { questions } from "../types/questions";
import { useCallback, useMemo, useState } from "react";

type QuizResult = {
  success: boolean;
  resultUrl?: string;
  animalType?: string;
  error?: string;
};

export const useQuizLogic = () => {
  const [nickname, setNickname] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(true);

  const handleAnswerChange = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    // ニックネーム入力チェック
    // 全ての質問に回答しているかチェック

    setIsLoading(true);
    setResult(null);

    try {
      const requestBody = {
        nickname,
        ...Object.fromEntries(
          Object.entries(answers).map(([key, value]) => [
            key,
            {
              value,
              text:
                questions
                  .find((q) => q.id === key)
                  ?.options.find((o) => o.value === value)?.text || "",
            },
          ])
        ),
      };

      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Frontend: Response error:", errorText);
        setResult({
          success: false,
          error: `サーバーエラー: ${response.status} ${response.statusText}`,
        });
        return;
      }

      const data = await response.json();
      setResult(data as QuizResult);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "エラーが発生しました",
      });
    } finally {
      setIsLoading(false);
    }
  }, [nickname, answers]);

  const isComplete = useMemo(() => {
    return Object.keys(answers).length === questions.length;
  }, [answers]);

  const closeNicknameModal = useCallback(() => {
    if (nickname) {
      setShowNicknameModal(false);
    }
  }, [nickname]);

  return {
    // 状態
    nickname,
    answers,
    isLoading,
    result,
    showNicknameModal,
    isComplete, // 必要に応じて公開

    // セッター
    setNickname,

    // 処理
    handleAnswerChange,
    handleSubmit,
    closeNicknameModal,
  };
};
