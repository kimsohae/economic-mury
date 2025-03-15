"use client";

import { fetchResultAnalysis } from "@/lib/fetch";
import { Quiz, UserResult } from "@/lib/type";
import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { LocalStorageUtility } from "@/lib/utils";
interface Props {
  userResult: UserResult;
  wrongQuizList: Quiz[];
}

export default function Analysis({ userResult, wrongQuizList }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // const [isVisible, setIsVisible] = useState(false);
  const [comment, setComment] = useState(userResult.analysis);
  const isCommentRead = !!userResult.analysis;

  useEffect(() => {
    const getAnalysis = async () => {
      const response = await fetchResultAnalysis(userResult, wrongQuizList);
      if (response.content) {
        setComment(response.content);
        const storedResult = LocalStorageUtility.getItem<UserResult>("result");
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
          if (!isCommentRead) {
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
  }, []);

  return (
    <div
      className=" border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-6 w-auto whitespace-pre-line"
      ref={ref}
    >
      {comment ? (
        <Comment comment={comment} isCommentRead={isCommentRead} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
