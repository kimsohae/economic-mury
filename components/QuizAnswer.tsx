"use client";
import React from "react";
import { QuizOption } from "@/app/test/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/state/UserContext";
import { Rank } from "@/app/result/[rank]/page";
import CrossIcon from "@/components/icon/CrossIcon";
import CheckIcon from "@/components/icon/CheckIcon";
import Loading from "@/components/Loading";

interface Props {
  options: QuizOption[];
  explanations: string;
  isLastQuiz: boolean;
}

function getRank(score: number): Rank {
  if (score <= 1) {
    return "stone";
  } else if (score <= 3) {
    return "desert";
  } else if (score <= 4) {
    return "grass";
  } else if (score <= 6) {
    return "plant";
  } else if (score <= 8) {
    return "rice";
  } else if (score <= 10) {
    return "jungle";
  }
  return "stone";
}

export default function QuizAnswer({
  options,
  explanations,
  isLastQuiz,
}: Props) {
  const { replace } = useRouter();
  const {
    user: { progress, score },
    setUser,
  } = useUser();
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const isCorrect =
    selectedIdx !== null ? options[selectedIdx].isCorrect : false;

  const onClickOption = (option: QuizOption, idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const onClickSubmit = () => {
    if (isSubmitted) {
      // 선택지 초기화 후 다음 문제로 넘어간다
      // [1] 점수, 진행도 기록: 맞으면 득점
      const newScore = score + (options[selectedIdx!].isCorrect ? 1 : 0);
      setUser({ score: newScore, progress: progress + (isLastQuiz ? 0 : 1) });

      //  [2] 마지막 문항일 경우, 결과 페이지로 이동
      if (isLastQuiz) {
        const rank = getRank(newScore);
        setIsLoading(true);
        setTimeout(() => {
          replace(`/result/${rank}`);
        }, 5000);
        return;
      }

      // [3] 선택 상태 초기화
      setSelectedIdx(null);
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <div className="h-[70%] py-8 w-full overflow-y-auto px-8">
        <div className="grid gap-4 m-auto justify-center">
          {options.map((option, idx) => (
            <Button
              className="relative"
              variant={selectedIdx === idx ? "selected" : "outline"}
              size="md"
              key={`${progress}_${option.id}`}
              onClick={() => onClickOption(option, idx)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
      {/* <div className="bg-black/20 absolute top-0 left-0 w-full h-full z-[-1]"></div> */}
      <div className="absolute bottom-0 w-full flex justify-center bg-white">
        <div
          className={`absolute  ${
            isSubmitted
              ? "bottom-[100%] h-fit border-t-2  rounded-t-3xl"
              : "bottom-[0%] h-[0%] border-transparent"
          } w-full bg-white border-gray-200 p-4  transform transition-all duration-300  ease-in-out`}
        >
          {isSubmitted && (
            <>
              <div
                className={`${
                  isCorrect ? "text-blue-500" : "text-red-500"
                } text-lg font-semibold flex gap-2 items-center`}
              >
                {isCorrect ? (
                  <>
                    <div className="w-6 h-6 bg-blue-500 rounded-full relative">
                      <CheckIcon className="absolute" fill="white" />
                    </div>{" "}
                    정답!
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-red-500 rounded-full relative">
                      <CrossIcon className="absolute" fill="white" />
                    </div>
                    땡
                  </>
                )}
              </div>
              <div
                className={`${
                  isCorrect ? "text-blue-400" : "text-red-400"
                } mt-2 text-sm whitespace-pre-line`}
              >
                {explanations}
              </div>
            </>
          )}
        </div>

        <div className="bg-white w-full px-4 pb-[30px] z-[1]">
          <Button
            size="full"
            disabled={selectedIdx === null}
            onClick={onClickSubmit}
          >
            {isSubmitted ? (isLastQuiz ? "결과보기" : "다음으로") : "선택하기"}
          </Button>
        </div>
      </div>

      <div
        className={`absolute ${
          isLoading ? " bottom-[0%] h-[100%]" : " bottom-[-100%] h-[0%]"
        }  left-0 w-full ∂  z-[10] bg-black/70 flex items-center justify-center transform transition-all delay-1 duration-300  ease-in-out`}
      >
        {isLoading && <Loading />}
      </div>
    </>
  );
}
