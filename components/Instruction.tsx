"use client";
import { LocalStorageUtility } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Instruction() {
  const [isShown, setIsShown] = useState<boolean>();

  const onClickHidden = () => {
    LocalStorageUtility.setItem("is_instruction_hidden", true);
    setIsShown(false);
  };

  useEffect(() => {
    if (LocalStorageUtility.getItem("is_instruction_hidden")) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }, []);
  return (
    <div
      className={`hidden ${
        isShown ? "xl:flex" : ""
      } bg-primary/50 rounded-xl w-[320px] h-[350px] flex justify-center items-center absolute bottom-[32px] right-[32px] shadow-lg text-gray-900`}
    >
      <div
        className="absolute top-[-8px] right-[-8px] w-8 h-8 bg-white rounded-full flex justify-center items-center shadow-md cursor-pointer text-slate-300 hover:text-slate-500"
        onClick={onClickHidden}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {/* <ArrowIcon className="flex-1" /> */}
      <div className="font-pretendard ">
        <div className="flex w-[300px] overflow-hidden justify-center">
          <Image
            width={280}
            height={193}
            alt="inst_1"
            src="/img/instruction_1.png"
            className="h-[150px] w-fit first-slide"
          />
          <Image
            width={365}
            height={244}
            src="/img/instruction_2.png"
            alt="inst_2"
            className="h-[150px] w-fit second-slide"
          />
        </div>
        <div className="text-center mt-2 first-text">
          <span>퀴즈를 풀고 나의</span>
          <br />
          <span>
            <span className="font-bold">경제머리 상태</span>를 알아보세요!
          </span>
        </div>
        <div className="text-center mt-2 second-text">
          <span>
            <span className="font-bold">AI 결과 분석과 오답노트</span>를
          </span>
          <br />
          <span>제공해 드려요.</span>
        </div>
      </div>
      <div className="absolute bottom-[40px] flex gap-2 mt-4 w-full justify-center">
        <div className={`h-[8px] w-[8px] first-button rounded-full`} />
        <div className={`h-[8px] w-[8px] second-button rounded-full`} />
      </div>
      {/* <ArrowIcon className="rotate-180 flex-1" /> */}
    </div>
  );
}
