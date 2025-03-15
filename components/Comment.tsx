"use client";
import React, { useEffect, useState } from "react";

interface Props {
  comment: string;
  isCommentRead: boolean;
}

export default function Comment({ comment, isCommentRead }: Props) {
  // DB에서 분석 읽어온 경우, 애니메이션 없이 그대로 노출시킨다
  const [displayedText, setDisplayedText] = useState<string>(
    isCommentRead ? comment : ""
  );

  useEffect(() => {
    if (isCommentRead) {
      return;
    }
    const words = comment.split(" ");
    let i = 0;

    // 사용자가 요청한 대로, 100ms마다 단어를 한 번에 출력하도록
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        // 단어가 누적되게 설정
        i++;
        return prev ? `${prev} ${words[i - 1]}` : words[i - 1];
      });

      if (i >= words.length - 1) {
        clearInterval(interval);
      }
    }, 100);

    // 컴포넌트가 unmount되면 interval을 clear
    return () => clearInterval(interval);
  }, [comment]);

  return <div>{displayedText}</div>;
}
