"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

// 중앙에 위치하는 메인 화면
// 역할 1. 스타일링 2.vh값 설정
export default function MainScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH(); // 초기실행
    window.addEventListener("resize", () => setVH());

    return () => window.removeEventListener("resize", setVH);
  }, []);
  return (
    <main
      style={{
        height: `calc(var(--vh, 1vh) * 100)`,
      }}
      className="relative max-w-[540px] m-auto bg-white flex flex-col items-center justify-center text-gray-600 "
    >
      {children}
    </main>
  );
}
