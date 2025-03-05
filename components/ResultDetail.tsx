"use client";
import React, { useEffect, useState } from "react";
import ArrowIcon from "@/components/icon/ArrowIcon";
import { Answer, UserResult } from "@/lib/type";
import { RESULT_MAP } from "@/lib/rank";
import quizData from "@/public/questions.json";
import Image from "next/image";

interface Props {
  isDetailShown: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
  userResult: UserResult;
}

export default function ResultDetail({
  setIsDetailShown,
  userResult: { rank, score, ranking, wrongAnswers },
}: Props) {
  const { title } = RESULT_MAP[rank];
  const quizList = quizData.quiz;

  const onClickClose = () => {
    console.log(setIsDetailShown);
    setIsDetailShown(false);
  };

  return (
    <div className="absolute h-[100%] w-[100%] flex flex-col items-center bg-white z-10 rounded-t-2xl overflow-scroll">
      <div className="fixed max-w-[540px] w-[100%] top-0 bg-white">
        <div className="relative w-[100%]  my-4 h-[28px] flex flex-row items-center justify-center">
          <button onClick={() => onClickClose()}>
            <ArrowIcon className="w-[24px] h-[24px] absolute top-0 left-4" />
          </button>
          {title}
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Image
          width={200}
          height={200}
          alt="result_detail"
          src={`/img/${rank}.webp`}
        />
        <div className="text-gray-500 text-sm px-6 py-1 border border-gray-200 rounded-3xl">
          정답 <span className="text-primary">{score}개</span>
        </div>
        <div className="text-center mt-6 mb-10">
          <span>10문제 중 {score}문제를 맞혔어요. </span>
          <br />
          <span>
            총 {ranking.total}명 중{" "}
            <span className="text-primary">{ranking.position}</span>등입니다.
          </span>
        </div>
      </div>
      <div>
        <span className="ml-6 text-lg">오답 노트</span>
        <div className="flex flex-col border border-gray-200 rounded-3xl p-4 mx-4 gap-2 my-2">
          {wrongAnswers &&
            wrongAnswers.map((answer: Answer, index: number) => {
              // 현재 데이터셋에서 quizList 인덱스 -1과 quiz Id 동일
              // 퀴즈 추가 등 확장 시 quizId로 바로 접근할 수 있도록 데이터구조 변경 필요
              const wrongAnswer = quizList[Number(answer.quizId) - 1];
              const { id, category, content, options, explanations } =
                wrongAnswer;
              const rightOption = options.filter(
                (option) => option.isCorrect
              )[0];
              return (
                <div key={index}>
                  <div className="break-keep">
                    {id}. {content.question}{" "}
                    <div className="inline text-gray-400 text-xs border border-gray-200 rounded-3xl py-1 px-2 w-fit">
                      정답률&nbsp;{Number(answer.correctRate).toFixed(1)}%
                    </div>
                  </div>

                  <div className="break-keep">
                    <span className="text-primary"> → {rightOption.text}</span>
                  </div>

                  <div className="text-gray-400 text-sm"> {explanations}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
