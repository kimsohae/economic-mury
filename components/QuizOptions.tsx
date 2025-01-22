"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Quiz, QuizOption } from "@/app/test/page";

interface Props {
  options: QuizOption[];
  isLastQuiz: boolean;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export default function QuizOptions({
  options,
  isLastQuiz,
  setCurrentIndex,
}: Props) {
  const { replace } = useRouter();
  const onClickButton = () => {
    // 정오 기록

    if (isLastQuiz) {
      // 마지막 문항일 경우, 결과 페이지로 이동
      replace("/result");
    } else {
      // 다음 문항으로 넘어간다.
      setCurrentIndex((prev) => prev + 1);
      //
    }
  };

  return (
    <>
      {options.map((option) => (
        <Button
          variant="outline"
          size="lg"
          key={option.id}
          onClick={onClickButton}
        >
          {option.text}
        </Button>
      ))}
    </>
  );
}
