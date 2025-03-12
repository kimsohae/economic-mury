import React from "react";
import { Quiz } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import CategoryBadge from "@/components/CategoryBadge";

interface Props {
  wrongQuizList: Quiz[];
  total: number;
}
export default function ReviewNote({ wrongQuizList, total }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {wrongQuizList && wrongQuizList.length ? (
        wrongQuizList.map((quiz: Quiz, index: number) => {
          const { id, content, options, explanations, correctRate, category } =
            quiz;
          const rightOption = options.filter((option) => option.isCorrect)[0];
          return (
            <div key={index}>
              <div className="break-keep">
                {id}. {content.question}{" "}
                {/* <div className="font-pretendard inline text-gray-400 text-xs bg-red-300/20 rounded-3xl py-1 px-2 w-fit mr-1">
                  {category}
                </div> */}
                {category && (
                  <CategoryBadge category={category} className={"mr-1"} />
                )}
                {total >= 10 && (
                  <Badge variant={"outline"}>
                    정답률&nbsp;{Number(correctRate).toFixed(1)}%
                  </Badge>
                )}
              </div>

              <div className="break-keep my-1">
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
