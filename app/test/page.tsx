import React from "react";
import quizData from "@/public/questions.json";
import Quiz from "@/components/Quiz";

const ANSWER_LIST = [
  {
    id: "a",
    label: "무디스(Moody's)",
  },
  {
    id: "b",
    label: "블룸버그(Bloomberg)",
  },
  {
    id: "c",
    label: "스탠다드앤푸어스(S&P)",
  },
  {
    id: "d",
    label: "피치(FitchRatings)",
  },
];

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
      <Quiz quiz={quizList} />
      <div className="absolute bottom-4 w-[calc(100%-2rem)] rounded-lg h-3 bg-slate-200" />
      <div className="absolute bottom-4 left-[1rem] w-[calc(10%)] rounded-lg h-3 bg-primary" />
    </>
  );
}
