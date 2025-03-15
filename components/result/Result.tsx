"use client";
import React, { useState } from "react";
import { Rank, UserResult } from "@/lib/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import { RESULT_MAP } from "@/lib/rank";
import ResultDetail from "@/components/result/ResultDetail";

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
  const [isDetailShown, setIsDetailShown] = useState<boolean>(false);

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
      <div className="absolute bottom-0 flex flex-col items-center w-full px-4 bottom-[30px] z-[1]">
        <Button
          className="bg-[#21c885]"
          onClick={() => {
            setIsDetailShown(true);
          }}
          size="full"
        >
          상세 보기
        </Button>
        <div className="w-full flex flex-row gap-[4px] mt-3">
          <Link href="/" className="w-[50%]">
            <Button size="full" className="text-black" variant={"outline"}>
              다시 하기
            </Button>
          </Link>
          <ShareButton
            title={title}
            description={desc}
            variant={"outline"}
            className="text-black w-[50%] bg-[#FEE500] border-none hover:bg-[#FEE500]/80"
            imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/img/${rank}.webp`}
          />
        </div>
      </div>
      {/* {isDetailShown && ( */}
      <ResultDetail
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
        userResult={userResult}
      />
      {/* )} */}
    </>
  );
}
