"use client";
import React, { useEffect } from "react";
import QuizOptions from "@/components/QuizOptions";
import { Quiz as QuizType } from "@/app/test/page";
import { initialUser, useUser } from "@/state/UserContext";
import { Button } from "@/components/ui/button";
import QuizAnswer from "./QuizAnswer";

export default function Quiz({ quiz }: { quiz: QuizType[] }) {
  const {
    user: { progress: currentIndex },
    setUser,
  } = useUser();
  const currentQuiz = quiz[currentIndex];
  const isLastQuiz = currentIndex === quiz.length - 1;

  useEffect(() => {
    // celanup: 점수/진행도 초기화
    return setUser(initialUser);
  }, []);

  return (
    <section className="flex flex-col items-center justify-start w-full h-full">
      <div className=" flex flex-col items-center  px-4 pt-[4.5rem]">
        <span className="text-xl font-bold mb-4 text-center">
          Q{currentQuiz.id}
        </span>
        <div className="flex flex-col items-center break-keep text-md">
          <div className="text-center text-gray-700 whitespace-pre-wrap">
            {quiz[currentIndex].content.context}
            <h2 className="font-bold text-gray-900">
              {currentQuiz.content.question}
            </h2>
          </div>
        </div>
      </div>
      <QuizAnswer options={currentQuiz.options} isLastQuiz={isLastQuiz} />
    </section>
  );
}
