import React from "react";
import quizData from "@/public/questions.json";
import Quiz from "@/components/Quiz";
import ProgressBar from "@/components/ProgressBar";
import { Quiz as QuizType } from "@/lib/type";

export default function Page() {
  const quizList = quizData.quiz as QuizType[];

  return (
    <>
      <ProgressBar quizLength={quizList.length} />
      <Quiz quiz={quizList} />
    </>
  );
}
