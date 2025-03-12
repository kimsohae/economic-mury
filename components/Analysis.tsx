"use client";

import { fetchResultAnalysis } from "@/lib/fetch";
import { Quiz, UserResult } from "@/lib/type";
import { useEffect, useState } from "react";
interface Props {
  userResult: UserResult;
  wrongQuizList: Quiz[];
}

export default function Analysis({ userResult, wrongQuizList }: Props) {
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const getAnalysis = async () => {
      const response = await fetchResultAnalysis(userResult, wrongQuizList);
      if (response.content) {
        setResult(response.content);
      }
    };
    getAnalysis();
  }, []);
  return (
    <div className=" border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-6 w-auto whitespace-pre-line">
      <div className="">{result ?? "Loading..."}</div>
    </div>
  );
}
