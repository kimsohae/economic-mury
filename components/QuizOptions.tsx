"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuizOption } from "@/app/test/page";
import { useUser } from "@/state/UserContext";
import { Rank } from "@/app/result/[rank]/page";
interface Props {
  options: QuizOption[];
  isLastQuiz: boolean;
}

export default function QuizOptions({ options, isLastQuiz }: Props) {
  const { replace } = useRouter();
  const {
    user: { progress, score },
    setUser,
  } = useUser();
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);

  const onClickButton = (option: QuizOption, idx: number) => {
    setSelectedIdx(idx);

    // // [1] 점수, 진행도 기록: 맞으면 득점
    // const newScore = score + (option.isCorrect ? 1 : 0);
    // setUser({
    //   progress: progress + (isLastQuiz ? 0 : 1),
    //   score: newScore,
    // });

    // // [2] 마지막 문항일 경우, 결과 페이지로 이동
    // if (isLastQuiz) {
    //   const rank = getRank(newScore);
    //   replace(`/result/${rank}`);
    // }
  };

  return <></>;
}
