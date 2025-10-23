import { useState } from "react";

import { questions } from "../types/questions";
import { GAS_API_URL } from "../config";

// TODO: 型定義見直す
export type FortuneResult = {
  success: boolean;
  url?: string;
  animalType?: string;
  error?: string;
};

export const useFortuneLogic = (
  nickname: string,
  answers: Record<string, string>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);

  const handleSubmit = async () => {
    // TODO: ニックネーム入力チェック
    // 全ての質問に回答しているかチェック

    setIsLoading(true);
    setResult(null); // TODO: これいらん？
    try {
      console.log("Frontend: Sending request to:", GAS_API_URL);
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
      console.log("Frontend: Request body:", requestBody);

      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Frontend: Response status:", response.status);
      console.log("Frontend: Response headers:", response.headers);

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
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "エラーが発生しました",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetResult = () => {
    setResult(null);
  };

  return {
    isLoading,
    result,
    handleSubmit,
    resetResult,
  };
};
