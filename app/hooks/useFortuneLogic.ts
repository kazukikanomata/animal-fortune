import { useState } from "react";
import { AnimalType } from "../config";
import { questions } from "../types/questions";

export type FortuneResult = {
  success: boolean;
  resultUrl?: string;
  animalType?: AnimalType;
  error?: string;
};

export const useFortuneLogic = (
  nickname: string,
  answers: Record<string, string>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setResult({
        success: false,
        error: "ニックネームを入力してください",
      });
    }

    if (Object.keys(answers).length !== questions.length) {
      setResult({
        success: false,
        error: "すべての質問に回答してください",
      });
    }

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
      console.log(JSON.stringify(data));

      setResult(data);

      // 成功しているときかつ動物タイプがあるときのみjsonの保存する処理を実行する
      if (data.success && data.animalType) {

        const submissionRequestBody = {
          nickname,
          animalType: data.animalType,
          answers: requestBody,
        };

        try {
          await fetch("/api/submission", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionRequestBody),
          });
        } catch (submissionError) {
          console.error("Failed to save submission API:", submissionError);
        }
      }

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
