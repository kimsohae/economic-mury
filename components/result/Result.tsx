import React, { useState } from "react";
import { UserResult } from "@/lib/type";
import Image from "next/image";
import { RESULT_MAP } from "@/lib/rank";
import ResultFooter from "@/components/result/ResultFooter";

/**
 * 필요 데이터
 * score
 * 틀린 문제 목록
 * 점수
 */

interface Props {
  userResult: UserResult;
}

export default function Result({ userResult }: Props) {
  const { rank } = userResult;
  const { desc, title } = RESULT_MAP[rank];

  return (
    <>
      <span className="absolute top-4 left-[50%] translate-x-[-50%] text-md z-[2] ">
        경제머리 테스트
      </span>

      <div className="z-[1] pt-12 pb-8 mb-[142px]">
        <div className="flex flex-col items-center ">
          <div className="text-gray-500 text-lg text-center whitespace-pre-line">
            {desc}
          </div>
          <Image
            // className=""
            width={300}
            height={300}
            alt="result"
            src={`/img/${rank}.webp`}
          />
          {rank === "grass" && (
            <>
              <Image
                width={300}
                height={300}
                alt="result_bg"
                className="absolute bottom-[30%] w-full z-[-2]"
                src={"/img/grass_bg.webp"}
              />
              <div
                className="absolute bottom-0 h-[30%] w-full z-[-2]"
                style={{ backgroundColor: "#EEC5A8" }}
              />
            </>
          )}
          <span className="text-3xl font-semibold">{title}</span>
        </div>
      </div>
      <ResultFooter userResult={userResult} title={title} desc={desc} />
      {/* )} */}
    </>
  );
}
