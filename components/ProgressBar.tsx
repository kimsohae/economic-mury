"use client";
import { useUser } from "@/state/UserContext";
import React from "react";
import ArrowIcon from "@/components/icon/ArrowIcon";
import { useRouter } from "next/navigation";

interface Props {
  quizLength: number;
}

export default function ProgressBar({ quizLength }: Props) {
  const {
    user: { progress },
  } = useUser();
  const { push } = useRouter();
  const percentage = ((progress + 1) / quizLength) * 100;

  return (
    <div className="absolute top-4 w-full flex flex-row">
      <ArrowIcon
        className="w-[24px] h-[24px] mx-4 text-slate-300 cursor-pointer"
        onClick={() => push("/")}
      />
      <div className="relative flex items-center w-full h-[24px]">
        <div className={"absolute w-full rounded-lg h-3 bg-slate-200"} />
        <div
          style={{ width: `${percentage}%` }}
          className={`absolute rounded-lg h-3 bg-primary transition-all`}
        />
      </div>
      <div className="h-[24px] mx-4 text-slate-300 text-xs flex items-center">
        {/* HINT */}
      </div>
    </div>
  );
}
