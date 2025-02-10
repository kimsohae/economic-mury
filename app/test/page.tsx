import React from "react";
import quizData from "@/public/questions.json";
import Quiz from "@/components/Quiz";
import ProgressBar from "@/components/ProgressBar";

export type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean; // 정답 여부
};

export type Quiz = {
  id: string;
  content: {
    context?: string; // 질문 배경 설명
    question: string; // 질문
  };
  options: QuizOption[];
};

// export async function getStaticProps() {
//   const questions = await fetch("").then((res) => res.json());
//   return "";
// }

// export default function Test({ questions }: { questions: Quiz[] }) {
export default function Page() {
  const quizList = quizData.quiz;

  return (
    <>
      <ProgressBar quizLength={quizList.length} />
      <Quiz quiz={quizList} />
    </>
  );
}
