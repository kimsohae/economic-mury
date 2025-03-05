import React from "react";
import quizData from "@/public/questions.json";
import Quiz from "@/components/Quiz";
import ProgressBar from "@/components/ProgressBar";

export default function Page() {
  const quizList = quizData.quiz;

  return (
    <>
      <ProgressBar quizLength={quizList.length} />
      <Quiz quiz={quizList} />
    </>
  );
}
