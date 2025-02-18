import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";

export type Rank = "bald" | "downy" | "grass" | "plant" | "rice" | "jungle";

type Params = Promise<{
  rank: Rank;
}>;

export async function generateStaticParams() {
  return [
    { rank: "bald" },
    { rank: "downy" },
    { rank: "grass" },
    { rank: "plant" },
    { rank: "rice" },
    { rank: "jungle" },
  ];
}

const RESULT_MAP: {
  [key in Rank]: { desc: string; title: string };
} = {
  bald: {
    desc: "경제 상식?\n그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  downy: {
    desc: "바람 불면\n머리카락이 날아갈지 몰라요.",
    title: "희미한 솜털머리",
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
    desc: "머리가 이렇게 풍성할 수 있나요? 대단합니다!",
    title: "수풀 가득한 정글머리",
  },
};

export default async function Page({ params }: { params: Params }) {
  const { rank } = await params;
  const { title, desc } = RESULT_MAP[`${rank}`];

  return (
    <>
      <span className="absolute top-4 left-[50%] translate-x-[-50%] text-sm bg-white ">
        경제머머리테스트
      </span>
      <div className="z-[1] pt-12">
        <div className="flex flex-col items-center ">
          <div className="text-gray-500 text-lg text-center  whitespace-pre-line">
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
        <div className=" flex flex-col items-center gap-2 w-full px-4 my-8">
          <Link href="/" className="w-full">
            <Button size="full" className="text-black" variant={"outline"}>
              다시 하기
            </Button>
          </Link>
          <ShareButton title={title} description={desc} url={""} />
        </div>
      </div>
    </>
  );
}
