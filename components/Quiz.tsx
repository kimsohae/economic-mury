"use client";
import React, { useEffect } from "react";
import QuizOptions from "@/components/QuizOptions";
import { Quiz as QuizType } from "@/app/test/page";
import { initialUser, useUser } from "@/state/UserContext";

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
    <section className="flex flex-col items-center">
      <span className="text-5xl font-bold mb-8">Q{currentQuiz.id}</span>
      <div className="flex flex-col items-center break-keep mx-8 mt-2 mb-12 text-lg">
        <div className="text-center text-gray-500 whitespace-pre-wrap">
          {quiz[currentIndex].content.context}
          <h2 className="font-bold text-gray-800">
            {currentQuiz.content.question}
          </h2>
        </div>
      </div>
      <div className="grid gap-4 mx-12">
        <QuizOptions options={currentQuiz.options} isLastQuiz={isLastQuiz} />
      </div>
    </section>
  );
}
