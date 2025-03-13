"use client";

import { fetchResultAnalysis } from "@/lib/fetch";
import { Quiz, UserResult } from "@/lib/type";
import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
interface Props {
  userResult: UserResult;
  wrongQuizList: Quiz[];
}

export default function Analysis({ userResult, wrongQuizList }: Props) {
  // const ref = useRef<HTMLDivElement>(null);
  // const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState(userResult.analysis);

  useEffect(() => {
    const getAnalysis = async () => {
      const response = await fetchResultAnalysis(userResult, wrongQuizList);
      if (response.content) {
        setResult(response.content);
      }
    };
    if (!result) {
      getAnalysis();
    }
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsVisible(true);
  //       console.log("?");
  //     },
  //     { threshold: 0.3 }
  //   );

  //   if (ref.current) observer.observe(ref.current);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div className=" border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-6 w-auto whitespace-pre-line">
      <div className="">{result ?? "Loading..."}</div>
    </div>
  );
}
