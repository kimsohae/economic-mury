import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import { Metadata } from "next";

const RESULT_MAP: {
  [key in Rank]: { desc: string; title: string };
} = {
  stone: {
    desc: "돌 틈 사이에도 희망이 자랄 수 있죠! \n아마도...?",
    title: "씨앗 품은 돌머리",
  },
  desert: {
    desc: "여기저기 균열이...!\n경제 지식이 싹틀 조짐이 보입니다.",
    title: "아직은 황무지머리",
  },
  grass: {
    desc: "지식이 자라나고 있지만,\n 아직 사막입니다.",
    title: "오아시스의 잔디 머리",
  },
  plant: {
    desc: "머리를 꽤 심어놓았네요.\n 물만 잘 주면 될듯!",
    title: "희망찬 모내기 머리",
  },
  rice: {
    desc: "경제지식이 무르익었네요.\n 추수의 계절이 다가오고 있습니다!",
    title: "가을볕의 벼머리",
  },
  jungle: {
    desc: "머리가 이렇게 풍성할 수 있나요?\n대단합니다!",
    title: "수풀 가득한 정글머리",
  },
};

export type Rank = "stone" | "desert" | "grass" | "plant" | "rice" | "jungle";

type Params = Promise<{
  rank: Rank;
}>;

// 정적 페이지 미리 생성
export async function generateStaticParams() {
  return [
    { rank: "stone" },
    { rank: "desert" },
    { rank: "grass" },
    { rank: "plant" },
    { rank: "rice" },
    { rank: "jungle" },
  ];
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
