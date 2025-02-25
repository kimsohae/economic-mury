import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import { Metadata } from "next";
import { Rank, RANKS, RESULT_MAP } from "@/lib/rank";

type Params = Promise<{
  rank: Rank;
}>;

// 정적 페이지 미리 생성
export async function generateStaticParams() {
  return RANKS.map((rank) => ({ rank }));
}

// 페이지별 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const rank = (await params).rank;
  const { title: rankTitle, desc: rankDesc } = RESULT_MAP[rank];
  return {
    title: "경제 머머리 테스트",
    description: `"${rankTitle}", ${rankDesc}`,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_ROOT_URL}/img/${rank}.webp`],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { rank } = await params;
  const { title, desc } = RESULT_MAP[`${rank}`];

  return (
    <>
      <span className="absolute top-4 left-[50%] translate-x-[-50%] text-sm  ">
        경제머리 테스트
      </span>
      <div className="z-[1] pt-12 pb-8 mb-[142px]">
        <div className="flex flex-col items-center ">
          <div className="text-gray-500 text-lg text-center whitespace-pre-line">
            {desc}
          </div>
          <Image
            // className=""
            width={300}
            height={300}
            alt="result"
            src={`/img/${rank}.webp`}
          />
          {rank === "grass" && (
            <>
              <Image
                width={300}
                height={300}
                alt="result_bg"
                className="absolute bottom-[30%] w-full z-[-2]"
                src={"/img/grass_bg.webp"}
              />
              <div
                className="absolute bottom-0 h-[30%] w-full z-[-2]"
                style={{ backgroundColor: "#EEC5A8" }}
              />
            </>
          )}
          <span className="text-3xl font-semibold">{title}</span>
        </div>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center gap-[4px] w-full px-4 bottom-[30px] z-[1]">
        <Link href="/" className="w-full">
          <Button size="full" className="text-black" variant={"outline"}>
            다시 하기
          </Button>
        </Link>
        <ShareButton
          title={title}
          description={desc}
          imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/img/${rank}.webp`}
        />
      </div>
    </>
  );
}
