'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  answers: any[];
}

export default function AnswerList({ answers }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const onClickButton = () => {
    const nextQuestion = parseInt(pathname.split("/")[2]) + 1;
    push(`/test/${nextQuestion}`);
  };

  return (
    <>
      {answers.map((answer) => (
        <Button
          variant="outline"
          size="lg"
          key={answer.id}
          onClick={onClickButton}
        >
          {answer.label}
        </Button>
      ))}
    </>
  );
}
