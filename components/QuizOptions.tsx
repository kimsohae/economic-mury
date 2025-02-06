"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { QuizOption } from "@/app/test/page";
import { useUser } from "@/state/UserContext";
import { Rank } from "@/app/result/[rank]/page";
interface Props {
  options: QuizOption[];
  isLastQuiz: boolean;
}

function getRank(score: number): Rank {
  if (score <= 2) {
    return "bald";
  } else if (score <= 4) {
    return "downy";
  } else if (score <= 6) {
    return "grass";
  } else if (score <= 8) {
    return "plant";
  } else if (score <= 10) {
    return "jungle";
  }
  return "bald";
}

export default function QuizOptions({ options, isLastQuiz }: Props) {
  const { replace } = useRouter();
  const {
    user: { progress, score },
    setUser,
  } = useUser();

  const onClickButton = (option: QuizOption) => {
    // [1] 점수, 진행도 기록: 맞으면 득점
    const newScore = score + (option.isCorrect ? 1 : 0);
    setUser({
      progress: progress + (isLastQuiz ? 0 : 1),
      score: newScore,
    });

    // [2] 마지막 문항일 경우, 결과 페이지로 이동
    if (isLastQuiz) {
      const rank = getRank(newScore);
      replace(`/result/${rank}`);
    }
  };

  return (
    <>
      {options.map((option) => (
        <Button
          variant="outline"
          size="md"
          key={`${progress}_${option.id}`}
          onClick={() => onClickButton(option)}
        >
          {option.text}
        </Button>
      ))}
    </>
  );
}
