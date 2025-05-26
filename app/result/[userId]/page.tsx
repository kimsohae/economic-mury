import React from "react";
import { fetchUserResult } from "@/lib/fetch";
import { cookies } from "next/headers";
import ClientResult from "@/components/result/ClientResult";
import Result from "@/components/result/Result";

type Params = Promise<{
  userId: string;
}>;

// 페이지별 메타데이터 생성
// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const rank = (await params).rank;
//   const { title: rankTitle, desc: rankDesc } = RESULT_MAP[rank];
//   return {
//     title: "경제 머리 테스트",
//     description: `"${rankTitle}", ${rankDesc}`,
//     openGraph: {
//       images: [`${process.env.NEXT_PUBLIC_ROOT_URL}/img/${rank}.webp`],
//     },
//   };
// }

/**
 * 1. 본인 결과 조회
 * 2. 타인 페이지 조회
 */

export default async function Page({ params }: { params: Params }) {
  const userIdFromCookie = (await cookies()).get("userId")?.value;
  const { userId: userIdFromUrl } = await params;
  // 테스트 진행  : localStorage에 저장된 결과 사용
  if (userIdFromCookie === userIdFromUrl) {
    return <ClientResult />;
  }
  // 테스트 미진행 : SSR
  console.log("fetchUserResult!");
  const userResult = await fetchUserResult(userIdFromUrl);

  return <Result userResult={userResult} />;
}
