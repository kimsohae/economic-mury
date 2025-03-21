"use client";

import { fetchResultAnalysis } from "@/lib/fetch";
import { Quiz, UserResult } from "@/lib/type";
import { useEffect, useRef, useState } from "react";
import { LocalStorageUtility } from "@/lib/utils";
import Analysis from "@/components/result/Analysis";
interface Props {
  userResult: UserResult;
  wrongQuizList: Quiz[];
}

export default function AnalysisWrapper({ userResult, wrongQuizList }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [analysis, setAnalysis] = useState(userResult.analysis);
  const isAnalysisExisted = !!userResult.analysis;

  useEffect(() => {
    const getAnalysis = async () => {
      const response = await fetchResultAnalysis(userResult, wrongQuizList);
      if (response.content) {
        setAnalysis(response.content);
        const storedResult = LocalStorageUtility.getItem<UserResult>("result");
        // 로컬스토리지에 result 저장
        if (storedResult?.id === userResult.id) {
          const updatedResult = { ...storedResult };
          updatedResult.analysis = response.content;
          LocalStorageUtility.setItem("result", updatedResult);
        }
      }
    };
    // userResult.analysis 없는 경우:

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isAnalysisExisted && !analysis) {
            getAnalysis();
          }
        }
      },
      {
        root: document.getElementById("main"),
        threshold: 0.1,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [analysis]);

  return (
    <div
      className=" border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-6 w-auto whitespace-pre-line"
      ref={ref}
    >
      {analysis ? (
        <Analysis analysis={analysis} isAnalysisExisted={isAnalysisExisted} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
