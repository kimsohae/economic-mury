"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";
import ResultDetail from "@/components/result/ResultDetail";
import { UserResult } from "@/lib/type";

interface Props {
  userResult: UserResult;
  title: string;
  desc: string;
}

export default function ResultFooter({ userResult, title, desc }: Props) {
  const { rank } = userResult;
  const [isDetailShown, setIsDetailShown] = useState<boolean>(false);

  return (
    <>
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
            imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/img/${rank}_preview.webp`}
          />
        </div>
      </div>
      {/* {isDetailShown && ( */}
      <ResultDetail
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
        userResult={userResult}
      />
    </>
  );
}
