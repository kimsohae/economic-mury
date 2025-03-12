"use client";
import React, { useEffect, useMemo, useState } from "react";
import ArrowIcon from "@/components/icon/ArrowIcon";
import { Answer, Quiz, UserResult } from "@/lib/type";
import { RESULT_MAP } from "@/lib/rank";
import Image from "next/image";
import { LocalStorageUtility } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReviewNote from "@/components/ReviewNote";
import Analysis from "@/components/Analysis";
import quizData from "@/public/questions.json";
import CategoryBadge from "@/components/CategoryBadge";

interface Props {
  isDetailShown: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
  userResult: UserResult;
}

const quizList = quizData.quiz;

export default function ResultDetail({
  isDetailShown,
  setIsDetailShown,
  userResult,
}: Props) {
  const {
    id,
    rank,
    score,
    ranking: { total, position },
    wrongAnswers,
  } = userResult;
  const { title } = RESULT_MAP[rank];
  const [isTestProceeded, setIsTestProceeded] = useState<boolean>();

  // 현재 데이터셋에서 quizList 인덱스 -1과 quiz Id 동일
  // 퀴즈 추가 등 확장 시 quizId로 바로 접근할 수 있도록 데이터구조 변경 필요
  const wrongQuizList = useMemo(
    () =>
      wrongAnswers.map((answer: Answer) => {
        const quiz: Quiz = quizList[Number(answer.quizId) - 1];
        quiz.correctRate = answer.correctRate;
        return quiz;
      }),
    [wrongAnswers]
  );

  const uniqueCategory = [
    ...new Set(wrongQuizList.map((item) => item.category!!)),
  ];

  useEffect(() => {
    if (LocalStorageUtility.getItem("result")) {
      setIsTestProceeded(true);
    } else {
      setIsTestProceeded(false);
    }
  }, []);

  const onClickClose = () => {
    setIsDetailShown(false);
  };

  return (
    <div
      className={`absolute ${
        isDetailShown
          ? "right-[0%] opacity-[100%] "
          : "right-[-100%] opacity-[0%] "
      } h-[100%] w-[100%] flex flex-col items-center bg-white z-10 rounded-t-2xl overflow-scroll transition-all delay-1 duration-150  ease-in-out`}
    >
      <div className="fixed max-w-[540px] w-[100%] top-0 bg-white border-b border-gray-200">
        <div className="relative w-[100%]  my-4 h-[28px] flex flex-row items-center justify-center">
          <button onClick={() => onClickClose()}>
            <ArrowIcon className="w-[24px] h-[24px] absolute top-0 left-4" />
          </button>
          {title}
        </div>
      </div>
      <div className="flex flex-col items-center mt-14">
        <Image
          width={200}
          height={200}
          alt="result_detail"
          src={`/img/${rank}.webp`}
        />
        <div className="text-gray-500 text-sm px-6 py-1 border border-gray-200 rounded-3xl">
          정답 <span className="text-primary">{score}개</span>
        </div>
        <div className="text-center mt-6 mb-6">
          <span>10문제 중 {score}문제를 맞혔어요. </span>
          <br />
          <span>
            총 {total}명 중 <span className="text-primary">{position}</span>
            등입니다.
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="text-center">
          {/* <span>
          총 20명 중 <span className="text-primary">20</span>
          등입니다.
        </span> */}
          {/* <br /> */}
          {uniqueCategory.length > 0 && (
            <>
              <span>아래 분야의 문제를 틀리셨네요.</span>
              <div className="text-center flex justify-center my-6">
                <div className="w-[250px]  break-words leading-[2.3]">
                  {uniqueCategory.map((item) => (
                    <CategoryBadge
                      key={item}
                      category={item}
                      className={"text-sm text-gray-500 px-4 py-1.5 mr-1"}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <br />
        <span className="ml-6 text-lg">AI 총평</span>
        <Analysis userResult={userResult} wrongQuizList={wrongQuizList} />
        <span className="ml-6 text-lg">오답 노트</span>
        <div className=" border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-6 w-auto">
          {isTestProceeded ? (
            <ReviewNote wrongQuizList={wrongQuizList} total={total} />
          ) : (
            <div className="h-60 flex flex-col items-center justify-center gap-4 text-gray-500">
              <p className="text-center">
                <span className="">오답노트는</span>
                <br />
                <span>테스트를 진행한 분에게만 공개됩니다.</span>
              </p>
              <div className="w-full max-w-[300px]">
                <Link href="/">
                  <Button variant="default" size="full" className="">
                    테스트 하기
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
