"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Quiz, QuizOption } from "@/app/test/page";
import { useUser } from "@/state/UserContext";
import PreviousMap from "postcss/lib/previous-map";

interface Props {
  options: QuizOption[];
  isLastQuiz: boolean;
}

function getResult() {}

export default function QuizOptions({ options, isLastQuiz }: Props) {
  const { replace } = useRouter();
  const {
    user: { progress },
    setUser,
  } = useUser();

  const onClickButton = (option: QuizOption) => {
    // [1] 점수, 진행도 기록: 맞으면 득점
    const newScore = option.isCorrect ? 1 : 0;
    setUser((prev) => ({
      ...prev,
      progress: prev.progress + (isLastQuiz ? 0 : 1),
      score: prev.score + newScore,
    }));

    // [2] 마지막 문항일 경우, 결과 페이지로 이동
    if (isLastQuiz) {
      replace("/result/1");
    }
  };

  return (
    <>
      {options.map((option) => (
        <Button
          variant="outline"
          size="lg"
          key={`${progress}_${option.id}`}
          onClick={() => onClickButton(option)}
        >
          {option.text}
        </Button>
      ))}
    </>
  );
}
