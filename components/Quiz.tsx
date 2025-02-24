"use client";
import React, { useEffect } from "react";
import QuizOptions from "@/components/QuizOptions";
import { Quiz as QuizType } from "@/app/test/page";
import { initialUser, useUser } from "@/state/UserContext";
import QuizAnswer from "@/components/QuizAnswer";
import { Badge } from "@/components/ui/badge";

export default function Quiz({ quiz }: { quiz: QuizType[] }) {
  const {
    user: { progress: currentIndex },
    setUser,
  } = useUser();
  const currentQuiz = quiz[currentIndex];
  const isLastQuiz = currentIndex === quiz.length - 1;

  useEffect(() => {
    // celanup: 점수/진행도 초기화
    return () => setUser(initialUser);
  }, []);

  return (
    <section className="flex flex-col items-center justify-start w-full h-full">
      <div className=" flex flex-col items-center  px-4 gap-4 pt-[4.5rem]">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold text-center text-primary">
            Q{currentIndex + 1}
          </span>
          {/* <Badge variant={"secondary"}>저축,투자</Badge> */}
        </div>
        <div className="flex flex-col items-center break-keep text-md">
          <div className="text-center text-gray-600 whitespace-pre-wrap ">
            {quiz[currentIndex].content.context}
            <div className="text-gray-900">{currentQuiz.content.question}</div>
          </div>
        </div>
      </div>
      <QuizAnswer
        options={currentQuiz.options}
        explanations={currentQuiz.explanations}
        isLastQuiz={isLastQuiz}
      />
    </section>
  );
}
