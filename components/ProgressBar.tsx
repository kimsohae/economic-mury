"use client";
import { useUser } from "@/state/UserContext";
import React from "react";

export default function ProgressBar() {
  const {
    user: { progress },
  } = useUser();
  return (
    <>
      <div
        className={
          "absolute bottom-4 w-[calc(100%-2rem)] rounded-lg h-3 bg-slate-200"
        }
      />
      <div
        style={{ width: `${(progress + 1) * 10}%` }}
        className={`absolute bottom-4 left-[1rem] rounded-lg h-3 bg-primary`}
      />
    </>
  );
}
