"use client";
import React, { useEffect } from "react";
import { Quiz as QuizType } from "@/lib/type";
import { initialUser, useUser } from "@/state/UserContext";
import QuizAnswer from "@/components/QuizAnswer";
import CategoryBadge from "@/components/CategoryBadge";

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
          <CategoryBadge category={currentQuiz.category} />
        </div>
        <div className="flex flex-col items-center break-keep text-md">
          <div className="text-center text-gray-600 whitespace-pre-wrap ">
            {quiz[currentIndex].content.context}
            <div className="text-gray-900">{currentQuiz.content.question}</div>
          </div>
        </div>
      </div>
      <QuizAnswer currentQuiz={currentQuiz} isLastQuiz={isLastQuiz} />
    </section>
  );
}
