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
    <>
      <div
        className={
          "absolute bottom-4 w-[calc(100%-2rem)] rounded-lg h-3 bg-slate-200"
        }
      />
      <div
        style={{ width: `${percentage}%` }}
        className={`absolute bottom-4 left-[1rem] max-w-[calc(100%-2rem)] rounded-lg h-3 bg-primary`}
      />
    </>
  );
}
