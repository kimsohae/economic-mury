import Image from "next/image";
import React from "react";
import "./style.css";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full flex flex-col items-center ">
        <Image
          priority
          className="absolute w-10 animate-[floatRotate_3s_infinite_ease-in-out]"
          width={100}
          height={150}
          src="/img/loading_question.webp"
          alt="loading_question"
        />
        <Image
          priority
          className=""
          width={176}
          height={176}
          src="/img/loading.webp"
          alt="loading"
        />
      </div>
      <span className="text-white text-2xl">결과를 불러오고 있어요</span>
    </div>
  );
}
