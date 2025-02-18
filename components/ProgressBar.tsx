"use client";
import { useUser } from "@/state/UserContext";
import React from "react";

interface Props {
  quizLength: number;
}

export default function ProgressBar({ quizLength }: Props) {
  const {
    user: { progress },
  } = useUser();
  const percentage = ((progress + 1) / quizLength) * 100;

  return (
    <div className="absolute top-4 w-full ">
      <div className="relative mx-4">
        <div className={"absolute w-full rounded-lg h-3 bg-slate-200"} />
        <div
          style={{ width: `${percentage}%` }}
          className={`absolute rounded-lg h-3 bg-primary transition-all`}
        />
      </div>
    </div>
  );
}
