import React from "react";
import { Answer } from "@/lib/type";
import quizData from "@/public/questions.json";

interface Props {
  wrongAnswers: Answer[];
  total: number;
}
export default function ReviewNote({ wrongAnswers, total }: Props) {
  const quizList = quizData.quiz;
  return (
    <div className="flex flex-col gap-6">
      {wrongAnswers && wrongAnswers.length ? (
        wrongAnswers.map((answer: Answer, index: number) => {
          // 현재 데이터셋에서 quizList 인덱스 -1과 quiz Id 동일
          // 퀴즈 추가 등 확장 시 quizId로 바로 접근할 수 있도록 데이터구조 변경 필요
          const wrongAnswer = quizList[Number(answer.quizId) - 1];
          const { id, content, options, explanations } = wrongAnswer;
          const rightOption = options.filter((option) => option.isCorrect)[0];
          return (
            <div key={index}>
              <div className="break-keep">
                {id}. {content.question}{" "}
                {total >= 10 && (
                  <div className="inline text-gray-400 text-xs border border-gray-200 rounded-3xl py-1 px-2 w-fit">
                    정답률&nbsp;{Number(answer.correctRate).toFixed(1)}%
                  </div>
                )}
              </div>

              <div className="break-keep">
                <span className="text-primary"> → {rightOption.text}</span>
              </div>

              <div className="text-gray-400 text-sm"> {explanations}</div>
            </div>
          );
        })
      ) : (
        <div className="h-60 flex flex-col items-center justify-center gap-4 text-gray-500">
          <span className="">틀린 문제가 없어요 👏</span>
        </div>
      )}
    </div>
  );
}
